import { Link } from 'react-router-dom'
import useVendorLogo from '../../utils/useVendorLogo'
import { useContact } from '../../utils/storeData'
import { Logo } from './Header'

export default function Footer() {
  const { appTitle, tagline } = useVendorLogo()
  const data = useContact()
  const ci   = data?.contactinfo
  const sl   = data?.sociallinks
  const info = data?.info
  const cats = data?.categories || []

  const address = [ci?.house_no, ci?.area, ci?.city, ci?.state, ci?.pincode].filter(Boolean).join(', ')
  const hours   = info?.open_time && info?.close_time ? `${info.open_time} – ${info.close_time}` : ''

  return (
    <footer className="gf-foot">
      <div className="gf-wrap">
        <div className="gf-foot-grid">
          <div>
            <Logo />
            {tagline && <p style={{ marginTop: 14, maxWidth: 320, lineHeight: 1.7 }}>{tagline}</p>}
            <div className="gf-social">
              {sl?.insta  && <a href={sl.insta}  target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>}
              {sl?.fb     && <a href={sl.fb}     target="_blank" rel="noreferrer" aria-label="Facebook"><i className="bi bi-facebook" /></a>}
              {sl?.linked && <a href={sl.linked} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>}
            </div>
          </div>

          <div>
            <h6>Shop</h6>
            <ul>
              <li><Link to="/user/products">All Gifts</Link></li>
              {cats.map(c => <li key={c.cat_id}><Link to={`/user/products?cat=${c.cat_id}`}>{c.cat_name}</Link></li>)}
            </ul>
          </div>

          <div>
            <h6>Help</h6>
            <ul>
              <li><Link to="/user/my-orders">Track Order</Link></li>
              <li><Link to="/user/wishlist">Wishlist</Link></li>
              <li><Link to="/user/about">About Us</Link></li>
              <li><Link to="/user/reviews">Reviews</Link></li>
              <li><Link to="/user/blog">Blog</Link></li>
              <li><Link to="/user/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h6>Get in touch</h6>
            <ul>
              {address && <li className="line"><i className="bi bi-geo-alt" /><span>{address}</span></li>}
              {ci?.phone_one && <li className="line"><i className="bi bi-telephone" /><a href={`tel:${ci.phone_one.replace(/\s/g, '')}`}>{ci.phone_one}</a></li>}
              {ci?.email_one && <li className="line"><i className="bi bi-envelope" /><a href={`mailto:${ci.email_one}`}>{ci.email_one}</a></li>}
              {hours && <li className="line"><i className="bi bi-clock" /><span>{hours}</span></li>}
            </ul>
          </div>
        </div>

        <div className="gf-foot-bottom">
          <span>© {new Date().getFullYear()} {appTitle}. All rights reserved.</span>
          <nav aria-label="Policies">
            <Link to="/user/policy/conditions">Terms</Link>
            <Link to="/user/policy/privacy">Privacy</Link>
            <Link to="/user/policy/disclaimer">Disclaimer</Link>
            <Link to="/user/policy/cookiepolicy">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
