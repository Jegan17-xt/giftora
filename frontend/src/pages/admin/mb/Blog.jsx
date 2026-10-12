import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminBottomNav from '../../../components/admin/mb/AdminBottomNav'
import AdminMobileDrawer from '../../../components/admin/mb/AdminMobileDrawer'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export default function AdminBlogMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [deleting, setDeleting] = useState(null)

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function load() {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchblogposts`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setPosts(r.data.posts || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function deletePost(bid) {
    setDeleting(bid)
    axios.post(`${WS}/deleteblogpost`, new URLSearchParams({ ...params, bid }))
      .then(() => load())
      .finally(() => setDeleting(null))
  }

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="ph">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Blog</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Create &amp; manage articles</div>
          </div>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px', padding: '1rem 1rem 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Loading…</div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>No blog posts yet.</div>
        ) : posts.map(p => (
          <div key={p.bid} style={{ background: '#fff', borderRadius: '16px', padding: '0.9rem', marginBottom: '14px', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {p.blog_img ? (
              <img src={`${IMG}blog/${p.blog_img}`} alt={p.title} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '72px', height: '72px', borderRadius: '12px', background: 'rgba(var(--primary-rgb),0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="bi bi-newspaper" style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                {p.tag && <span style={{ fontSize: '0.65rem', fontWeight: 800, background: 'rgba(var(--primary-rgb),0.1)', color: 'var(--primary)', padding: '1px 7px', borderRadius: '99px' }}>{p.tag}</span>}
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: p.status == 1 ? '#22C55E' : '#FBBF24', background: p.status == 1 ? '#22C55E15' : '#FBBF2415', padding: '1px 7px', borderRadius: '99px' }}>
                  {p.status == 1 ? 'Published' : 'Draft'}
                </span>
              </div>
              <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-dark)', lineHeight: 1.35, marginBottom: '4px' }}>{p.title}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginBottom: '8px' }}>{p.created_at?.slice(0, 10)}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button disabled={deleting === p.bid} onClick={() => deletePost(p.bid)}
                  style={{ fontSize: '0.72rem', padding: '3px 10px', background: '#FFF0F0', border: 'none', borderRadius: '8px', color: '#EF4444', fontWeight: 700, cursor: 'pointer' }}>
                  <i className="bi bi-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminBottomNav />
    </div>
  )
}
