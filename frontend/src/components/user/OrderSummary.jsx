import { useState } from 'react'
import { money } from '../../utils/format'

/** Totals box used on the cart and checkout pages. */
export default function OrderSummary({ cart, quote, loading, coupon, setCoupon, children }) {
  const [code, setCode] = useState(coupon)

  const subtotal = quote ? quote.subtotal : cart.subtotal
  const discount = quote ? quote.discount : 0
  const shipping = quote ? quote.shipping : null
  const total    = quote ? quote.total : cart.subtotal
  const freeMin  = quote ? Number(quote.free_shipping_min) : 0
  const toFree   = freeMin > 0 && shipping > 0 ? freeMin - (subtotal - discount) : 0

  return (
    <div className="shop-panel">
      <h5>Order Summary</h5>

      {/* Not a <form>: this box also sits inside the checkout form. */}
      <div className="coupon-box mb-2">
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code"
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); setCoupon(code) } }} />
        <button type="button" onClick={() => setCoupon(code)}>Apply</button>
      </div>
      {coupon && quote?.coupon?.message && (
        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.78rem', fontWeight: 700, color: quote.coupon.valid ? '#16A34A' : '#DC2626' }}>
          <span>{quote.coupon.valid && <i className="bi bi-tag-fill me-1" />}{quote.coupon.message}</span>
          <button type="button" onClick={() => { setCode(''); setCoupon('') }} style={{ color: 'var(--ink-3)', fontSize: '0.75rem', textDecoration: 'underline' }}>Remove</button>
        </div>
      )}

      <div className="sum-row"><span>Subtotal ({cart.count} item{cart.count !== 1 ? 's' : ''})</span><span>{money(subtotal)}</span></div>
      {discount > 0 && <div className="sum-row"><span>Discount</span><span className="save">− {money(discount)}</span></div>}
      <div className="sum-row">
        <span>Delivery{quote?.shipping_estimated && shipping > 0 ? ' (estimate)' : ''}</span>
        <span>{shipping === null ? '…' : shipping > 0 ? money(shipping) : <span className="save">Free</span>}</span>
      </div>
      <div className="sum-row total"><span>Total</span><span style={{ opacity: loading ? 0.5 : 1 }}>{money(total)}</span></div>
      {quote?.shipping_estimated && shipping > 0 && (
        <div className="sum-note" style={{ marginTop: 0 }}>The exact delivery charge is confirmed once you enter your state at checkout.</div>
      )}
      {freeMin > 0 && quote && (
        <div className="gf-free">
          <div className="sum-note" style={{ marginTop: 0 }}>
            <i className="bi bi-truck me-1" />
            {toFree > 0 ? <>Add <b>{money(toFree)}</b> more for free delivery.</> : <>You have unlocked free delivery.</>}
          </div>
          <div className="bar"><i style={{ width: `${Math.min(100, ((subtotal - discount) / freeMin) * 100)}%` }} /></div>
        </div>
      )}

      {children}
    </div>
  )
}
