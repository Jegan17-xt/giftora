import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useCartQuote from '../../utils/useCartQuote'
import { setCartQty, removeFromCart } from '../../utils/cart'
import { closeCartPanel, openCartPanel, useCartPanelOpen } from '../../utils/cartPanel'
import { money } from '../../utils/format'

const IMG = import.meta.env.VITE_IMG_URL

// The cart and checkout pages already show the cart in full.
const HIDDEN_ON = ['/user/cart', '/user/checkout', '/user/order-success']

/** True on pages where the cart panel is shown (used by the layout to make room for it). */
export function useCartPanelVisible(count) {
  const { pathname } = useLocation()
  return count > 0 && !HIDDEN_ON.includes(pathname)
}

/**
 * The cart, always at hand: docked on the right on wide screens, a slide-in sheet on
 * tablets and phones. Totals come from the server quote (useCartQuote), never from the browser.
 */
export default function CartPanel() {
  const { pathname } = useLocation()
  const { cart, quote, loading } = useCartQuote()
  const open    = useCartPanelOpen()
  const visible = useCartPanelVisible(cart.count)

  // Moving to another page closes the sheet; the docked panel is unaffected.
  useEffect(() => { closeCartPanel() }, [pathname])
  useEffect(() => { if (!cart.count) closeCartPanel() }, [cart.count])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') closeCartPanel() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!visible) return null

  const subtotal = quote ? quote.subtotal : cart.subtotal
  const discount = quote ? quote.discount : 0
  const shipping = quote ? quote.shipping : null
  const total    = quote ? quote.total : cart.subtotal
  // Shown only when the server's quote includes them.
  const distance = quote?.delivery_distance_km
  const handling = Number(quote?.handling_charge) || 0
  const payFee   = Number(quote?.payment_charge) || 0

  return (
    <>
      {/* Phone / tablet: a bar that stays above the bottom tabs and opens the cart */}
      <button className="cp-mini" onClick={openCartPanel} aria-label={`Open cart, ${cart.count} items, ${money(total)}`}>
        <span className="cp-mini-count"><i className="bi bi-bag-fill" />{cart.count} item{cart.count !== 1 ? 's' : ''}</span>
        <span className="cp-mini-total">{money(total)}</span>
        <span className="cp-mini-go">View Cart <i className="bi bi-chevron-up" /></span>
      </button>

      <div className={`cp-scrim${open ? ' on' : ''}`} onClick={closeCartPanel} />

      <aside className={`cp${open ? ' on' : ''}`} aria-label="Cart">
        <header className="cp-head">
          <button className="cp-close" onClick={closeCartPanel} aria-label="Close cart"><i className="bi bi-arrow-left" /></button>
          <div>
            <h2>Your Order</h2>
            <span>{cart.count} item{cart.count !== 1 ? 's' : ''}</span>
          </div>
          <Link to="/user/cart" className="cp-full" onClick={closeCartPanel}>Open cart</Link>
        </header>

        <div className="cp-list">
          {cart.items.map(it => {
            const max = Math.min(20, it.stock > 0 ? it.stock : 20)
            return (
              <div key={it.pid} className="cp-row">
                <Link to={`/user/products/${it.pid}`} className="cp-thumb" tabIndex={-1} aria-hidden="true">
                  {it.img ? <img src={`${IMG}products/${it.img}`} alt="" loading="lazy" /> : <i className="bi bi-gift" />}
                </Link>
                <div className="cp-info">
                  <Link to={`/user/products/${it.pid}`} className="cp-name">{it.name}</Link>
                  <div className="cp-line">
                    <div className="cp-qty">
                      <button onClick={() => setCartQty(it.pid, it.qty - 1)} disabled={it.qty <= 1} aria-label={`Decrease quantity of ${it.name}`}><i className="bi bi-dash" /></button>
                      <span aria-live="polite">{it.qty}</span>
                      <button onClick={() => setCartQty(it.pid, it.qty + 1)} disabled={it.qty >= max} aria-label={`Increase quantity of ${it.name}`}><i className="bi bi-plus" /></button>
                    </div>
                    <span className="cp-unit">× {money(it.price)}</span>
                    <b className="cp-price">{money(it.price * it.qty)}</b>
                  </div>
                </div>
                <button className="cp-del" onClick={() => removeFromCart(it.pid)} aria-label={`Remove ${it.name} from cart`}><i className="bi bi-trash3" /></button>
              </div>
            )
          })}
        </div>

        <div className="cp-bill">
          <h3><i className="bi bi-wallet2" />Bill Summary</h3>
          <div className="cp-bill-row"><span>Subtotal</span><b>{money(subtotal)}</b></div>
          {discount > 0 && <div className="cp-bill-row save"><span>Discount{quote?.coupon?.code ? ` (${quote.coupon.code})` : ''}</span><b>− {money(discount)}</b></div>}
          {distance != null && <div className="cp-bill-row"><span>Delivery distance</span><b>{Number(distance).toFixed(1)} km</b></div>}
          <div className="cp-bill-row">
            <span>Delivery charge{quote?.shipping_estimated && shipping > 0 ? ' (estimate)' : ''}</span>
            <b className={shipping === 0 ? 'free' : ''}>{shipping === null ? '…' : shipping > 0 ? money(shipping) : 'FREE'}</b>
          </div>
          {handling > 0 && <div className="cp-bill-row"><span>Handling charge</span><b>{money(handling)}</b></div>}
          {payFee > 0 && <div className="cp-bill-row"><span>Transactional charge</span><b>{money(payFee)}</b></div>}
          <div className="cp-bill-row total"><span>Total</span><b>{money(total)}</b></div>
          <p className="cp-bill-note">Cash on delivery. Have a coupon? Apply it in the <Link to="/user/cart" onClick={closeCartPanel}>cart</Link>.</p>
        </div>

        <footer className="cp-foot">
          <div>
            <div className="cp-total" style={{ opacity: loading ? 0.6 : 1 }}>{money(total)}</div>
            <div className="cp-incl">Incl. delivery</div>
          </div>
          <Link to="/user/checkout" className="cp-checkout" onClick={closeCartPanel}>Checkout <i className="bi bi-arrow-right" /></Link>
        </footer>
      </aside>
    </>
  )
}
