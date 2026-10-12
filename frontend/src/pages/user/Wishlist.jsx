import { Link } from 'react-router-dom'
import Shell from '../../components/user/Shell'
import ProductCard from '../../components/user/ProductCard'
import { useCatalog } from '../../utils/storeData'
import { useWishlist } from '../../utils/wishlist'

export default function UserWishlist() {
  const catalog  = useCatalog()
  const wishlist = useWishlist()
  // Only gifts that are still on sale are shown.
  const items = (catalog?.products || []).filter(p => wishlist.has(p.pid))

  return (
    <Shell title="Wishlist">
      <div className="gf-wrap">
        <header className="gf-pagehead">
          <h1>Your <span className="gf-accent">Wishlist</span></h1>
          {items.length > 0 && <p>{items.length} saved gift{items.length !== 1 ? 's' : ''}</p>}
        </header>
        <section className="shop-page">
          {catalog === undefined ? (
            <div className="gf-spin" />
          ) : items.length === 0 ? (
            <div className="shop-empty">
              <i className="bi bi-heart" />
              <h2>Nothing saved yet</h2>
              <p>Tap the heart on any gift to keep it here for later.</p>
              <Link to="/user/products" className="gf-btn mt-2">Discover gifts</Link>
            </div>
          ) : (
            <div className="gift-grid">
              {items.map(p => <ProductCard key={p.pid} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </Shell>
  )
}
