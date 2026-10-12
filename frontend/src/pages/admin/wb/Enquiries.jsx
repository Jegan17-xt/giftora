import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import { fmtDate } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL

export default function AdminEnquiriesWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    axios.post(`${WS}/fetchenquiries`)
      .then(r => { if (r.data.status === 1) setRows(r.data.enquiries || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  function setStatus(eid, status) {
    axios.post(`${WS}/updateenquirystatus`, new URLSearchParams({ eid, status })).then(load)
  }
  function remove(e) {
    if (!window.confirm(`Delete the enquiry from ${e.cname}?`)) return
    axios.post(`${WS}/deleteenquiry`, new URLSearchParams({ eid: e.eid })).then(load)
  }

  const unread = rows.filter(r => r.status === 'unread').length

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Enquiries" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header">
            <h2>Enquiries</h2>
            <p>Messages sent from the Contact page{unread > 0 ? ` · ${unread} unread` : ''}</p>
          </div>

          <div className="admin-card">
            {loading ? (
              <div className="text-center py-5"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
            ) : rows.length === 0 ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                <i className="bi bi-envelope-open" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
                No enquiries yet.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table-admin">
                  <thead>
                    <tr><th>From</th><th>Message</th><th>Received</th><th>Status</th><th style={{ width: 110 }}>Actions</th></tr>
                  </thead>
                  <tbody>
                    {rows.map(e => (
                      <tr key={e.eid} style={e.status === 'unread' ? { background: 'rgba(var(--primary-rgb),0.04)' } : {}}>
                        <td style={{ minWidth: 170 }}>
                          <div className="fw-bold">{e.cname}</div>
                          {e.cmobile && <div style={{ fontSize: '0.75rem' }}><a href={`tel:${e.cmobile}`}>{e.cmobile}</a></div>}
                          {e.cemail && <div style={{ fontSize: '0.75rem' }}><a href={`mailto:${e.cemail}`}>{e.cemail}</a></div>}
                        </td>
                        <td style={{ fontSize: '0.85rem', maxWidth: 420 }}>
                          {e.subject && <div className="fw-bold">{e.subject}</div>}
                          <div style={{ whiteSpace: 'pre-line', color: 'var(--text-mid)' }}>{e.message}</div>
                        </td>
                        <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmtDate(e.created_at)}</td>
                        <td><span className={`badge-status ${e.status === 'unread' ? 'bs-pending' : 'bs-confirmed'}`}>{e.status === 'unread' ? 'Unread' : 'Read'}</span></td>
                        <td>
                          <div className="d-flex gap-1">
                            <button className="btn-admin-outline btn-admin-sm"
                              title={e.status === 'unread' ? 'Mark as read' : 'Mark as unread'} aria-label={e.status === 'unread' ? 'Mark as read' : 'Mark as unread'}
                              onClick={() => setStatus(e.eid, e.status === 'unread' ? 'read' : 'unread')}>
                              <i className={`bi ${e.status === 'unread' ? 'bi-envelope-open' : 'bi-envelope'}`} />
                            </button>
                            <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label="Delete enquiry" onClick={() => remove(e)}><i className="bi bi-trash" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
