import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AdminMbPage from '../../../components/admin/mb/AdminMbPage'
import useVendorLogo from '../../../utils/useVendorLogo'
import { money, fmtDate, orderStatus } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL
const muted = { textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }

export default function AdminDashboardMb() {
  const { appTitle } = useVendorLogo()
  const [stats,   setStats]   = useState(null)
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.post(`${WS}/admindashboard`),
      axios.post(`${WS}/fetchorders`),
    ]).then(([s, o]) => {
      if (s.data.status === 1) setStats(s.data.stats)
      if (o.data.status === 1) setOrders((o.data.orders || []).slice(0, 5))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { icon: 'bi-bag-check',       label: 'Total Orders', value: stats.total_orders,    color: '#3B82F6' },
    { icon: 'bi-hourglass-split', label: 'Pending',      value: stats.pending,         color: '#F59E0B' },
    { icon: 'bi-currency-rupee',  label: 'Revenue',      value: money(stats.revenue),  color: '#22C55E' },
    { icon: 'bi-people-fill',     label: 'Customers',    value: stats.total_customers, color: '#EC4899' },
  ] : []

  return (
    <AdminMbPage title="Dashboard" subtitle={appTitle ? `${appTitle} Admin` : 'Admin'}>
      {loading ? <div style={muted}>Loading…</div> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '1rem' }}>
            {statCards.map(({ icon, label, value, color }) => (
              <div key={label} className="astat">
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <i className={`bi ${icon}`} style={{ color, fontSize: '1rem' }} />
                </div>
                <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.15rem', color: 'var(--text-dark)' }}>{value ?? 0}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{label}</div>
              </div>
            ))}
          </div>

          {stats?.low_stock > 0 && (
            <Link to="/admin/products" style={{ display: 'block', margin: '0 1rem 1rem', padding: '10px 12px', borderRadius: 12, background: '#FEF3C7', color: '#92400E', fontSize: '0.8rem', fontWeight: 700 }}>
              <i className="bi bi-exclamation-triangle me-1" />{stats.low_stock} product{stats.low_stock !== 1 ? 's' : ''} low on stock
            </Link>
          )}

          <div className="sh" style={{ padding: '0 1rem' }}>
            <span className="sh-t">Recent Orders</span>
            <Link to="/admin/orders" className="sh-a">View All <i className="bi bi-chevron-right" /></Link>
          </div>
          <div style={{ padding: '0 1rem' }}>
            {orders.length === 0 ? <div style={muted}>No orders yet.</div> : orders.map(o => {
              const st = orderStatus(o.status)
              return (
                <div key={o.oid} className="abc" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{o.customer_name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{o.order_no} · {money(o.total)} · {fmtDate(o.created_at)}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: st.color, background: `${st.color}1A`, padding: '3px 10px', borderRadius: '99px', flexShrink: 0 }}>{st.label}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </AdminMbPage>
  )
}
