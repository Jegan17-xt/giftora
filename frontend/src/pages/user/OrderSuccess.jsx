import { Link, Navigate, useLocation } from 'react-router-dom'
import Shell from '../../components/user/Shell'
import { money } from '../../utils/format'

export default function UserOrderSuccess() {
  const { state } = useLocation()
  if (!state?.order_no) return <Navigate to="/user/home" replace />

  const rows = [
    ['Order Number', state.order_no],
    ['Amount Payable', money(state.total)],
    ['Payment', 'Cash on Delivery'],
  ]

  return (
    <Shell title="Order Placed">
      <section className="shop-page">
        <div className="gf-wrap">
          <div className="gf-steps" style={{ justifyContent: 'center' }} aria-label="Checkout steps">
            <span className="done"><i className="n">✓</i><b>Cart</b></span><hr />
            <span className="done"><i className="n">✓</i><b>Details</b></span><hr />
            <span className="done"><i className="n">✓</i><b>Done</b></span>
          </div>
          <div className="text-center" style={{ maxWidth: '500px', margin: '1.5rem auto' }}>
            <div className="success-icon mb-4">
              <i className="bi bi-check-lg" />
            </div>
            <h1 className="gf-h" style={{ marginBottom: '0.5rem' }}>
              Thank you{state.name ? `, ${state.name.split(' ')[0]}` : ''}!
            </h1>
            <p style={{ color: 'var(--ink-3)', lineHeight: '1.75', marginBottom: '2rem' }}>
              Your order has been placed. We will confirm it shortly and keep you posted on delivery.
            </p>

            <div className="shop-panel" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              {rows.map(([label, value], i) => (
                <div key={label} className="d-flex justify-content-between py-2" style={{ borderBottom: i < rows.length - 1 ? '1px dashed var(--line)' : 'none', gap: '12px' }}>
                  <span style={{ color: 'var(--ink-3)', fontSize: '0.88rem', flexShrink: 0 }}>{label}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/user/my-orders" className="gf-btn"><i className="bi bi-box-seam me-1" /> Track Order</Link>
              <Link to="/user/products" className="gf-btn gf-btn--ghost"><i className="bi bi-gift me-1" /> Keep Shopping</Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
