import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Shell, { Reveal, SectionHead, Stars } from '../../components/user/Shell'
import ProductCard from '../../components/user/ProductCard'
import Newsletter from '../../components/user/Newsletter'
import useVendorLogo from '../../utils/useVendorLogo'
import { useHome, useCatalog, useRatings, OCCASIONS, productsForOccasion, productsInCategoryLike } from '../../utils/storeData'
import { copyCode } from '../../utils/toast'
import { money, fmtDate, discountPct } from '../../utils/format'

const IMG = import.meta.env.VITE_IMG_URL

function Hero({ banners, title, tagline }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = banners.length

  useEffect(() => {
    if (n < 2 || paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % n), 5000)
    return () => clearInterval(t)
  }, [n, paused])

  return (
    <section className="gf-hero" aria-label="Featured">
      <div className="gf-wrap">
        <div className="gf-hero-frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {n === 0 ? (
            <div className="gf-hero-empty">
              <h1>{tagline || title}</h1>
              <Link to="/user/products" className="gf-btn gf-btn--light">Shop gifts <i className="bi bi-arrow-right" /></Link>
            </div>
          ) : banners.map((b, i) => (
            <Link key={b.bid} to="/user/products" className={`gf-hero-slide${i === idx ? ' on' : ''}`}
              aria-hidden={i !== idx} tabIndex={i === idx ? 0 : -1}>
              <img src={`${IMG}homeBanners/${b.banner_img}`} alt={b.banner_title || title}
                loading={i === 0 ? 'eager' : 'lazy'} fetchpriority={i === 0 ? 'high' : 'auto'} />
            </Link>
          ))}
          {n > 1 && (
            <>
              <button className="gf-hero-nav prev" aria-label="Previous banner" onClick={() => setIdx(i => (i - 1 + n) % n)}><i className="bi bi-chevron-left" /></button>
              <button className="gf-hero-nav next" aria-label="Next banner" onClick={() => setIdx(i => (i + 1) % n)}><i className="bi bi-chevron-right" /></button>
              <div className="gf-hero-dots">
                {banners.map((b, i) => <button key={b.bid} className={i === idx ? 'on' : ''} aria-label={`Banner ${i + 1}`} onClick={() => setIdx(i)} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function ProductRail({ products }) {
  return <div className="gf-rail">{products.map(p => <ProductCard key={p.pid} product={p} />)}</div>
}

function offerHeadline(o) {
  return o.discount_type === 'flat' ? `${money(o.discount_value)} OFF` : `${Number(o.discount_value)}% OFF`
}

export default function UserHome() {
  const { appTitle, tagline } = useVendorLogo()
  const home    = useHome()
  const catalog = useCatalog()
  const ratings = useRatings()

  if (home === undefined) {
    return <Shell><div className="gf-spin" style={{ minHeight: '60vh', alignItems: 'center' }} /></Shell>
  }

  const info       = home?.info?.[0] || {}
  const banners    = home?.banners || []
  const categories = home?.categories || []
  const featured   = home?.featured || []
  const latest     = home?.products || []
  const offers     = home?.offers || []
  const reviews    = home?.reviews || []
  const blog       = home?.blog || []
  const all        = catalog?.products || []

  // Ranked by what customers say (review count, then rating), then by the size of the saving.
  const bestSellers = [...all].sort((a, b) => {
    const ra = ratings[a.product_name], rb = ratings[b.product_name]
    return ((rb?.count || 0) - (ra?.count || 0)) || ((rb?.avg || 0) - (ra?.avg || 0)) || (discountPct(b.mrp, b.price) - discountPct(a.mrp, a.price))
  }).slice(0, 8)

  const surprise = productsInCategoryLike(all, 'surprise', 'personal').slice(0, 6)
  const cards    = productsInCategoryLike(all, 'card').slice(0, 8)
  const cardCat  = categories.find(c => c.cat_name.toLowerCase().includes('card'))
  const surpCat  = categories.find(c => c.cat_name.toLowerCase().includes('surprise'))
  const occasions = OCCASIONS.map(o => ({ ...o, count: productsForOccasion(all, o.slug).length }))

  const shipping = Number(info.shipping_charge) || 0
  const freeMin  = Number(info.free_shipping_min) || 0
  const perks = [
    { icon: 'bi-truck', title: shipping === 0 ? 'Free delivery' : freeMin > 0 ? `Free delivery over ${money(freeMin)}` : `Delivery from ${money(shipping)}`, sub: 'Packed and sent with care' },
    { icon: 'bi-chat-heart', title: 'Free gift message', sub: 'Add a note at checkout' },
    { icon: 'bi-cash-coin', title: 'Cash on delivery', sub: 'Pay when it arrives' },
    { icon: 'bi-headset', title: info.phone || 'Friendly support', sub: info.open_time && info.close_time ? `${info.open_time} – ${info.close_time}` : 'We are here to help' },
  ]

  return (
    <Shell description={tagline}>
      <Hero banners={banners} title={appTitle} tagline={tagline} />

      <div className="gf-wrap">
        <div className="gf-perks">
          {perks.map(p => (
            <div key={p.icon} className="gf-perk"><i className={`bi ${p.icon}`} /><div><b>{p.title}</b><span>{p.sub}</span></div></div>
          ))}
        </div>
      </div>

      {categories.length > 0 && (
        <section className="gf-sec" aria-labelledby="cat-h">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Browse" title="Shop by" accent="Category" to="/user/products" toLabel="All gifts" />
              <div className="cat-tiles">
                {categories.map(c => (
                  <Link key={c.cat_id} to={`/user/products?cat=${c.cat_id}`} className="cat-tile">
                    <div className="cat-tile-img">
                      {c.cat_img ? <img src={`${IMG}categories/${c.cat_img}`} alt={c.cat_name} loading="lazy" decoding="async" /> : <i className="bi bi-gift" />}
                    </div>
                    <div className="cat-tile-name">{c.cat_name}</div>
                    <div className="cat-tile-count">{c.product_count} gift{c.product_count !== 1 ? 's' : ''}</div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="gf-sec gf-sec--tint" aria-label="Trending gifts">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Most loved right now" title="Trending" accent="Gifts" to="/user/products" />
              <ProductRail products={featured} />
            </Reveal>
          </div>
        </section>
      )}

      {offers.length > 0 && (
        <section className="gf-sec" aria-label="Offers">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Save more" title="Offers &" accent="Discounts" sub="Tap a code to copy it, then apply it in your cart." />
              <div className="gf-offers">
                {offers.map(o => (
                  <div key={o.code} className="gf-offer">
                    <span className="big">{offerHeadline(o)}</span>
                    <p>{o.description || (Number(o.min_order) > 0 ? `On orders above ${money(o.min_order)}` : 'On your order')}</p>
                    <button className="code" onClick={() => copyCode(o.code)} aria-label={`Copy coupon code ${o.code}`}>
                      {o.code} <i className="bi bi-copy" />
                    </button>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="gf-sec gf-sec--tint" aria-label="Shop by occasion">
        <div className="gf-wrap">
          <Reveal>
            <SectionHead center eyebrow="Gift collections" title="Find a gift for every" accent="occasion" />
            <div className="gf-occ">
              {occasions.map(o => (
                <Link key={o.slug} to={`/user/products?occasion=${o.slug}`}>
                  <span className="ico" style={{ background: o.tint }}><i className={`bi ${o.icon}`} /></span>
                  <span><b>{o.label}</b><span>{o.count > 0 ? `${o.count} gift${o.count !== 1 ? 's' : ''}` : 'Explore gifts'}</span></span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="gf-sec" aria-label="Best sellers">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Customer favourites" title="Best" accent="Sellers" to="/user/products" />
              <ProductRail products={bestSellers} />
            </Reveal>
          </div>
        </section>
      )}

      {surprise.length > 0 && (
        <section className="gf-sec gf-sec--tint" aria-label="Personalised and surprise gifts">
          <div className="gf-wrap">
            <Reveal className="gf-split">
              <div className="gf-split-panel">
                <i className="bi bi-magic" />
                <span className="gf-eyebrow">Made for them</span>
                <h2 className="gf-h gf-h--sm">Personalised &amp; Surprise Gifts</h2>
                <p>Add a name, a photo or a message, or let a surprise box do the talking.</p>
                <Link to={surpCat ? `/user/products?cat=${surpCat.cat_id}` : '/user/products'} className="gf-btn gf-btn--light" style={{ alignSelf: 'flex-start' }}>
                  Explore <i className="bi bi-arrow-right" />
                </Link>
              </div>
              <div className="gift-grid gift-grid--3">
                {surprise.map(p => <ProductCard key={p.pid} product={p} />)}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="gf-sec" aria-label="Promotion">
        <div className="gf-wrap">
          <Reveal className="gf-promo">
            <div>
              <h2>{offers[0] ? <>Save {offerHeadline(offers[0]).replace(' OFF', '')} with code {offers[0].code}</> : appTitle}</h2>
              <p>{(offers[0] && offers[0].description) || tagline}</p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {offers[0] && <button className="gf-btn gf-btn--light" onClick={() => copyCode(offers[0].code)}><i className="bi bi-copy" />Copy code</button>}
              <Link to="/user/products" className="gf-btn gf-btn--dark">Shop now <i className="bi bi-arrow-right" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {cards.length > 0 && (
        <section className="gf-sec gf-sec--tint" aria-label="Greeting cards">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Say it in words" title="Greeting" accent="Cards" to={cardCat ? `/user/products?cat=${cardCat.cat_id}` : '/user/products'} />
              <ProductRail products={cards} />
            </Reveal>
          </div>
        </section>
      )}

      {latest.length > 0 && (
        <section className="gf-sec" aria-label="New arrivals">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Just in" title="New" accent="Arrivals" to="/user/products" />
              <div className="gift-grid">
                {latest.slice(0, 8).map(p => <ProductCard key={p.pid} product={p} />)}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="gf-sec gf-sec--tint" aria-label="Customer reviews">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Reviews" title="What our customers" accent="say" to="/user/reviews" toLabel="All reviews" />
              <div className="gf-reviews">
                {reviews.map(rv => (
                  <figure key={rv.rid} className="gf-review" style={{ margin: 0 }}>
                    <Stars value={rv.rating} />
                    <blockquote>“{rv.review_text}”</blockquote>
                    <figcaption className="who">
                      <span className="gf-avatar">{rv.reviewer_name?.[0]?.toUpperCase() || '?'}</span>
                      <span><b>{rv.reviewer_name}</b><span>{[rv.product_name, fmtDate(rv.created_at)].filter(Boolean).join(' · ')}</span></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {blog.length > 0 && (
        <section className="gf-sec" aria-label="From the blog">
          <div className="gf-wrap">
            <Reveal>
              <SectionHead eyebrow="Gift ideas" title="From the" accent="journal" to="/user/blog" toLabel="All articles" />
              <div className="gf-posts">
                {blog.map(p => (
                  <Link key={p.bid} to={`/user/blog/${p.bid}`} className="gf-post">
                    <div className="gf-post-img">
                      {p.blog_img ? <img src={`${IMG}blog/${p.blog_img}`} alt={p.title} loading="lazy" decoding="async" /> : <i className="bi bi-journal-text" />}
                    </div>
                    <div className="gf-post-body">
                      {p.tag && <span className="gf-tag">{p.tag}</span>}
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Newsletter />
    </Shell>
  )
}
