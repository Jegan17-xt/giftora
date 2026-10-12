import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AdminMbPage from '../../../components/admin/mb/AdminMbPage'
import { money, fmtDate, orderStatus, ORDER_STATUSES } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL
const muted = { textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }

export default function AdminOrdersMb() {
  const [orders,   setOrders]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [tab,      setTab]      = useState('all')
  const [updating, setUpdating] = useState(null)
  const [open,     setOpen]     = useState(null)   // { oid, items }
  const [err,      setErr]      = useState('')

  function load() {
    return axios.post(`${WS}/fetchorders`)
      .then(r => { if (r.data.status === 1) setOrders(r.data.orders || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  function changeStatus(oid, status) {
    setUpdating(oid)
    setErr('')
    axios.post(`${WS}/updateorderstatus`, new URLSearchParams({ oid, status }))
      .then(r => { if (r.data.status !== 1) setErr(r.data.message || 'Could not update the order'); return load() })
      .catch(() => setErr('Could not update the order'))
      .finally(() => setUpdating(null))
  }

  function toggle(oid) {
    if (open?.oid === oid) { setOpen(null); return }
    axios.post(`${WS}/fetchorderdetail`, new URLSearchParams({ oid }))
      .then(r => { if (r.data.status === 1) setOpen({ oid, items: r.data.items }) })
  }

  const filtered = tab === 'all' ? orders : orders.filter(o => o.status === tab)

  return (
    <AdminMbPage title="Orders" subtitle="Manage customer orders">
      <div style={{ display: 'flex', gap: '8px', padding: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['all', ...ORDER_STATUSES].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: '99px', border: 'none', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'Nunito Sans,sans-serif', background: tab === t ? 'var(--primary)' : 'var(--bg-soft)', color: tab === t ? '#fff' : 'var(--primary)', cursor: 'pointer' }}>
            {t === 'all' ? 'All' : orderStatus(t).label}
          </button>
        ))}
      </div>

      {err && <div style={{ margin: '0 1rem 0.75rem', padding: '8px 12px', borderRadius: 10, background: '#FEE2E2', color: '#B91C1C', fontSize: '0.8rem' }}>{err}</div>}

      {loading ? <div style={muted}>Loading…</div> : filtered.length === 0 ? <div style={muted}>No orders found.</div> : (
        <div style={{ padding: '0 1rem' }}>
          {filtered.map(o => {
            const st = orderStatus(o.status)
            return (
              <div key={o.oid} className="abc" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{o.customer_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{o.order_no} · {fmtDate(o.created_at)}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: st.color, background: `${st.color}1A`, padding: '3px 10px', borderRadius: '99px', height: 'fit-content', flexShrink: 0 }}>{st.label}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-mid)' }}>
                  <a href={`tel:${o.customer_ph}`}><i className="bi bi-telephone me-1" />{o.customer_ph}</a>
                  <div><i className="bi bi-geo-alt me-1" />{[o.address, o.city, o.pincode].filter(Boolean).join(', ')}</div>
                  {o.gift_message && <div><i className="bi bi-chat-heart me-1" />{o.gift_message}</div>}
                  <div style={{ marginTop: 4 }}>
                    <i className="bi bi-truck me-1" />
                    {o.courier_name
                      ? <>{o.courier_name}{o.tracking_code ? ` · ${o.tracking_code}` : ''}{o.delivery_status ? ` · ${o.delivery_status}` : ''}</>
                      : 'No courier assigned'}
                    {' · '}<Link to={`/admin/orders/${o.oid}`} style={{ color: 'var(--primary)', fontWeight: 800 }}>{o.courier_name ? 'Manage' : 'Assign courier'}</Link>
                  </div>
                </div>
                {open?.oid === o.oid && (
                  <div style={{ background: 'var(--bg-soft)', borderRadius: 10, padding: '8px 10px', fontSize: '0.78rem', color: 'var(--text-mid)' }}>
                    {open.items.map(it => (
                      <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                        <span>{it.qty} × {it.product_name}</span><b>{money(it.line_total)}</b>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => toggle(o.oid)} style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {money(o.total)} · {o.item_count} item{o.item_count !== 1 ? 's' : ''} <i className={`bi bi-chevron-${open?.oid === o.oid ? 'up' : 'down'}`} />
                  </button>
                  <select disabled={updating === o.oid} value={o.status} aria-label={`Status for ${o.order_no}`}
                    onChange={e => changeStatus(o.oid, e.target.value)}
                    style={{ fontSize: '0.78rem', borderRadius: '8px', border: '1.5px solid var(--border)', padding: '5px 8px', color: 'var(--text-mid)', background: '#fff' }}>
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{orderStatus(s).label}</option>)}
                  </select>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AdminMbPage>
  )
}
