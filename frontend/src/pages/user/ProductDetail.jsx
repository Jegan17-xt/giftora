import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Shell, { Reveal, SectionHead, Stars } from '../../components/user/Shell'
import ProductCard, { isCardProduct } from '../../components/user/ProductCard'
import getClientId from '../../utils/useClientId'
import { addToCart } from '../../utils/cart'
import { toggleWishlist, useWishlist } from '../../utils/wishlist'
import { useHome, useContact } from '../../utils/storeData'
import { showToast, copyCode } from '../../utils/toast'
import { money, discountPct, fmtDate } from '../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL
export const GIFT_NOTE_KEY = 'store_gift_message'

export default function UserProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const wishlist = useWishlist()
  const offers   = useHome()?.offers || []
  const info     = useContact()?.info || {}
  const [data, setData] = useState(null)   // null = loading, false = not found
  const [qty, setQty]   = useState(1)
  const [zoom, setZoom] = useState(null)   // transform-origin while hovering the image
  const [note, setNote] = useState(() => localStorage.getItem(GIFT_NOTE_KEY) || '')

  useEffect(() => {
    setData(null)
    setQty(1)
    axios.post(`${WS}/fetchproductdetail`, new URLSearchParams({ ...getClientId(), pid: id }))
      .then(r => setData(r.data.status === 1 ? r.data : false))
      .catch(() => setData(false))
  }, [id])

  // The note travels with the cart and is filled in on the checkout form.
  useEffect(() => {
    try { note ? localStorage.setItem(GIFT_NOTE_KEY, note) : localStorage.removeItem(GIFT_NOTE_KEY) } catch { /* storage unavailable */ }
  }, [note])

  if (data === null) return <Shell><div className="gf-spin" style={{ minHeight: '60vh', alignItems: 'center' }} /></Shell>
  if (data === false) {
    return (
      <Shell title="Gift not found">
        <div className="shop-empty" style={{ minHeight: '55vh', justifyContent: 'center' }}>
          <i className="bi bi-gift" />
          <h2>This gift is no longer available</h2>
          <Link to="/user/products" className="gf-btn mt-2">Browse all gifts</Link>
        </div>
      </Shell>
    )
  }

  const p      = data.product
  const stock  = Number(p.stock)
  const off    = discountPct(p.mrp, p.price)
  const max    = Math.min(20, stock)
  const wished = wishlist.has(p.pid)
  const reviews = data.reviews || []
  const avg    = reviews.length ? reviews.reduce((n, r) => n + Number(r.rating || 0), 0) / reviews.length : 0

  const shipping = Number(info.shipping_charge) || 0
  const freeMin  = Number(info.free_shipping_min) || 0

  function add() {
    addToCart(p, qty)
    showToast(`${qty} × ${p.product_name} added to cart`, '/user/cart', 'View cart')
  }
  function buyNow() {
    addToCart(p, qty)
    navigate('/user/checkout')
  }
  function track(e) {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <Shell title={p.product_name} description={p.description} className={stock > 0 ? 'has-bar' : ''}>
      <div className="gf-wrap">
        <header className="gf-pagehead" style={{ paddingBottom: 0 }}>
          <nav className="gf-crumbs" aria-label="Breadcrumb">
            <Link to="/user">Home</Link><span>/</span><Link to="/user/products">Shop</Link>
            {p.cat_name && <><span>/</span><Link to={`/user/products?cat=${p.cat_id}`}>{p.cat_name}</Link></>}
          </nav>
        </header>

        <section className="shop-page">
          <div className={`pd${isCardProduct(p) ? ' pd--fit' : ''}`}>
            <div className="pd-gallery">
              <div className={`pd-img${zoom && p.product_img && !isCardProduct(p) ? ' zoom' : ''}`} onMouseMove={track} onMouseLeave={() => setZoom(null)}>
                {p.product_img
                  ? <img src={`${IMG}products/${p.product_img}`} alt={p.product_name} style={zoom ? { transformOrigin: zoom } : null} fetchpriority="high" />
                  : <i className="bi bi-gift" />}
                {off > 0 && <span className="gift-badge">−{off}%</span>}
              </div>
            </div>

            <div>
              {p.cat_name && <Link to={`/user/products?cat=${p.cat_id}`} className="gf-eyebrow" style={{ marginBottom: 0 }}>{p.cat_name}</Link>}
              <h1 className="pd-title">{p.product_name}</h1>
              {reviews.length > 0 && (
                <a href="#reviews" className="gf-rating"><Stars value={avg} /><b>{avg.toFixed(1)}</b>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</a>
              )}

              <div className="pd-price">
                <span className="now">{money(p.price)}</span>
                {off > 0 && <><span className="was">MRP {money(p.mrp)}</span><span className="off">Save {money(Number(p.mrp) - Number(p.price))} ({off}%)</span></>}
              </div>
              <div className="pd-tax">Inclusive of all taxes</div>
              <div className={`pd-stock ${stock < 1 ? 'out' : stock <= 5 ? 'low' : 'in'}`}>
                {stock < 1 ? 'Out of stock' : stock <= 5 ? `Only ${stock} left` : 'In stock'}
              </div>

              {p.description && <p className="pd-desc">{p.description}</p>}

              <div className="pd-buy">
                {stock > 0 && (
                  <>
                    <div className="qty-step">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity"><i className="bi bi-dash" /></button>
                      <span aria-live="polite">{qty}</span>
                      <button onClick={() => setQty(q => Math.min(max, q + 1))} disabled={qty >= max} aria-label="Increase quantity"><i className="bi bi-plus" /></button>
                    </div>
                    <button className="gf-btn gf-btn--ghost" onClick={add}><i className="bi bi-bag-plus" />Add to Cart</button>
                    <button className="gf-btn" onClick={buyNow}><i className="bi bi-lightning-charge" />Buy Now</button>
                  </>
                )}
                <button className={`pd-wish${wished ? ' on' : ''}`} onClick={() => toggleWishlist(p.pid)} aria-pressed={wished}
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}>
                  <i className={`bi bi-heart${wished ? '-fill' : ''}`} />
                </button>
              </div>

              {offers.length > 0 && (
                <div className="pd-box">
                  <h6><i className="bi bi-tag" />Available offers</h6>
                  <ul>
                    {offers.map(o => (
                      <li key={o.code} className="pd-coupon">
                        <span>{o.description || (o.discount_type === 'flat' ? `${money(o.discount_value)} off` : `${Number(o.discount_value)}% off`)}
                          {Number(o.min_order) > 0 && !o.description && ` on orders above ${money(o.min_order)}`}</span>
                        <code role="button" tabIndex={0} onClick={() => copyCode(o.code)} onKeyDown={e => { if (e.key === 'Enter') copyCode(o.code) }}
                          aria-label={`Copy coupon code ${o.code}`}>{o.code}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pd-box">
                <h6><i className="bi bi-truck" />Delivery information</h6>
                <ul>
                  <li><i className="bi bi-check2" />{shipping === 0
                    ? 'Free delivery on every order.'
                    : freeMin > 0
                      ? `Delivery ${money(shipping)}; free on orders of ${money(freeMin)} or more.`
                      : `Delivery charge ${money(shipping)} per order.`}</li>
                  <li><i className="bi bi-check2" />Choose your preferred delivery date at checkout.</li>
                  <li><i className="bi bi-check2" />Cash on delivery available.</li>
                </ul>
              </div>

              <div className="pd-box">
                <h6><i className="bi bi-chat-heart" /><label htmlFor="pd-note" style={{ margin: 0 }}>Add a gift message</label></h6>
                <textarea id="pd-note" maxLength={500} value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Write a note for the card. You can edit it again at checkout." />
              </div>

              {p.sku && <div className="pd-tax" style={{ marginTop: 12 }}>SKU: {p.sku}</div>}
            </div>
          </div>
        </section>

        {reviews.length > 0 && (
          <section className="gf-sec gf-sec--tight" id="reviews" aria-label="Customer reviews">
            <Reveal>
              <SectionHead title="Customer" accent="reviews" />
              <div className="gf-reviews">
                {reviews.slice(0, 6).map(rv => (
                  <figure key={rv.rid} className="gf-review" style={{ margin: 0 }}>
                    <Stars value={rv.rating} />
                    <blockquote>“{rv.review_text}”</blockquote>
                    <figcaption className="who">
                      <span className="gf-avatar">{rv.reviewer_name?.[0]?.toUpperCase() || '?'}</span>
                      <span><b>{rv.reviewer_name}</b><span>{fmtDate(rv.created_at)}</span></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {data.related?.length > 0 && (
          <section className="gf-sec gf-sec--tight" aria-label="Related products">
            <Reveal>
              <SectionHead title="You may also" accent="like" to={p.cat_id ? `/user/products?cat=${p.cat_id}` : '/user/products'} />
              <div className="gift-grid">
                {data.related.map(r => <ProductCard key={r.pid} product={r} />)}
              </div>
            </Reveal>
          </section>
        )}
      </div>

      {stock > 0 && (
        <div className="pd-bar">
          <div className="p">{money(p.price)}{off > 0 && <small>{money(p.mrp)}</small>}</div>
          <button className="gf-btn" onClick={add}><i className="bi bi-bag-plus" />Add to Cart</button>
        </div>
      )}
    </Shell>
  )
}
