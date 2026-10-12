import { Link } from 'react-router-dom'
import Shell from '../../components/user/Shell'
import OrderSummary from '../../components/user/OrderSummary'
import useCartQuote from '../../utils/useCartQuote'
import { setCartQty, removeFromCart } from '../../utils/cart'
import { money } from '../../utils/format'

const IMG = import.meta.env.VITE_IMG_URL

export default function UserCart() {
  const q = useCartQuote()
  const { cart, notices } = q

  if (!cart.items.length) {
    return (
      <Shell title="Cart">
        <div className="shop-empty" style={{ minHeight: '55vh', justifyContent: 'center' }}>
          <i className="bi bi-bag" />
          <h2>Your cart is empty</h2>
          <p>Find something they will love.</p>
          <Link to="/user/products" className="gf-btn mt-2"><i className="bi bi-gift" />Start Shopping</Link>
        </div>
      </Shell>
    )
  }

  return (
    <Shell title="Cart">
      <section className="shop-page">
        <div className="gf-wrap">
          <header className="gf-pagehead" style={{ paddingTop: 12 }}><h1>Your <span className="gf-accent">Cart</span></h1></header>
          <div className="gf-steps" aria-label="Checkout steps">
            <span className="on"><i className="n">1</i><b>Cart</b></span><hr />
            <span className=""><i className="n">2</i><b>Details</b></span><hr />
            <span className=""><i className="n">3</i><b>Done</b></span>
          </div>

          {notices.length > 0 && (
            <div className="gf-alert warn mb-3">
              {notices.map(p => <div key={p}><i className="bi bi-exclamation-triangle me-1" />{p}</div>)}
            </div>
          )}

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="shop-panel">
                {cart.items.map(it => {
                  const max = Math.min(20, it.stock > 0 ? it.stock : 20)
                  return (
                    <div key={it.pid} className="cart-row">
                      <Link to={`/user/products/${it.pid}`} className="cart-thumb">
                        {it.img ? <img src={`${IMG}products/${it.img}`} alt={it.name} /> : <i className="bi bi-gift" />}
                      </Link>
                      <div className="cart-info">
                        <Link to={`/user/products/${it.pid}`} className="cart-name">{it.name}</Link>
                        <div className="cart-unit">{money(it.price)} each</div>
                      </div>
                      <div className="cart-actions">
                        <div className="qty-step">
                          <button onClick={() => setCartQty(it.pid, it.qty - 1)} disabled={it.qty <= 1} aria-label="Decrease quantity"><i className="bi bi-dash" /></button>
                          <span>{it.qty}</span>
                          <button onClick={() => setCartQty(it.pid, it.qty + 1)} disabled={it.qty >= max} aria-label="Increase quantity"><i className="bi bi-plus" /></button>
                        </div>
                        <div className="cart-line-total">{money(it.price * it.qty)}</div>
                        <button className="cart-remove" onClick={() => removeFromCart(it.pid)} aria-label={`Remove ${it.name}`}><i className="bi bi-trash" /></button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link to="/user/products" className="d-inline-flex align-items-center gap-1 mt-3" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                <i className="bi bi-arrow-left" /> Continue shopping
              </Link>
            </div>

            <div className="col-lg-4">
              <div className="gf-sticky"><OrderSummary {...q}>
                <Link to="/user/checkout" className="gf-btn gf-btn--block mt-3" style={{ height: 52 }}>
                  Proceed to Checkout <i className="bi bi-arrow-right ms-1" />
                </Link>
              </OrderSummary></div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
