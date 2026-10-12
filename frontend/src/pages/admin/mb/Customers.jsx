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

const COLORS = ['var(--primary)', 'var(--primary-light)', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']
function avatarColor(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return COLORS[Math.abs(h) % COLORS.length]
}

export default function AdminCustomersMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [customers, setCustomers] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState('')

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  useEffect(() => {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchcustomers`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setCustomers(r.data.customers || []) })
      .finally(() => setLoading(false))
  }, [])

  const filtered = customers.filter(c => {
    const q = search.toLowerCase()
    return !q || c.customer_name?.toLowerCase().includes(q) || c.customer_ph?.includes(q)
  })

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="ph">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Customers</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{customers.length} total customers</div>
          </div>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px' }}>
        <div style={{ padding: '1rem' }}>
          <div className="searchbar" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bi bi-search" style={{ color: 'var(--text-light)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search customers…"
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.88rem', color: 'var(--text-dark)' }} />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>No customers found.</div>
        ) : (
          <div style={{ padding: '0 1rem' }}>
            {filtered.map(c => (
              <div key={c.id} style={{ background: '#fff', borderRadius: '16px', padding: '1rem', marginBottom: '12px', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: avatarColor(c.customer_name || ''), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', flexShrink: 0 }}>
                  {initials(c.customer_name)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{c.customer_name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{c.customer_ph}</div>
                  {c.customer_email && <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{c.customer_email}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
