import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import { useCart } from '../../utils/cart'
import { useWishlist } from '../../utils/wishlist'

const WS = import.meta.env.VITE_API_URL

export default function UserAccount() {
  const cart     = useCart()
  const wishlist = useWishlist()
  const [phone, setPhone] = useState(localStorage.getItem('mb_user_ph') || '')
  const [input, setInput] = useState('')
  const [profile, setProfile] = useState(null)      // null = loading / none
  const [form, setForm]   = useState({ customer_name: '', customer_email: '' })
  const [msg, setMsg]     = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!phone) return
    axios.post(`${WS}/fetchuserprofile`, new URLSearchParams({ ...getClientId(), customer_ph: phone }))
      .then(r => {
        const c = r.data.profile?.[0] || false
        setProfile(c)
        if (c) setForm({ customer_name: c.customer_name || '', customer_email: c.customer_email || '' })
      })
      .catch(() => setProfile(false))
  }, [phone])

  function signIn(e) {
    e.preventDefault()
    const ph = input.replace(/[^0-9+]/g, '')
    if (ph.length < 7) return
    localStorage.setItem('mb_user_ph', ph)
    setProfile(null)
    setPhone(ph)
  }
  function signOut() {
    localStorage.removeItem('mb_user_ph')
    setPhone(''); setProfile(null); setMsg(null)
  }
  function save(e) {
    e.preventDefault()
    setSaving(true)
    axios.post(`${WS}/updateuserprofile`, new URLSearchParams({ ...getClientId(), customer_ph: phone, ...form }))
      .then(r => setMsg({ ok: r.data.status === 1, text: r.data.message || 'Saved' }))
      .catch(() => setMsg({ ok: false, text: 'Could not save your details' }))
      .finally(() => setSaving(false))
  }

  const links = [
    { to: '/user/my-orders', icon: 'bi-box-seam', title: 'My Orders', sub: 'Track and review your orders' },
    { to: '/user/wishlist',  icon: 'bi-heart',    title: 'Wishlist',  sub: `${wishlist.count} saved gift${wishlist.count !== 1 ? 's' : ''}` },
    { to: '/user/cart',      icon: 'bi-bag',      title: 'Cart',      sub: `${cart.count} item${cart.count !== 1 ? 's' : ''}` },
    { to: '/user/contact',   icon: 'bi-headset',  title: 'Help & Support', sub: 'Get in touch with us' },
  ]

  return (
    <Shell title="My Account">
      <div className="gf-wrap" style={{ maxWidth: 980 }}>
        <header className="gf-pagehead">
          <h1>My <span className="gf-accent">Account</span></h1>
        </header>

        <section className="shop-page">
          <div className="row g-4">
            <div className="col-lg-6">
              {!phone ? (
                <div className="shop-panel">
                  <h5><i className="bi bi-person" />Find your account</h5>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.9rem', marginBottom: 14 }}>Enter the phone number you use at checkout to see your details and orders.</p>
                  <form onSubmit={signIn} className="shop-field">
                    <label htmlFor="ac-ph">Phone Number</label>
                    <input id="ac-ph" type="tel" className="form-control" required minLength={7} autoComplete="tel" value={input} onChange={e => setInput(e.target.value)} />
                    <button type="submit" className="gf-btn gf-btn--block mt-3">Continue</button>
                  </form>
                </div>
              ) : (
                <div className="shop-panel">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="gf-avatar" style={{ width: 56, height: 56, fontSize: '1.3rem' }}>{(form.customer_name || '?')[0].toUpperCase()}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800 }}>{form.customer_name || 'Guest'}</div>
                      <div style={{ color: 'var(--ink-3)', fontSize: '0.85rem' }}>{phone}</div>
                    </div>
                    <button onClick={signOut} className="gf-btn gf-btn--ghost gf-btn--sm ms-auto">Sign out</button>
                  </div>

                  {profile === false ? (
                    <div className="gf-alert warn">No orders yet with this number. Your details are saved when you place your first order.</div>
                  ) : profile && (
                    <form onSubmit={save}>
                      <div className="shop-field mb-3">
                        <label htmlFor="ac-name">Name</label>
                        <input id="ac-name" className="form-control" required maxLength={200} autoComplete="name" value={form.customer_name}
                          onChange={e => setForm(p => ({ ...p, customer_name: e.target.value }))} />
                      </div>
                      <div className="shop-field mb-3">
                        <label htmlFor="ac-email">Email</label>
                        <input id="ac-email" type="email" className="form-control" maxLength={150} autoComplete="email" value={form.customer_email}
                          onChange={e => setForm(p => ({ ...p, customer_email: e.target.value }))} />
                      </div>
                      {profile.address && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: 14 }}>
                          <i className="bi bi-geo-alt me-1" />{[profile.address, profile.city, profile.state, profile.pincode].filter(Boolean).join(', ')}
                        </p>
                      )}
                      {msg && <div className={`gf-alert ${msg.ok ? 'ok' : 'err'} mb-3`} role="status">{msg.text}</div>}
                      <button type="submit" className="gf-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
                    </form>
                  )}
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <div className="gf-contact-list">
                {links.map(l => (
                  <Link key={l.to} to={l.to} className="gf-contact-item">
                    <i className={`bi ${l.icon}`} />
                    <span style={{ flex: 1 }}><span style={{ fontWeight: 700, display: 'block' }}>{l.title}</span><b>{l.sub}</b></span>
                    <i className="bi bi-chevron-right" style={{ background: 'none', width: 'auto', color: 'var(--ink-3)', alignSelf: 'center' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  )
}
