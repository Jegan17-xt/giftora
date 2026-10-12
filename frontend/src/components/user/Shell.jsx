import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartPanel, { useCartPanelVisible } from './CartPanel'
import { useCart } from '../../utils/cart'
import { usePageMeta, useReveal } from '../../utils/usePage'
import { useToast } from '../../utils/toast'

/** Storefront page frame: announcement bar, header, page content, footer, mobile tabs and toast. */
export default function Shell({ title = '', description = '', className = '', children }) {
  const { pathname } = useLocation()
  const toast = useToast()
  usePageMeta(title, description)
  // With items in the cart the order panel is shown, so the page makes room for it.
  const hasCart = useCartPanelVisible(useCart().count)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className={`gf ${className}${hasCart ? ' has-cart' : ''}`}>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartPanel />
      <div className={`gf-toast${toast ? ' on' : ''}`} role="status" aria-live="polite">
        {toast && <><i className="bi bi-check-circle-fill" />{toast.text}{toast.link && <Link to={toast.link}>{toast.linkLabel}</Link>}</>}
      </div>
    </div>
  )
}

/** Fades its content up the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, seen] = useReveal()
  return <Tag ref={ref} className={`rv${seen ? ' in' : ''} ${className}`} {...rest}>{children}</Tag>
}

export function SectionHead({ eyebrow, title, accent, sub, to, toLabel = 'View all', center = false }) {
  return (
    <div className={`gf-sec-head${center ? ' center' : ''}`}>
      <div>
        {eyebrow && <span className="gf-eyebrow">{eyebrow}</span>}
        <h2 className="gf-h">{title}{accent && <> <span className="gf-accent">{accent}</span></>}</h2>
        {sub && <p className="gf-sub" style={center ? { marginInline: 'auto' } : null}>{sub}</p>}
      </div>
      {to && <Link to={to} className="gf-more">{toLabel} <i className="bi bi-arrow-right" /></Link>}
    </div>
  )
}

export function Stars({ value }) {
  const n = Math.round(Number(value) || 0)
  return <span className="stars" aria-label={`${n} out of 5 stars`}>{'★'.repeat(n)}<span style={{ opacity: 0.25 }}>{'★'.repeat(5 - n)}</span></span>
}
