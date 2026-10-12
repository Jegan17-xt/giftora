import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import useVendorLogo from '../../../utils/useVendorLogo'
import { money, fmtDate, orderStatus } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL

export default function AdminDashboardWb() {
  const { appTitle } = useVendorLogo()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats,   setStats]   = useState(null)
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.post(`${WS}/admindashboard`),
      axios.post(`${WS}/fetchorders`),
    ]).then(([s, o]) => {
      if (s.data.status === 1) setStats(s.data.stats)
      if (o.data.status === 1) setOrders((o.data.orders || []).slice(0, 6))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { icon: 'bi-bag-check',       label: 'Total Orders',  value: stats.total_orders,    color: 'purple' },
    { icon: 'bi-hourglass-split', label: 'Pending',       value: stats.pending,         color: 'pink'   },
    { icon: 'bi-currency-rupee',  label: 'Revenue',       value: money(stats.revenue),  color: 'green'  },
    { icon: 'bi-people',          label: 'Customers',     value: stats.total_customers, color: 'blue'   },
  ] : []

  const pct = (n) => Math.round(((n || 0) / (stats?.total_orders || 1)) * 100)

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Dashboard" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header">
            <h2>Dashboard</h2>
            <p>Welcome back! Here's what's happening{appTitle ? ` at ${appTitle}` : ''}.</p>
          </div>

          {/* STATS */}
          {loading ? (
            <div className="text-center py-5"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
          ) : (
            <div className="row g-3 mb-4">
              {statCards.map(({ icon, label, value, color }) => (
                <div key={label} className="col-6 col-xl-3">
                  <div className="stat-card">
                    <div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div>
                    <div style={{ minWidth: 0 }}>
                      <div className="stat-label">{label}</div>
                      <div className="stat-value">{value ?? 0}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stats?.low_stock > 0 && (
            <div className="alert alert-warning py-2 d-flex justify-content-between align-items-center flex-wrap gap-2" style={{ fontSize: '0.85rem', borderRadius: 12 }}>
              <span><i className="bi bi-exclamation-triangle me-1" />{stats.low_stock} product{stats.low_stock !== 1 ? 's are' : ' is'} running low on stock (5 or fewer left).</span>
              <Link to="/admin/products" style={{ fontWeight: 700 }}>Review stock</Link>
            </div>
          )}

          <div className="row g-3">
            {/* RECENT ORDERS */}
            <div className="col-lg-8">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h5>Recent Orders</h5>
                  <Link to="/admin/orders" className="btn-admin-outline" style={{ fontSize: '0.78rem', padding: '0.35rem 0.9rem' }}>View All</Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  {loading ? (
                    <div className="text-center py-4" style={{ color: 'var(--text-light)' }}>Loading…</div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-4" style={{ color: 'var(--text-light)' }}>No orders yet.</div>
                  ) : (
                    <table className="table-admin">
                      <thead>
                        <tr><th>Order</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {orders.map(o => {
                          const s = orderStatus(o.status)
                          return (
                            <tr key={o.oid}>
                              <td className="fw-bold" style={{ fontSize: '0.82rem' }}>{o.order_no}</td>
                              <td>
                                <div className="fw-bold">{o.customer_name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{o.customer_ph}</div>
                              </td>
                              <td className="fw-bold">{money(o.total)}</td>
                              <td style={{ fontSize: '0.82rem' }}>{fmtDate(o.created_at)}</td>
                              <td><span className={`badge-status ${s.cls}`}>{s.label}</span></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* QUICK ACTIONS */}
              <div className="admin-card mb-3">
                <div className="admin-card-header"><h5>Quick Actions</h5></div>
                <div className="admin-card-body d-flex flex-column gap-2">
                  {[
                    { to: '/admin/orders',       icon: 'bi-bag-check',     label: 'Manage Orders',   color: 'purple' },
                    { to: '/admin/products/add', icon: 'bi-plus-circle',   label: 'Add Product',     color: 'pink'   },
                    { to: '/admin/offers',       icon: 'bi-percent',       label: 'Create Offer',    color: 'green'  },
                    { to: '/cms/homebanner',     icon: 'bi-image',         label: 'Update Banners',  color: 'blue'   },
                    { to: '/admin/blog/add',     icon: 'bi-pencil-square', label: 'Write Blog Post', color: 'purple' },
                  ].map(({ to, icon, label, color }) => (
                    <Link key={label} to={to} className="d-flex align-items-center gap-3 p-2" style={{ borderRadius: '10px', textDecoration: 'none' }}>
                      <div className={`stat-icon ${color}`} style={{ width: '38px', height: '38px', borderRadius: '10px', fontSize: '1rem' }}><i className={`bi ${icon}`} /></div>
                      <span style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ORDER SUMMARY */}
              {stats && (
                <div className="admin-card">
                  <div className="admin-card-header"><h5>Order Summary</h5></div>
                  <div className="admin-card-body">
                    {[
                      ['Pending',     stats.pending],
                      ['In progress', stats.in_progress],
                      ['Delivered',   stats.delivered],
                      ['Cancelled',   stats.cancelled],
                    ].map(([name, count]) => (
                      <div key={name} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span style={{ fontSize: '0.82rem', fontFamily: 'Nunito,sans-serif', fontWeight: 700, color: 'var(--text-dark)' }}>{name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{count ?? 0}</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                          <div style={{ height: '100%', width: `${pct(count)}%`, background: 'linear-gradient(90deg,var(--primary),var(--primary-light))', borderRadius: '3px' }} />
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.82rem', color: 'var(--text-mid)' }}>
                      <span>Active products</span><b>{stats.total_products}</b>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
