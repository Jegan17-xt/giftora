import { Link } from 'react-router-dom'
import { addToCart, setCartQty, removeFromCart, useCart } from '../../utils/cart'
import { toggleWishlist, useWishlist } from '../../utils/wishlist'
import { useRatings } from '../../utils/storeData'
import { money, discountPct } from '../../utils/format'
import { Stars } from './Shell'

const IMG = import.meta.env.VITE_IMG_URL

/** Greeting cards are shown whole (never cropped); other gifts fill the image box. */
export const isCardProduct = (p) => (p.cat_name || '').toLowerCase().includes('card')

export default function ProductCard({ product }) {
  const wishlist = useWishlist()
  const cart     = useCart()
  const rating   = useRatings()[product.product_name]
  const off      = discountPct(product.mrp, product.price)
  const stock    = Number(product.stock)
  const inStock  = stock > 0
  const wished   = wishlist.has(product.pid)
  const inCart   = cart.items.find(i => i.pid === product.pid)?.qty || 0
  const max      = Math.min(20, stock)
  const link     = `/user/products/${product.pid}`

  const handleAdd = () => addToCart(product, 1)
  function less() {
    if (inCart <= 1) removeFromCart(product.pid)
    else setCartQty(product.pid, inCart - 1)
  }

  return (
    <article className={`gift-card${isCardProduct(product) ? ' gift-card--fit' : ''}`}>
      <Link to={link} className="gift-card-img" aria-label={product.product_name}>
        <span className="gift-noimg"><i className="bi bi-gift" /></span>
        {product.product_img && <img src={`${IMG}products/${product.product_img}`} alt={product.product_name} loading="lazy" decoding="async" />}
        {!inStock
          ? <span className="gift-badge out">Sold out</span>
          : off > 0 && <span className="gift-badge">{off}% OFF</span>}
      </Link>
      <button className={`gift-wish${wished ? ' on' : ''}`} onClick={() => toggleWishlist(product.pid)}
        aria-pressed={wished} aria-label={wished ? `Remove ${product.product_name} from wishlist` : `Add ${product.product_name} to wishlist`}>
        <i className={`bi bi-heart${wished ? '-fill' : ''}`} />
      </button>

      <div className="gift-card-body">
        <Link to={link} className="gift-card-name">{product.product_name}</Link>
        <span className="gift-card-cat">
          {rating ? <span className="gf-rating"><Stars value={rating.avg} /><b>{rating.avg.toFixed(1)}</b>({rating.count})</span> : product.cat_name}
        </span>
        <div className="gift-foot">
          <div className="gift-price">
            <span className="now">{money(product.price)}</span>
            {off > 0 && <span className="was">MRP {money(product.mrp)}</span>}
          </div>
          {inCart > 0 ? (
            <div className="gift-step" role="group" aria-label={`Quantity of ${product.product_name} in cart`}>
              <button onClick={less} aria-label="Decrease quantity"><i className="bi bi-dash" /></button>
              <span aria-live="polite">{inCart}</span>
              <button onClick={() => setCartQty(product.pid, inCart + 1)} disabled={inCart >= max} aria-label="Increase quantity"><i className="bi bi-plus" /></button>
            </div>
          ) : (
            <button className="gift-add" onClick={handleAdd} disabled={!inStock}
              aria-label={inStock ? `Add ${product.product_name} to cart` : `${product.product_name} is out of stock`}>
              {inStock ? <><i className="bi bi-plus-lg" />Add</> : 'Sold out'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
