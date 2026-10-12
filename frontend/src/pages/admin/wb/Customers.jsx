import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const COLORS = ['var(--primary)','var(--primary-light)','#10B981','#F59E0B','#EF4444','#3B82F6','var(--primary-light)','#EC4899']
function avatarColor(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return COLORS[Math.abs(h) % COLORS.length]
}

export default function AdminCustomersWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    return !q || c.customer_name?.toLowerCase().includes(q) || c.customer_email?.toLowerCase().includes(q) || c.customer_ph?.includes(q)
  })

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Customers" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div><h2>Customers</h2><p>Manage your customer database</p></div>
          </div>

          {/* STATS */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Total Customers', value: customers.length, icon: 'bi-people',      color: 'purple' },
              { label: 'This Month',      value: customers.filter(c => new Date(c.created_at) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).length, icon: 'bi-person-plus', color: 'green' },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="col-6 col-lg-3">
                <div className="stat-card">
                  <div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div>
                  <div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h5>All Customers ({filtered.length})</h5>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, email, phone…"
                style={{ border: '2px solid var(--border)', borderRadius: '10px', padding: '0.45rem 0.85rem', fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.85rem', outline: 'none', width: '240px' }} />
            </div>

            {loading ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>Loading customers…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                <i className="bi bi-people" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
                {search ? 'No customers match your search.' : 'No customers yet.'}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table-admin">
                  <thead>
                    <tr><th>Customer</th><th>Phone</th><th>Email</th><th>City</th><th>Orders</th><th>Spent</th><th>Joined</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: avatarColor(c.customer_name || ''), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>
                              {initials(c.customer_name)}
                            </div>
                            <span className="fw-bold">{c.customer_name}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '0.82rem' }}>{c.customer_ph}</td>
                        <td style={{ fontSize: '0.82rem' }}>{c.customer_email}</td>
                        <td style={{ fontSize: '0.82rem' }}>{c.city || '—'}</td>
                        <td style={{ fontSize: '0.82rem' }}>{c.order_count}</td>
                        <td style={{ fontSize: '0.82rem', fontWeight: 700 }}>₹{Number(c.total_spent).toLocaleString('en-IN')}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{fmtDate(c.created_at)}</td>
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
