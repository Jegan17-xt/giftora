import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import { money, fmtDate, orderStatus, ORDER_STATUSES } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL

const inputSt = { padding: '0.55rem 0.85rem' }

/** Download the rows currently shown as a spreadsheet-friendly CSV file. */
function exportCsv(rows) {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = ['Order No', 'Date', 'Customer', 'Phone', 'Email', 'Address', 'City', 'State', 'Pincode', 'Items', 'Subtotal', 'Discount', 'Delivery', 'Total', 'Payment', 'Status', 'Courier', 'Tracking Code', 'Delivery Status']
  const lines = rows.map(o => [o.order_no, o.created_at, o.customer_name, o.customer_ph, o.customer_email, o.address, o.city, o.state, o.pincode, o.item_count,
    o.subtotal, o.discount, o.shipping, o.total, o.payment_status, o.status, o.courier_name, o.tracking_code, o.delivery_status].map(cell).join(','))
  const blob = new Blob(['﻿' + [head.map(cell).join(','), ...lines].join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminOrdersWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [orders,   setOrders]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [statusFilter, setStatusFilter]   = useState('all')
  const [courierFilter, setCourierFilter] = useState('all')
  const [updating, setUpdating] = useState(null)
  const [msg,      setMsg]      = useState(null)

  function load() {
    return axios.post(`${WS}/fetchorders`)
      .then(r => { if (r.data.status === 1) setOrders(r.data.orders || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 3500)
  }

  function changeStatus(oid, status) {
    setUpdating(oid)
    axios.post(`${WS}/updateorderstatus`, new URLSearchParams({ oid, status }))
      .then(r => { flash(r.data.message || 'Updated', r.data.status === 1); return load() })
      .catch(() => flash('Could not update the order', false))
      .finally(() => setUpdating(null))
  }

  const courierNames = [...new Set(orders.map(o => o.courier_name).filter(Boolean))].sort()
  const filtered = orders.filter(o => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q || o.order_no?.toLowerCase().includes(q) || o.customer_name?.toLowerCase().includes(q)
      || o.customer_ph?.includes(q) || o.tracking_code?.toLowerCase().includes(q)
    const matchCourier = courierFilter === 'all' || (courierFilter === 'none' ? !o.courier_name : o.courier_name === courierFilter)
    return matchSearch && matchCourier && (statusFilter === 'all' || o.status === statusFilter)
  })

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Orders" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div><h2>Orders</h2><p>Open an order to assign a courier, add tracking and update its delivery status</p></div>
            <button className="btn-admin-outline" onClick={() => exportCsv(filtered)} disabled={filtered.length === 0}>
              <i className="bi bi-download" />Export ({filtered.length})
            </button>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          <div className="admin-card mb-4">
            <div className="admin-card-body d-flex flex-wrap gap-3 align-items-center">
              <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                <i style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} className="bi bi-search" />
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search orders"
                  placeholder="Search by order no, name, phone, tracking code…" style={{ ...inputSt, paddingLeft: '36px', width: '100%' }} />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={inputSt} aria-label="Filter by status">
                <option value="all">All Status</option>
                {ORDER_STATUSES.map(s => <option key={s} value={s}>{orderStatus(s).label}</option>)}
              </select>
              <select value={courierFilter} onChange={e => setCourierFilter(e.target.value)} style={inputSt} aria-label="Filter by courier">
                <option value="all">All Couriers</option>
                <option value="none">Not assigned</option>
                {courierNames.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="admin-card">
            {loading ? (
              <div className="text-center py-5"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                <i className="bi bi-bag-x" style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} />
                No orders found.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="table-admin">
                  <thead>
                    <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th><th>Courier</th><th>Status</th><th>Change Status</th><th /></tr>
                  </thead>
                  <tbody>
                    {filtered.map(o => {
                      const s = orderStatus(o.status)
                      return (
                        <tr key={o.oid}>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`/admin/orders/${o.oid}`} style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, color: 'var(--primary)', fontSize: '0.84rem' }}>{o.order_no}</Link>
                          </td>
                          <td>
                            <div className="fw-bold">{o.customer_name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{o.customer_ph}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{[o.city, o.pincode].filter(Boolean).join(' – ')}</div>
                          </td>
                          <td>{o.item_count}</td>
                          <td className="fw-bold" style={{ whiteSpace: 'nowrap' }}>{money(o.total)}</td>
                          <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmtDate(o.created_at)}</td>
                          <td>
                            {o.courier_name ? (
                              <>
                                <div className="fw-bold">{o.courier_name}</div>
                                {o.tracking_code && <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{o.tracking_code}</div>}
                              </>
                            ) : <Link to={`/admin/orders/${o.oid}`} style={{ fontSize: '0.8rem', fontWeight: 700 }}>Assign</Link>}
                          </td>
                          <td>
                            <span className={`badge-status ${s.cls}`}>{s.label}</span>
                            {o.delivery_status && <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', marginTop: 3 }}>{o.delivery_status}</div>}
                          </td>
                          <td>
                            <select disabled={updating === o.oid} value={o.status} aria-label={`Status for ${o.order_no}`}
                              onChange={e => changeStatus(o.oid, e.target.value)}>
                              {ORDER_STATUSES.map(st => <option key={st} value={st}>{orderStatus(st).label}</option>)}
                            </select>
                          </td>
                          <td>
                            <Link className="btn-admin-outline btn-admin-sm" title="Open order" aria-label={`Open order ${o.order_no}`} to={`/admin/orders/${o.oid}`}><i className="bi bi-eye" /></Link>
                          </td>
                        </tr>
                      )
                    })}
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
