import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

function Stars({ n }) {
  return Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`bi bi-star${i < n ? '-fill' : ''}`} style={{ color: i < n ? '#FBBF24' : '#D1D5DB' }} />
  ))
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function AdminReviewsWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reviews,  setReviews]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState(null)
  const [tab,      setTab]      = useState('all')

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function load() {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchreviews`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setReviews(r.data.reviews || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function toggleStatus(rid, current) {
    const newStatus = current == 1 ? 0 : 1
    setUpdating(rid)
    axios.post(`${WS}/updatereviewstatus`, new URLSearchParams({ ...params, rid, status: newStatus }))
      .then(() => load())
      .finally(() => setUpdating(null))
  }

  const list = tab === 'all' ? reviews : reviews.filter(r => (tab === 'approved' ? r.status == 1 : r.status == 0))
  const total = reviews.length
  const approved = reviews.filter(r => r.status == 1).length
  const pending  = reviews.filter(r => r.status == 0).length
  const avg = reviews.length ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : '—'

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Reviews & Feedback" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header"><h2>Reviews & Feedback</h2><p>Monitor and manage customer reviews</p></div>

          <div className="row g-3 mb-4">
            {[
              { label: 'Total Reviews',  value: total,    icon: 'bi-star-fill', color: 'purple' },
              { label: 'Avg. Rating',    value: avg,      icon: 'bi-star-half', color: 'blue'   },
              { label: 'Approved',       value: approved, icon: 'bi-check-circle', color: 'green' },
              { label: 'Pending',        value: pending,  icon: 'bi-clock',     color: 'pink'   },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="col-6 col-lg-3">
                <div className="stat-card">
                  <div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div>
                  <div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="d-flex gap-2 mb-3">
            {[['all','All'],['approved','Approved'],['pending','Pending']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className={tab === k ? 'btn-admin-primary btn-admin-sm' : 'btn-admin-outline btn-admin-sm'}
                style={{ borderRadius: '99px', padding: '0.35rem 1rem', fontSize: '0.82rem' }}>
                {l}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>Loading reviews…</div>
          ) : list.length === 0 ? (
            <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
              <i className="bi bi-star" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
              No {tab !== 'all' ? tab : ''} reviews yet.
            </div>
          ) : (
            <div className="row g-3">
              {list.map(r => (
                <div key={r.rid} className="col-md-6">
                  <div className="admin-review-card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>
                          {initials(r.reviewer_name)}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{r.reviewer_name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{r.product_name} · {fmtDate(r.created_at)}</div>
                        </div>
                      </div>
                      <span className={`badge-status ${r.status == 1 ? 'bs-confirmed' : 'bs-pending'}`}>
                        {r.status == 1 ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <div style={{ marginBottom: '6px' }}><Stars n={r.rating || 5} /></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: '1.6', margin: '0 0 10px' }}>"{r.review_text}"</p>
                    <div className="d-flex gap-2">
                      <button disabled={updating === r.rid} onClick={() => toggleStatus(r.rid, r.status)}
                        className="btn-admin-outline btn-admin-sm">
                        <i className={`bi bi-${r.status == 1 ? 'x-circle' : 'check'}`} />
                        {r.status == 1 ? ' Unpublish' : ' Approve'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
