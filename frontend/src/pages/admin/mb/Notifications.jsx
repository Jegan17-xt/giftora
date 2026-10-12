import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminBottomNav from '../../../components/admin/mb/AdminBottomNav'
import AdminMobileDrawer from '../../../components/admin/mb/AdminMobileDrawer'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

const ICON_MAP = {
  order:     { icon: 'bi-bag-check', bg: 'rgba(var(--primary-rgb),0.12)', color: 'var(--primary)' },
  review:    { icon: 'bi-star-fill',       bg: 'rgba(251,191,36,0.12)', color: '#FBBF24' },
  customer:  { icon: 'bi-person-plus',     bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
  cancelled: { icon: 'bi-x-circle-fill',   bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  payment:   { icon: 'bi-cash-coin',       bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  default:   { icon: 'bi-bell-fill',       bg: 'rgba(var(--primary-rgb),0.12)', color: 'var(--primary)' },
}

function getIcon(n) {
  const t = (n.type || n.title || '').toLowerCase()
  if (t.includes('order')) return ICON_MAP.order
  if (t.includes('review'))  return ICON_MAP.review
  if (t.includes('customer') || t.includes('register')) return ICON_MAP.customer
  if (t.includes('cancel'))  return ICON_MAP.cancelled
  if (t.includes('payment') || t.includes('paid')) return ICON_MAP.payment
  return ICON_MAP.default
}

export default function AdminNotificationsMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notifs,   setNotifs]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [marking,  setMarking]  = useState(false)

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function load() {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchnotifications`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setNotifs(r.data.notifications || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function markAllRead() {
    setMarking(true)
    const unread = notifs.filter(n => !n.is_read)
    Promise.all(unread.map(n =>
      axios.post(`${WS}/marknotificationread`, new URLSearchParams({ ...params, nid: n.id }))
    )).then(() => load()).finally(() => setMarking(false))
  }

  const unreadCount = notifs.filter(n => !n.is_read).length

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="ph" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Notifications</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Stay updated on activities</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <button disabled={marking} onClick={markAllRead} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: '10px', padding: '6px 10px', color: '#fff', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
              Mark All Read
            </button>
          )}
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px', padding: '1rem 1rem 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Loading…</div>
        ) : notifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>No notifications yet.</div>
        ) : notifs.map((n, idx) => {
          const { icon, bg, color } = getIcon(n)
          const unread = !n.is_read
          return (
            <div key={n.id || idx} style={{ background: unread ? 'rgba(var(--primary-rgb),0.04)' : '#fff', borderLeft: unread ? '3px solid var(--primary)' : '3px solid transparent', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderRadius: '14px', boxShadow: '0 2px 10px rgba(var(--primary-rgb),0.06)' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={`bi ${icon}`} style={{ color, fontSize: '1rem' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{n.title || n.message}</div>
                {n.message && n.title && <div style={{ fontSize: '0.78rem', color: 'var(--text-mid)', marginTop: '2px', lineHeight: 1.4 }}>{n.message}</div>}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px' }}>{n.created_at}</div>
              </div>
              {unread && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: '4px' }} />}
            </div>
          )
        })}
      </div>

      <AdminBottomNav />
    </div>
  )
}
