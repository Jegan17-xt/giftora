import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const TYPE_ICON = { order: 'bi-bag-check', review: 'bi-star', general: 'bi-bell', enquiry: 'bi-envelope', system: 'bi-gear' }

export default function AdminNotificationsWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(null)

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function load() {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchnotifications`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setNotifications(r.data.notifications || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function markRead(nid) {
    setMarking(nid)
    axios.post(`${WS}/marknotificationread`, new URLSearchParams({ ...params, nid }))
      .then(() => load())
      .finally(() => setMarking(null))
  }

  const unread = notifications.filter(n => !n.is_read).length

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Notifications" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h2>Notifications</h2>
              <p>{unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}</p>
            </div>
          </div>

          <div className="admin-card">
            {loading ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>Loading notifications…</div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                <i className="bi bi-bell-slash" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
                No notifications yet.
              </div>
            ) : (
              notifications.map(n => (
                <div key={n.nid} className={`notif-item${n.is_read ? '' : ' unread'}`}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid #F3F0FF', background: n.is_read ? 'transparent' : 'rgba(var(--primary-rgb),0.03)' }}>
                  <div className="notif-icon" style={{ background: 'rgba(var(--primary-rgb),0.12)', color: 'var(--primary)' }}>
                    <i className={`bi ${TYPE_ICON[n.type] || 'bi-bell'}`} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-dark)', fontFamily: 'Nunito,sans-serif', fontWeight: n.is_read ? 600 : 800 }}>
                      {n.message}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>{fmtDate(n.created_at)}</div>
                  </div>
                  {!n.is_read && (
                    <button disabled={marking === n.nid} onClick={() => markRead(n.nid)}
                      className="btn-admin-outline btn-admin-sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <i className="bi bi-check" /> Mark Read
                    </button>
                  )}
                  {n.is_read && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', flexShrink: 0, paddingTop: '2px' }}>
                      <i className="bi bi-check-all" />
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
