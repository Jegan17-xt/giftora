import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import { money, fmtDate, orderStatus } from '../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

const TABS = [
  ['all', 'All'],
  ['active', 'In Progress'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
]
const TRACK = ['pending', 'confirmed', 'packed', 'shipped', 'delivered']
/** When the order first reached a step, taken from its timeline. */
function stepDate(o, step) {
  if (step === 'pending') return o.created_at
  return (o.timeline || []).find(t => t.status === step)?.at || ''
}
const inTab = (o, tab) =>
  tab === 'all' || (tab === 'active' ? !['delivered', 'cancelled'].includes(o.status) : o.status === tab)

export default function UserMyOrders() {
  const [phone, setPhone]   = useState(localStorage.getItem('mb_user_ph') || '')
  const [input, setInput]   = useState('')
  const [orders, setOrders] = useState(null)
  const [tab, setTab]       = useState('all')

  useEffect(() => {
    if (!phone) return
    setOrders(null)
    axios.post(`${WS}/fetchuserorders`, new URLSearchParams({ ...getClientId(), customer_ph: phone }))
      .then(r => setOrders(r.data.status === 1 ? r.data.orders || [] : []))
      .catch(() => setOrders([]))
  }, [phone])

  function lookup(e) {
    e.preventDefault()
    const ph = input.replace(/[^0-9+]/g, '')
    if (ph.length < 7) return
    localStorage.setItem('mb_user_ph', ph)
    setPhone(ph)
  }

  if (!phone) {
    return (
      <Shell title="My Orders">
        <section className="shop-page">
          <div className="gf-wrap" style={{ maxWidth: 460 }}>
            <div className="shop-panel text-center">
              <i className="bi bi-box-seam" style={{ fontSize: '2.4rem', color: 'var(--primary)' }} />
              <h1 className="gf-h gf-h--sm mt-2 mb-1">Track your orders</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)' }}>Enter the phone number you used at checkout.</p>
              <form onSubmit={lookup} className="shop-field text-start">
                <label htmlFor="mo-ph">Phone Number</label>
                <input id="mo-ph" type="tel" className="form-control" required minLength={7} autoComplete="tel" value={input} onChange={e => setInput(e.target.value)} />
                <button type="submit" className="gf-btn gf-btn--block mt-3">View My Orders</button>
              </form>
            </div>
          </div>
        </section>
      </Shell>
    )
  }

  const list = (orders || []).filter(o => inTab(o, tab))

  return (
    <Shell title="My Orders">
      <section className="shop-page">
        <div className="gf-wrap" style={{ maxWidth: 860 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h1 className="gf-h">My <span className="gf-accent">Orders</span></h1>
            <span style={{ fontSize: '0.82rem', color: 'var(--ink-3)' }}>
              {phone} ·{' '}
              <button onClick={() => { localStorage.removeItem('mb_user_ph'); setPhone(''); setOrders(null) }}
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>Change</button>
            </span>
          </div>

          <div className="gf-chips mb-3">
            {TABS.map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                className={`gf-chip${tab === key ? ' on' : ''}`}
                >
                {label}
              </button>
            ))}
          </div>

          {orders === null ? (
            <div className="text-center py-5"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
          ) : list.length === 0 ? (
            <div className="shop-empty">
              <i className="bi bi-box-seam" />
              {orders.length === 0 ? 'No orders found for this phone number.' : 'No orders in this tab.'}
              <div className="mt-3"><Link to="/user/products" className="gf-btn">Shop Gifts</Link></div>
            </div>
          ) : list.map(o => {
            const st = orderStatus(o.status)
            return (
              <div key={o.oid} className="order-card">
                <div className="order-head">
                  <div>
                    <div className="order-no">{o.order_no}</div>
                    <div className="order-meta">Placed on {fmtDate(o.created_at)}{o.delivery_date ? ` · Deliver by ${fmtDate(o.delivery_date)}` : ''}</div>
                  </div>
                  <span className="order-pill" style={{ color: st.color, background: `${st.color}1A` }}>{st.label}</span>
                </div>
                {o.status !== 'cancelled' && (
                  <div className="gf-track" aria-label={`Order progress: ${st.label}`}>
                    {TRACK.map((step, i) => {
                      const when = stepDate(o, step)
                      return (
                        <div key={step} className={i <= TRACK.indexOf(o.status) ? 'done' : ''}>
                          {orderStatus(step).label}{when && <small>{fmtDate(when)}</small>}
                        </div>
                      )
                    })}
                  </div>
                )}
                {(o.courier || o.delivery_status) && (
                  <div className="gf-ship">
                    <i className="bi bi-truck" />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      {o.delivery_status && <div className="now">{o.delivery_status}</div>}
                      {o.courier && (
                        <div>
                          Shipped with <b>{o.courier.name}</b>
                          {o.tracking_code && <> · Tracking code <b className="code">{o.tracking_code}</b></>}
                        </div>
                      )}
                      {o.courier?.contact_number && <div>Courier contact: <a href={`tel:${o.courier.contact_number.replace(/\s/g, '')}`}>{o.courier.contact_number}</a></div>}
                    </div>
                    {o.courier?.tracking_link && (
                      <a href={o.courier.tracking_link} target="_blank" rel="noreferrer" className="gf-btn gf-btn--ghost gf-btn--sm">Track parcel <i className="bi bi-box-arrow-up-right" /></a>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {o.items.map(it => (
                    <div key={it.id} className="order-item">
                      <span className="cart-thumb">
                        {it.product_img ? <img src={`${IMG}products/${it.product_img}`} alt="" /> : <i className="bi bi-gift" />}
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>{it.product_name} <span style={{ color: 'var(--ink-3)' }}>× {it.qty}</span></span>
                      <b style={{ color: 'var(--ink)' }}>{money(it.line_total)}</b>
                    </div>
                  ))}
                </div>
                <div className="order-foot">
                  <span><i className="bi bi-geo-alt me-1" />{[o.recipient_name || o.customer_name, o.city, o.pincode].filter(Boolean).join(', ')}</span>
                  <span>
                    {Number(o.discount) > 0 && <span className="me-2" style={{ color: '#16A34A' }}>Saved {money(o.discount)}</span>}
                    Total <b style={{ color: 'var(--ink)' }}>{money(o.total)}</b>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Shell>
  )
}
