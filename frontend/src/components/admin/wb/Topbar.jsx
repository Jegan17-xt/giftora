import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../../../utils/adminHelpers'

const WS = import.meta.env.VITE_API_URL

export default function Topbar({ title, onToggle }) {
  const user = getUser()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    axios.post(`${WS}/admindashboard`)
      .then(r => { if (r.data.status === 1) setUnread(r.data.stats.unread_alerts || 0) })
      .catch(() => {})
  }, [])

  // On phones the admin tables are shown as stacked cards (see admin-web.css).
  // Each cell needs its column heading for that, so copy the headings onto the cells.
  useEffect(() => {
    const root = document.querySelector('.admin-wrap')
    if (!root) return
    const label = () => {
      root.querySelectorAll('table.table-admin, table.admin-table').forEach(table => {
        const heads = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim())
        table.querySelectorAll('tbody tr').forEach(tr => {
          [...tr.children].forEach((td, i) => {
            if (heads[i] && td.dataset.label !== heads[i]) td.dataset.label = heads[i]
            // Lets the phone layout drop "—" cells and show image-only cells without a label.
            const text  = td.textContent.trim()
            const empty = text === '—' || (text === '' && !td.children.length)
            const media = text === '' && td.children.length > 0 && !td.querySelector('button, a, select, input')
            if (empty !== ('empty' in td.dataset)) empty ? (td.dataset.empty = '') : delete td.dataset.empty
            if (media !== ('media' in td.dataset)) media ? (td.dataset.media = '') : delete td.dataset.media
          })
        })
      })
    }
    label()
    const observer = new MutationObserver(label)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="admin-topbar">
      <div className="d-flex align-items-center gap-3">
        <button className="sidebar-toggle-btn" onClick={onToggle} aria-label="Toggle menu"><i className="bi bi-list" /></button>
        <div className="topbar-title">{title}</div>
      </div>
      <div className="topbar-right">
        <Link to="/user/home" className="topbar-icon-btn" title="View store"><i className="bi bi-shop" /></Link>
        <Link to="/admin/notifications" className="topbar-icon-btn" title="Notifications">
          <i className="bi bi-bell" />{unread > 0 && <span className="notif-dot" />}
        </Link>
        <Link to="/settings/account" title="My account"
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, textDecoration: 'none' }}>
          {(user.name || 'A')[0].toUpperCase()}
        </Link>
      </div>
    </div>
  )
}
