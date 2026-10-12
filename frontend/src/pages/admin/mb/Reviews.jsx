import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminBottomNav from '../../../components/admin/mb/AdminBottomNav'
import AdminMobileDrawer from '../../../components/admin/mb/AdminMobileDrawer'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function AdminReviewsMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reviews,  setReviews]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [updating, setUpdating] = useState(null)

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
    setUpdating(rid)
    axios.post(`${WS}/updatereviewstatus`, new URLSearchParams({ ...params, rid, status: current == 1 ? 0 : 1 }))
      .then(() => load())
      .finally(() => setUpdating(null))
  }

  const total    = reviews.length
  const approved = reviews.filter(r => r.status == 1).length
  const pending  = reviews.filter(r => r.status == 0).length
  const avg      = total ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / total).toFixed(1) : '—'

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="ph">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Reviews</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Monitor customer feedback</div>
          </div>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '1rem' }}>
          {[
            { label: 'Total', value: total, icon: 'bi-star-fill', c: '#FBBF24' },
            { label: 'Avg Rating', value: avg, icon: 'bi-star-half', c: 'var(--primary)' },
            { label: 'Pending', value: pending, icon: 'bi-clock', c: '#EF4444' },
            { label: 'Approved', value: approved, icon: 'bi-check-circle', c: '#22C55E' },
          ].map(({ label, value, icon, c }) => (
            <div key={label} className="astat">
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                <i className={`bi ${icon}`} style={{ color: c, fontSize: '0.9rem' }} />
              </div>
              <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: 'var(--text-dark)' }}>{value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Loading…</div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>No reviews yet.</div>
        ) : (
          <div style={{ padding: '0 1rem' }}>
            {reviews.map(r => (
              <div key={r.rid} className="rev-c" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>
                    {initials(r.reviewer_name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{r.reviewer_name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{r.product_name}</div>
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: r.status == 1 ? '#22C55E' : '#FBBF24', background: r.status == 1 ? '#22C55E15' : '#FBBF2415', padding: '2px 8px', borderRadius: '99px' }}>
                    {r.status == 1 ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <div style={{ color: '#FBBF24', fontSize: '0.78rem', marginBottom: '6px' }}>
                  {Array.from({ length: r.rating || 5 }, (_, i) => <i key={i} className="bi bi-star-fill" />)}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: '1.6', margin: '0 0 10px' }}>"{r.review_text}"</p>
                <button disabled={updating === r.rid} onClick={() => toggleStatus(r.rid, r.status)}
                  className="btn-o" style={{ fontSize: '0.75rem', padding: '5px 12px' }}>
                  <i className={`bi bi-${r.status == 1 ? 'x-circle' : 'check'}`} />
                  {r.status == 1 ? ' Unpublish' : ' Approve'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
