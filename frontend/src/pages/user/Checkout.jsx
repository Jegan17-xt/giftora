import { useState, useEffect, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import OrderSummary from '../../components/user/OrderSummary'
import useCartQuote from '../../utils/useCartQuote'
import getClientId from '../../utils/useClientId'
import { clearCart, cartLines, syncCart } from '../../utils/cart'
import { money } from '../../utils/format'
import { GIFT_NOTE_KEY } from './ProductDetail'

const WS = import.meta.env.VITE_API_URL
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]

export default function UserCheckout() {
  const navigate = useNavigate()
  // A ref, not state: emptying the cart re-renders immediately and must not bounce us back to the cart.
  const placed = useRef(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')
  const [form, setForm] = useState({
    customer_name: '', customer_ph: localStorage.getItem('mb_user_ph') || '', customer_email: '',
    address: '', city: '', state: '', pincode: '',
    recipient_name: '', gift_message: localStorage.getItem(GIFT_NOTE_KEY) || '', delivery_date: '', notes: '',
  })
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))
  // The delivery charge can depend on the state, so the quote follows the address form.
  const q = useCartQuote(form.state.trim())
  const { cart, coupon } = q

  // Returning customers get their saved details filled in.
  useEffect(() => {
    const ph = localStorage.getItem('mb_user_ph')
    if (!ph) return
    axios.post(`${WS}/fetchuserprofile`, new URLSearchParams({ ...getClientId(), customer_ph: ph })).then(r => {
      const c = r.data.profile?.[0]
      if (!c) return
      setForm(p => ({
        ...p,
        customer_name:  p.customer_name  || c.customer_name  || '',
        customer_email: p.customer_email || c.customer_email || '',
        address: p.address || c.address || '', city: p.city || c.city || '',
        state:   p.state   || c.state   || '', pincode: p.pincode || c.pincode || '',
      }))
    }).catch(() => {})
  }, [])

  if (!cart.items.length && !placed.current) return <Navigate to="/user/cart" replace />

  function submit(e) {
    e.preventDefault()
    setErr('')
    setSaving(true)
    const fd = new URLSearchParams({ ...getClientId(), ...form, coupon, items: JSON.stringify(cartLines()) })
    axios.post(`${WS}/placeorder`, fd)
      .then(r => {
        if (r.data.status === 1) {
          placed.current = true
          localStorage.setItem('mb_user_ph', form.customer_ph.replace(/[^0-9+]/g, ''))
          sessionStorage.removeItem('store_coupon')
          localStorage.removeItem(GIFT_NOTE_KEY)
          clearCart()
          navigate('/user/order-success', { replace: true, state: { order_no: r.data.order_no, total: r.data.total, name: form.customer_name } })
        } else {
          setErr(r.data.message || 'Could not place the order. Please try again.')
          if (r.data.quote?.items) syncCart(r.data.quote.items)
        }
      })
      .catch(() => setErr('Network error. Please try again.'))
      .finally(() => setSaving(false))
  }

  return (
    <Shell title="Checkout">
      <section className="shop-page">
        <div className="gf-wrap">
          <header className="gf-pagehead" style={{ paddingTop: 12 }}><h1>Checkout</h1></header>
          <div className="gf-steps" aria-label="Checkout steps">
            <span className="done"><i className="n">✓</i><b>Cart</b></span><hr />
            <span className="on"><i className="n">2</i><b>Details</b></span><hr />
            <span className=""><i className="n">3</i><b>Done</b></span>
          </div>

          <form onSubmit={submit}>
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="shop-panel mb-3">
                  <h5><i className="bi bi-person" />Your Details</h5>
                  <div className="row g-3">
                    <div className="col-md-6 shop-field">
                      <label htmlFor="co-name">Full Name *</label>
                      <input id="co-name" className="form-control" required maxLength={200} autoComplete="name" value={form.customer_name} onChange={set('customer_name')} />
                    </div>
                    <div className="col-md-6 shop-field">
                      <label htmlFor="co-ph">Phone Number *</label>
                      <input id="co-ph" type="tel" className="form-control" required minLength={7} maxLength={20} autoComplete="tel" value={form.customer_ph} onChange={set('customer_ph')} />
                    </div>
                    <div className="col-12 shop-field">
                      <label htmlFor="co-email">Email</label>
                      <input id="co-email" type="email" className="form-control" maxLength={150} autoComplete="email" value={form.customer_email} onChange={set('customer_email')} />
                    </div>
                  </div>
                </div>

                <div className="shop-panel mb-3">
                  <h5><i className="bi bi-geo-alt" />Delivery Address</h5>
                  <div className="row g-3">
                    <div className="col-12 shop-field">
                      <label htmlFor="co-addr">Address *</label>
                      <textarea id="co-addr" className="form-control" rows={2} required maxLength={500} autoComplete="street-address" placeholder="House no, street, area" value={form.address} onChange={set('address')} />
                    </div>
                    <div className="col-md-5 shop-field">
                      <label htmlFor="co-city">City *</label>
                      <input id="co-city" className="form-control" required maxLength={100} autoComplete="address-level2" value={form.city} onChange={set('city')} />
                    </div>
                    <div className="col-md-4 shop-field">
                      <label htmlFor="co-state">State</label>
                      <input id="co-state" className="form-control" maxLength={100} autoComplete="address-level1" value={form.state} onChange={set('state')} />
                    </div>
                    <div className="col-md-3 shop-field">
                      <label htmlFor="co-pin">Pincode *</label>
                      <input id="co-pin" className="form-control" required maxLength={10} inputMode="numeric" autoComplete="postal-code" value={form.pincode} onChange={set('pincode')} />
                    </div>
                  </div>
                </div>

                <div className="shop-panel mb-3">
                  <h5><i className="bi bi-gift" />Gift Options</h5>
                  <div className="row g-3">
                    <div className="col-md-6 shop-field">
                      <label htmlFor="co-rec">Recipient Name</label>
                      <input id="co-rec" className="form-control" maxLength={200} placeholder="If sending to someone else" value={form.recipient_name} onChange={set('recipient_name')} />
                    </div>
                    <div className="col-md-6 shop-field">
                      <label htmlFor="co-date">Preferred Delivery Date</label>
                      <input id="co-date" type="date" className="form-control" min={today()} value={form.delivery_date} onChange={set('delivery_date')} />
                    </div>
                    <div className="col-12 shop-field">
                      <label htmlFor="co-msg">Gift Message</label>
                      <textarea id="co-msg" className="form-control" rows={2} maxLength={500} placeholder="We will write this on the card" value={form.gift_message} onChange={set('gift_message')} />
                    </div>
                    <div className="col-12 shop-field">
                      <label htmlFor="co-notes">Order Notes</label>
                      <input id="co-notes" className="form-control" maxLength={1000} placeholder="Landmark, delivery instructions…" value={form.notes} onChange={set('notes')} />
                    </div>
                  </div>
                </div>

                <div className="shop-panel">
                  <h5><i className="bi bi-wallet2" />Payment</h5>
                  <div className="gf-pay">
                    <i className="bi bi-cash-coin" />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.92rem' }}>Cash on Delivery</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)' }}>Pay when your gift arrives.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="gf-sticky"><OrderSummary {...q}>
                  <div className="mt-3" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                    {cart.items.map(it => (
                      <div key={it.pid} className="d-flex justify-content-between gap-2" style={{ fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.2rem 0' }}>
                        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.qty} × {it.name}</span>
                        <span style={{ flexShrink: 0 }}>{money(it.price * it.qty)}</span>
                      </div>
                    ))}
                  </div>
                  {err && <div className="gf-alert err mt-3" role="alert">{err}</div>}
                  <button type="submit" disabled={saving || q.loading} className="gf-btn gf-btn--block mt-3" style={{ height: 54, fontSize: '1rem' }}>
                    {saving ? <><span className="spinner-border spinner-border-sm me-2" />Placing order…</> : <><i className="bi bi-check-circle me-1" />Place Order</>}
                  </button>
                  <div className="gf-secure"><span><i className="bi bi-shield-check" />Safe checkout</span><span><i className="bi bi-box2-heart" />Gift-ready packing</span></div>
                  <div className="sum-note text-center">
                    By placing the order you agree to our <Link to="/user/policy/conditions" style={{ textDecoration: 'underline' }}>terms</Link>.
                  </div>
                </OrderSummary></div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Shell>
  )
}
