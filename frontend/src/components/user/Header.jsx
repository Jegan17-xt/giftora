import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import useVendorLogo from '../../utils/useVendorLogo'
import { useCart } from '../../utils/cart'
import { useWishlist } from '../../utils/wishlist'
import { useCatalog, useHome, searchProducts } from '../../utils/storeData'
import { openCartPanel, DOCK_QUERY } from '../../utils/cartPanel'
import { money } from '../../utils/format'

const IMG = import.meta.env.VITE_IMG_URL

function offerLine(o) {
  if (o.description) return o.description
  return o.discount_type === 'flat' ? `${money(o.discount_value)} off` : `${Number(o.discount_value)}% off`
}

export function Logo({ onClick }) {
  const { logoImg, appTitle } = useVendorLogo()
  return (
    <Link to="/user" className="gf-logo" onClick={onClick} aria-label={appTitle ? `${appTitle} home` : 'Home'}>
      {logoImg
        ? <img src={`${IMG}logo/${logoImg}`} alt={appTitle} />
        : <><span className="gf-logo-mark"><i className="bi bi-gift" /></span>{appTitle}</>}
    </Link>
  )
}

/** Search field with live suggestions; opened from the search icon in the navbar. */
function SearchBox({ onDone }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const catalog = useCatalog()
  const [q, setQ] = useState(pathname === '/user/products' ? params.get('q') || '' : '')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const term    = q.trim()
  const matches = term.length >= 2 ? searchProducts(catalog?.products || [], term) : []

  function submit(e) {
    e.preventDefault()
    onDone()
    navigate(term ? `/user/products?q=${encodeURIComponent(term)}` : '/user/products')
  }

  return (
    <form className="gf-search" role="search" onSubmit={submit}>
      <i className="bi bi-search" aria-hidden="true" />
      <input
        ref={inputRef} type="search" value={q} placeholder="Search gifts, cards, flowers…" aria-label="Search products" autoComplete="off"
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => { if (e.key === 'Escape') onDone() }}
      />
      <button type="submit" className="gf-search-go" aria-label="Search"><i className="bi bi-arrow-right" /></button>

      {term.length >= 2 && (
        <div className="gf-suggest">
          {matches.length === 0 ? (
            <div className="none">No gifts match “{term}”.</div>
          ) : (
            <>
              {matches.slice(0, 5).map(p => (
                <Link key={p.pid} to={`/user/products/${p.pid}`} onClick={onDone}>
                  {p.product_img ? <img src={`${IMG}products/${p.product_img}`} alt="" /> : <span className="ph" />}
                  <span>
                    <span className="nm d-block">{p.product_name}</span>
                    <span className="pr">{p.cat_name ? `${p.cat_name} · ` : ''}{money(p.price)}</span>
                  </span>
                </Link>
              ))}
              {matches.length > 5 && (
                <Link className="all" to={`/user/products?q=${encodeURIComponent(term)}`} onClick={onDone}>See all {matches.length} results</Link>
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { appTitle } = useVendorLogo()
  const { count } = useCart()
  const wishlist  = useWishlist()
  const catalog   = useCatalog()
  const home      = useHome()
  const signedIn  = !!localStorage.getItem('mb_user_ph')
  const [menu, setMenu]         = useState(false)
  const [search, setSearch]     = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const catsRef   = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setMenu(false); setSearch(false); setCatsOpen(false) }, [pathname, params])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menu])
  useEffect(() => {
    const away = (e) => {
      if (!catsRef.current?.contains(e.target)) setCatsOpen(false)
      if (!searchRef.current?.contains(e.target)) setSearch(false)
    }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [])

  const categories = catalog?.categories || []
  const offer      = home?.offers?.[0]
  const onShop     = pathname.startsWith('/user/products')
  const tab        = ({ isActive }) => (isActive ? 'on' : '')

  /** On wide screens the cart is docked beside the page; elsewhere the icon opens it as a sheet. */
  function cartClick(e) {
    if (count > 0 && !window.matchMedia(DOCK_QUERY).matches && !['/user/cart', '/user/checkout'].includes(pathname)) {
      e.preventDefault()
      openCartPanel()
    }
  }

  return (
    <>
      {offer && (
        <div className="gf-top">
          <div className="gf-wrap">
            <span><i className="bi bi-stars me-1" />{offerLine(offer)} — use code <b>{offer.code}</b></span>
          </div>
        </div>
      )}

      <header className={`gf-head${scrolled ? ' scrolled' : ''}`}>
        <div className="gf-wrap">
          <div className="gf-head-row">
            <button className="gf-icon gf-burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><i className="bi bi-list" /></button>
            <Logo />

            <nav className="gf-nav" aria-label="Main">
              <NavLink to="/user/home" className={() => (pathname === '/user' || pathname === '/user/home' ? 'on' : '')}><i className="bi bi-house-door" />Home</NavLink>
              <div className="gf-nav-drop" ref={catsRef}>
                <button className={onShop ? 'on' : ''} aria-expanded={catsOpen} aria-haspopup="true" onClick={() => setCatsOpen(o => !o)}>
                  <i className="bi bi-grid" />Categories <i className={`bi bi-chevron-${catsOpen ? 'up' : 'down'} chev`} />
                </button>
                {catsOpen && (
                  <div className="gf-nav-menu">
                    <Link to="/user/products"><i className="bi bi-grid" />All Gifts</Link>
                    {categories.map(c => (
                      <Link key={c.cat_id} to={`/user/products?cat=${c.cat_id}`} className={params.get('cat') === c.cat_id ? 'on' : ''}>
                        {c.cat_img ? <img src={`${IMG}categories/${c.cat_img}`} alt="" /> : <i className="bi bi-gift" />}{c.cat_name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <NavLink to="/user/about" className={tab}><i className="bi bi-info-circle" />About</NavLink>
              <NavLink to="/user/contact" className={tab}><i className="bi bi-telephone" />Contact</NavLink>
            </nav>

            <div className="gf-actions">
              <div className="gf-search-wrap" ref={searchRef}>
                <button className="gf-icon" aria-label="Search" aria-expanded={search} title="Search" onClick={() => setSearch(s => !s)}><i className="bi bi-search" /></button>
                {search && <div className="gf-search-pop"><SearchBox onDone={() => setSearch(false)} /></div>}
              </div>
              <Link to="/user/wishlist" className="gf-icon hide-m" aria-label={`Wishlist, ${wishlist.count} items`} title="Wishlist">
                <i className="bi bi-heart" />{wishlist.count > 0 && <span className="gf-badge">{wishlist.count}</span>}
              </Link>
              <Link to="/user/profile" className="gf-login hide-m" title="Login / Account"><i className="bi bi-person" />{signedIn ? 'Account' : 'Login'}</Link>
              <Link to="/user/cart" className="gf-icon cart-link" aria-label={`Cart, ${count} items`} title="Cart" onClick={cartClick}>
                <i className="bi bi-bag" />{count > 0 && <span className="gf-badge cart-count">{count}</span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`gf-scrim${menu ? ' on' : ''}`} onClick={() => setMenu(false)} />
      <aside className={`gf-drawer${menu ? ' on' : ''}`} aria-hidden={!menu} aria-label="Menu">
        <div className="gf-drawer-head">
          <Logo />
          <button className="gf-icon" aria-label="Close menu" onClick={() => setMenu(false)}><i className="bi bi-x-lg" /></button>
        </div>
        <nav>
          <Link to="/user/home"><i className="bi bi-house" />Home</Link>
          <h6>Categories</h6>
          <Link to="/user/products"><i className="bi bi-grid" />All Gifts</Link>
          {categories.map(c => (
            <Link key={c.cat_id} to={`/user/products?cat=${c.cat_id}`}><i className="bi bi-gift" />{c.cat_name}</Link>
          ))}
          <h6>My {appTitle}</h6>
          <Link to="/user/profile"><i className="bi bi-person" />Login / Account</Link>
          <Link to="/user/my-orders"><i className="bi bi-box-seam" />My Orders</Link>
          <Link to="/user/wishlist"><i className="bi bi-heart" />Wishlist</Link>
          <h6>More</h6>
          <Link to="/user/about"><i className="bi bi-info-circle" />About</Link>
          <Link to="/user/contact"><i className="bi bi-envelope" />Contact</Link>
          <Link to="/user/blog"><i className="bi bi-journal-text" />Blog</Link>
          <Link to="/user/reviews"><i className="bi bi-star" />Reviews</Link>
        </nav>
      </aside>

      {/* Mobile bottom tabs */}
      <nav className="gf-tabs" aria-label="Quick navigation">
        <NavLink to="/user/home" className={() => (pathname === '/user' || pathname === '/user/home' ? 'on' : '')}><i className="bi bi-house" />Home</NavLink>
        <NavLink to="/user/products" className={tab}><i className="bi bi-grid" />Shop</NavLink>
        <NavLink to="/user/wishlist" className={tab}><i className="bi bi-heart" />Wishlist{wishlist.count > 0 && <span className="gf-badge">{wishlist.count}</span>}</NavLink>
        <a href="/user/cart" className={pathname === '/user/cart' ? 'on' : ''}
          onClick={e => { e.preventDefault(); if (count > 0 && pathname !== '/user/cart' && pathname !== '/user/checkout') openCartPanel(); else navigate('/user/cart') }}>
          <i className="bi bi-bag" />Cart{count > 0 && <span className="gf-badge">{count}</span>}
        </a>
        <NavLink to="/user/profile" className={tab}><i className="bi bi-person" />Account</NavLink>
      </nav>
    </>
  )
}
