import { useState, useEffect } from 'react'
import axios from 'axios'
import getClientId from './useClientId'
import { useCart, syncCart } from './cart'

const WS = import.meta.env.VITE_API_URL
const COUPON_KEY = 'store_coupon'

export function savedCoupon() {
  return sessionStorage.getItem(COUPON_KEY) || ''
}

/**
 * Prices the cart on the server (current prices, stock, coupon, delivery charge).
 * The browser's own numbers are only a placeholder until the quote arrives.
 */
export default function useCartQuote(state = '') {
  const cart = useCart()
  const [coupon, setCouponState] = useState(savedCoupon)
  const [quote, setQuote]        = useState(null)
  const [loading, setLoading]    = useState(false)
  const [notices, setNotices]    = useState([])   // stock / availability messages; kept after the cart is corrected

  const signature = cart.items.map(i => `${i.pid}:${i.qty}`).join(',')

  useEffect(() => {
    if (!cart.items.length) { setQuote(null); return }
    let stale = false
    setLoading(true)
    const timer = setTimeout(() => {
      const body = new URLSearchParams({
        ...getClientId(),
        items:  JSON.stringify(cart.items.map(i => ({ pid: i.pid, qty: i.qty }))),
        coupon,
        state,
      })
      axios.post(`${WS}/cartquote`, body)
        .then(r => {
          if (stale || r.data.status !== 1) return
          setQuote(r.data)
          if (r.data.problems?.length) setNotices(r.data.problems)
          // Drop unavailable lines and pick up price / stock changes.
          const changed = r.data.items.length !== cart.items.length ||
            r.data.items.some(s => {
              const mine = cart.items.find(i => i.pid === s.pid)
              return !mine || mine.qty !== s.qty || mine.price !== Number(s.price) || mine.stock !== Number(s.stock)
            })
          if (changed) syncCart(r.data.items)
        })
        .catch(() => {})
        .finally(() => { if (!stale) setLoading(false) })
    }, 250)
    return () => { stale = true; clearTimeout(timer) }
  }, [signature, coupon, state])

  function setCoupon(code) {
    const clean = code.trim().toUpperCase()
    sessionStorage.setItem(COUPON_KEY, clean)
    setCouponState(clean)
  }

  return { cart, quote, loading, coupon, setCoupon, notices }
}
