import { useSyncExternalStore } from 'react'

const KEY = 'store_cart'
const MAX_QTY = 20
const listeners = new Set()

function read() {
  try {
    const items = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(items) ? items : []
  } catch { return [] }
}

let items = read()

function save(next) {
  items = next
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ }
  listeners.forEach(fn => fn())
}

// Keep several open tabs in step with each other.
window.addEventListener('storage', e => {
  if (e.key === KEY) { items = read(); listeners.forEach(fn => fn()) }
})

function limit(qty, stock) {
  const cap = Math.min(MAX_QTY, stock > 0 ? stock : MAX_QTY)
  return Math.max(1, Math.min(cap, qty))
}

export function addToCart(product, qty = 1) {
  const stock = Number(product.stock) || 0
  const found = items.find(i => i.pid === product.pid)
  if (found) {
    save(items.map(i => i.pid === product.pid ? { ...i, qty: limit(i.qty + qty, stock), stock } : i))
  } else {
    save([...items, {
      pid:   product.pid,
      name:  product.product_name,
      img:   product.product_img || '',
      price: Number(product.price) || 0,
      mrp:   Number(product.mrp) || 0,
      stock,
      qty:   limit(qty, stock),
    }])
  }
}

export function setCartQty(pid, qty) {
  save(items.map(i => i.pid === pid ? { ...i, qty: limit(qty, i.stock) } : i))
}

export function removeFromCart(pid) {
  save(items.filter(i => i.pid !== pid))
}

export function clearCart() {
  save([])
}

/** Replace cart lines with the server's view of them (current price, stock, capped quantity). */
export function syncCart(serverItems) {
  save(serverItems.map(s => ({
    pid: s.pid, name: s.product_name, img: s.product_img || '',
    price: Number(s.price), mrp: Number(s.mrp), stock: Number(s.stock), qty: Number(s.qty),
  })))
}

export function cartLines() {
  return items.map(i => ({ pid: i.pid, qty: i.qty }))
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useCart() {
  const list = useSyncExternalStore(subscribe, () => items)
  return {
    items:    list,
    count:    list.reduce((n, i) => n + i.qty, 0),
    subtotal: list.reduce((n, i) => n + i.price * i.qty, 0),
  }
}
