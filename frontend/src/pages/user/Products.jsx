import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Shell from '../../components/user/Shell'
import ProductCard from '../../components/user/ProductCard'
import { useCatalog, useRatings, OCCASIONS, productsForOccasion, searchProducts } from '../../utils/storeData'
import { discountPct } from '../../utils/format'

const SORTS = {
  new:    'Newest first',
  low:    'Price: low to high',
  high:   'Price: high to low',
  off:    'Biggest discount',
  rating: 'Top rated',
}

export default function UserProducts() {
  const [params, setParams] = useSearchParams()
  const catalog = useCatalog()
  const ratings = useRatings()

  const cat      = params.get('cat') || ''
  const occasion = params.get('occasion') || ''
  const q        = params.get('q') || ''
  const sort     = SORTS[params.get('sort')] ? params.get('sort') : 'new'

  const products   = catalog?.products || []
  const categories = catalog?.categories || []

  /** Change one filter while keeping the others. */
  function set(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value); else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = occasion ? productsForOccasion(products, occasion) : products
    if (cat) list = list.filter(p => p.cat_id === cat)
    if (q) list = searchProducts(list, q)
    const by = {
      low:    (a, b) => Number(a.price) - Number(b.price),
      high:   (a, b) => Number(b.price) - Number(a.price),
      off:    (a, b) => discountPct(b.mrp, b.price) - discountPct(a.mrp, a.price),
      rating: (a, b) => (ratings[b.product_name]?.avg || 0) - (ratings[a.product_name]?.avg || 0),
    }[sort]
    return by ? [...list].sort(by) : list
  }, [products, cat, occasion, q, sort, ratings])

  const catName = categories.find(c => c.cat_id === cat)?.cat_name
  const occ     = OCCASIONS.find(o => o.slug === occasion)
  const heading = q ? `Results for “${q}”` : occ ? `${occ.label} Gifts` : catName || 'All Gifts'
  const count   = (id) => products.filter(p => p.cat_id === id).length
  const anyFilter = cat || occasion || q

  return (
    <Shell title={heading}>
      <div className="gf-wrap">
        <header className="gf-pagehead">
          <nav className="gf-crumbs" aria-label="Breadcrumb">
            <Link to="/user">Home</Link><span>/</span><Link to="/user/products">Shop</Link>
            {(catName || occ) && <><span>/</span><span>{catName || occ.label}</span></>}
          </nav>
          <h1>{heading}</h1>
        </header>

        <section className="shop-page">
          <div className="gf-shop">
            {/* Desktop filters */}
            <aside className="gf-filters" aria-label="Filters">
              <div>
                <h6>Category</h6>
                <ul>
                  <li><button className={!cat ? 'on' : ''} onClick={() => set('cat', '')}>All gifts <span>{products.length}</span></button></li>
                  {categories.map(c => (
                    <li key={c.cat_id}><button className={cat === c.cat_id ? 'on' : ''} onClick={() => set('cat', c.cat_id)}>{c.cat_name} <span>{count(c.cat_id)}</span></button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h6>Occasion</h6>
                <ul>
                  <li><button className={!occasion ? 'on' : ''} onClick={() => set('occasion', '')}>Any occasion</button></li>
                  {OCCASIONS.map(o => (
                    <li key={o.slug}><button className={occasion === o.slug ? 'on' : ''} onClick={() => set('occasion', o.slug)}>{o.label}</button></li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              {/* Phone / tablet filters */}
              <div className="gf-mfilters">
                <div className="gf-chips" aria-label="Categories">
                  <button className={`gf-chip${!cat ? ' on' : ''}`} onClick={() => set('cat', '')}>All</button>
                  {categories.map(c => (
                    <button key={c.cat_id} className={`gf-chip${cat === c.cat_id ? ' on' : ''}`} onClick={() => set('cat', c.cat_id)}>{c.cat_name}</button>
                  ))}
                </div>
                <div className="gf-chips" aria-label="Occasions">
                  {OCCASIONS.map(o => (
                    <button key={o.slug} className={`gf-chip${occasion === o.slug ? ' on' : ''}`} onClick={() => set('occasion', occasion === o.slug ? '' : o.slug)}>
                      <i className={`bi ${o.icon}`} />{o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="gf-toolbar">
                <span className="count">
                  {catalog === undefined ? 'Loading…' : `${filtered.length} gift${filtered.length !== 1 ? 's' : ''}`}
                  {anyFilter && <> · <button onClick={() => setParams({}, { replace: true })} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Clear filters</button></>}
                </span>
                <select className="gf-select" value={sort} onChange={e => set('sort', e.target.value === 'new' ? '' : e.target.value)} aria-label="Sort products">
                  {Object.entries(SORTS).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
              </div>

              {catalog === undefined ? (
                <div className="gf-spin" />
              ) : filtered.length === 0 ? (
                <div className="shop-empty">
                  <i className="bi bi-search" />
                  <h2>No gifts found</h2>
                  <p>Try a different search, category or occasion.</p>
                  <Link to="/user/products" className="gf-btn mt-2">Browse all gifts</Link>
                </div>
              ) : (
                <div className="gift-grid gift-grid--3">
                  {filtered.map(p => <ProductCard key={p.pid} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Shell>
  )
}
