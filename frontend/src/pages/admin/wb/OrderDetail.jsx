import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import useVendorLogo from '../../../utils/useVendorLogo'
import { money, orderStatus, ORDER_STATUSES } from '../../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

function fmtDateTime(value) {
  if (!value) return '—'
  const d = new Date(String(value).replace(' ', 'T'))
  return isNaN(d) ? String(value) : d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const Row = ({ label, children }) => (
  <div className="d-flex justify-content-between gap-3 py-1" style={{ fontSize: '0.88rem' }}>
    <span style={{ color: 'var(--a-ink-3)', flexShrink: 0 }}>{label}</span>
    <span style={{ color: 'var(--a-ink)', fontWeight: 600, textAlign: 'right', overflowWrap: 'anywhere' }}>{children}</span>
  </div>
)

export default function AdminOrderDetailWb() {
  const { oid } = useParams()
  const navigate = useNavigate()
  const { appTitle } = useVendorLogo()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData]   = useState(undefined)   // undefined = loading, null = not found
  const [form, setForm]   = useState({ status: 'pending', delivery_status: '', note: '', courier_id: '', tracking_code: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]     = useState(null)

  /** Load the server's view of the order into the page and the form. */
  function apply(d) {
    setData(d)
    setForm({
      status: d.order.status, delivery_status: d.order.delivery_status || '', note: '',
      courier_id: d.order.courier_id || '', tracking_code: d.order.tracking_code || '',
    })
  }

  useEffect(() => {
    setData(undefined)
    axios.post(`${WS}/fetchorderdetail`, new URLSearchParams({ oid }))
      .then(r => (r.data.status === 1 ? apply(r.data) : setData(null)))
      .catch(() => setData(null))
  }, [oid])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 5000)
  }

  /** Save status, delivery status, courier and tracking code together. extra = { auto_code: 1 } takes a pool code. */
  function save(extra = {}) {
    setSaving(true)
    axios.post(`${WS}/updateorderstatus`, new URLSearchParams({ oid, ...form, ...extra }))
      .then(r => {
        if (r.data.status === 1) { apply(r.data); flash('Order updated') }
        else flash(r.data.message || 'Could not update the order', false)
      })
      .catch(() => flash('Could not update the order', false))
      .finally(() => setSaving(false))
  }

  function remove() {
    const o = data.order
    const restock = !['cancelled', 'delivered'].includes(o.status)
    if (!window.confirm(`Delete order ${o.order_no}? This cannot be undone.${restock ? ' Its items go back into stock.' : ''}`)) return
    axios.post(`${WS}/deleteorder`, new URLSearchParams({ oid }))
      .then(r => { if (r.data.status === 1) navigate('/admin/orders'); else flash(r.data.message || 'Delete failed', false) })
      .catch(() => flash('Delete failed', false))
  }

  const frame = (body) => (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Order" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">{body}</div>
      </div>
    </div>
  )

  if (data === undefined) return frame(<div className="text-center py-5"><span className="spinner-border" /></div>)
  if (data === null) {
    return frame(
      <div className="admin-card"><div className="text-center py-5">
        <i className="bi bi-bag-x" />Order not found.
        <div className="mt-3"><Link to="/admin/orders" className="btn-admin-outline">Back to Orders</Link></div>
      </div></div>
    )
  }

  const o        = data.order
  const st       = orderStatus(o.status)
  const couriers = data.couriers.filter(c => Number(c.status) === 1 || c.cid === o.courier_id)
  const picked   = data.couriers.find(c => c.cid === form.courier_id)
  const itemCount = data.items.reduce((n, it) => n + Number(it.qty), 0)
  const dirty = form.status !== o.status || form.delivery_status !== (o.delivery_status || '') || form.note.trim() !== ''
    || form.courier_id !== (o.courier_id || '') || form.tracking_code.trim() !== (o.tracking_code || '')

  // Newest first: every admin change, then the moment the order was placed.
  const timeline = [
    ...data.updates.map(u => ({
      key: u.id, title: orderStatus(u.status).label, at: u.created_at, by: u.admin_name,
      lines: [
        u.delivery_status,
        u.courier_name && `Courier: ${u.courier_name}${u.tracking_code ? ` · ${u.tracking_code}` : ''}`,
      ].filter(Boolean),
      note: u.note,
    })),
    { key: 'placed', title: 'Order placed', at: o.created_at, lines: [`${o.customer_name} · ${money(o.total)}`] },
  ]

  return frame(
    <>
      <div className="page-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <nav aria-label="breadcrumb"><ol className="breadcrumb mb-1">
            <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/orders">Orders</Link></li>
            <li className="breadcrumb-item active">{o.order_no}</li>
          </ol></nav>
          <h2>Order {o.order_no} <span className={`badge-status ${st.cls} ms-1`} style={{ verticalAlign: 'middle' }}>{st.label}</span></h2>
          <p>Placed on {fmtDateTime(o.created_at)} · {itemCount} item{itemCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="d-flex gap-2 flex-wrap no-print">
          <button className="btn-admin-outline" onClick={() => window.print()}><i className="bi bi-printer" />Print Invoice</button>
          <button className="btn-admin-danger" onClick={remove}><i className="bi bi-trash" />Delete Order</button>
          <Link to="/admin/orders" className="btn-admin-outline"><i className="bi bi-arrow-left" />Back</Link>
        </div>
      </div>

      {/* Only shown on the printed invoice */}
      <div className="print-only" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{appTitle}</h2>
        <div>Invoice for order {o.order_no} · {fmtDateTime(o.created_at)}</div>
      </div>

      {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3 no-print`} role="status">{msg.text}</div>}

      <div className="row g-3">
        {/* ── LEFT ── */}
        <div className="col-lg-8">
          <div className="admin-card mb-3">
            <div className="admin-card-header"><h5>Items ({itemCount})</h5></div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>
                  {data.items.map(it => (
                    <tr key={it.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {it.product_img
                            ? <img src={`${IMG}products/${it.product_img}`} alt="" style={{ width: 42, height: 42, objectFit: 'cover', borderRadius: 8 }} />
                            : <div style={{ width: 42, height: 42, background: 'var(--a-line)', borderRadius: 8 }} />}
                          <span className="fw-bold">{it.product_name}</span>
                        </div>
                      </td>
                      <td>{money(it.price)}</td>
                      <td>{it.qty}</td>
                      <td className="fw-bold">{money(it.line_total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-card-body" style={{ borderTop: '1px solid var(--a-line)' }}>
              <div className="ms-auto" style={{ maxWidth: 300 }}>
                <Row label="Subtotal">{money(o.subtotal)}</Row>
                {Number(o.discount) > 0 && <Row label={`Discount${o.coupon_code ? ` (${o.coupon_code})` : ''}`}>− {money(o.discount)}</Row>}
                <Row label="Delivery">{Number(o.shipping) > 0 ? money(o.shipping) : 'Free'}</Row>
                <div className="d-flex justify-content-between pt-2 mt-1" style={{ borderTop: '1px solid var(--a-line)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--a-ink)' }}>
                  <span>Total</span><span>{money(o.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Courier + status */}
          <form className="admin-card mb-3 no-print" onSubmit={e => { e.preventDefault(); save() }}>
            <div className="admin-card-header"><h5><i className="bi bi-truck me-2" style={{ color: 'var(--primary)' }} />Delivery &amp; Status</h5></div>
            <div className="admin-card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label-admin" htmlFor="od-courier">Courier</label>
                  <select id="od-courier" className="form-control-admin" value={form.courier_id}
                    onChange={e => setForm(f => ({ ...f, courier_id: e.target.value, tracking_code: e.target.value === (o.courier_id || '') ? (o.tracking_code || '') : '' }))}>
                    <option value="">— Not assigned —</option>
                    {couriers.map(c => <option key={c.cid} value={c.cid}>{c.name}{Number(c.status) !== 1 ? ' (paused)' : ''}</option>)}
                  </select>
                  {data.couriers.length === 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', marginTop: 4 }}>No couriers yet. <Link to="/admin/couriers">Add a courier</Link>.</div>
                  )}
                  {picked?.contact_number && <div style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', marginTop: 4 }}><i className="bi bi-telephone me-1" />{picked.contact_number}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label-admin" htmlFor="od-track">Tracking Code</label>
                  <div className="d-flex gap-2">
                    <input id="od-track" className="form-control-admin" maxLength={100} disabled={!form.courier_id} value={form.tracking_code}
                      onChange={e => setForm(f => ({ ...f, tracking_code: e.target.value }))} placeholder={form.courier_id ? 'Type the code or use the pool' : 'Choose a courier first'} />
                    <button type="button" className="btn-admin-outline" disabled={!form.courier_id || saving || !picked?.unused_codes}
                      title="Take the next unused code uploaded for this courier" onClick={() => save({ auto_code: 1 })}>
                      Use next code
                    </button>
                  </div>
                  {form.courier_id && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', marginTop: 4 }}>
                      {picked?.unused_codes ?? 0} unused code{picked?.unused_codes === 1 ? '' : 's'} in the pool for this courier. <Link to="/admin/couriers/codes">Manage codes</Link>
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label-admin" htmlFor="od-status">Order Status</label>
                  <select id="od-status" className="form-control-admin" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{orderStatus(s).label}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label-admin" htmlFor="od-delivery">Delivery Status <span style={{ color: 'var(--a-ink-3)', fontWeight: 400 }}>(shown to the customer)</span></label>
                  <input id="od-delivery" className="form-control-admin" maxLength={255} value={form.delivery_status}
                    onChange={e => setForm(f => ({ ...f, delivery_status: e.target.value }))} placeholder="e.g. Out for delivery" list="od-delivery-ideas" />
                  <datalist id="od-delivery-ideas">
                    <option value="Picked up by courier" /><option value="In transit" /><option value="Out for delivery" />
                    <option value="Delivery attempted, customer unavailable" /><option value="Delivered" />
                  </datalist>
                </div>
                <div className="col-12">
                  <label className="form-label-admin" htmlFor="od-note">Internal Note <span style={{ color: 'var(--a-ink-3)', fontWeight: 400 }}>(only admins see this)</span></label>
                  <textarea id="od-note" className="form-control-admin" rows={2} maxLength={2000} value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))} style={{ minHeight: 64 }} />
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button className="btn-admin-primary" type="submit" disabled={saving || !dirty}>
                    {saving ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-check-lg" />Save Update</>}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Timeline */}
          <div className="admin-card no-print">
            <div className="admin-card-header"><h5>Order Timeline</h5></div>
            <div className="admin-card-body">
              <ol className="a-timeline">
                {timeline.map(t => (
                  <li key={t.key}>
                    <div className="a-timeline-title">{t.title}</div>
                    {t.lines.map(line => <div key={line} className="a-timeline-line">{line}</div>)}
                    {t.note && <div className="a-timeline-note"><i className="bi bi-lock me-1" />{t.note}</div>}
                    <div className="a-timeline-meta">{fmtDateTime(t.at)}{t.by ? ` · by ${t.by}` : ''}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="col-lg-4">
          <div className="admin-card mb-3">
            <div className="admin-card-header"><h5>Customer</h5></div>
            <div className="admin-card-body">
              <Row label="Name">{o.customer_name}</Row>
              <Row label="Phone"><a href={`tel:${o.customer_ph}`}>{o.customer_ph}</a></Row>
              {o.customer_email && <Row label="Email"><a href={`mailto:${o.customer_email}`}>{o.customer_email}</a></Row>}
            </div>
          </div>

          <div className="admin-card mb-3">
            <div className="admin-card-header"><h5><i className="bi bi-geo-alt me-2" style={{ color: 'var(--primary)' }} />Delivery Address</h5></div>
            <div className="admin-card-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--a-ink)' }}>
              <strong>{o.recipient_name || o.customer_name}</strong><br />
              {o.address}<br />
              {[o.city, o.state, o.pincode].filter(Boolean).join(', ')}
              {o.delivery_date && <div className="mt-2" style={{ fontSize: '0.84rem', color: 'var(--a-ink-2)' }}><i className="bi bi-calendar-event me-1" />Preferred date: <b>{new Date(o.delivery_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>}
              {o.gift_message && <div className="mt-2 p-2" style={{ background: 'var(--a-bg)', borderRadius: 10, fontSize: '0.84rem' }}><i className="bi bi-chat-heart me-1" /><b>Gift message:</b> {o.gift_message}</div>}
              {o.notes && <div className="mt-2" style={{ fontSize: '0.84rem', color: 'var(--a-ink-2)' }}><b>Customer note:</b> {o.notes}</div>}
            </div>
          </div>

          <div className="admin-card mb-3">
            <div className="admin-card-header"><h5><i className="bi bi-truck me-2" style={{ color: 'var(--primary)' }} />Courier</h5></div>
            <div className="admin-card-body">
              {o.courier_name ? (
                <>
                  <Row label="Courier">{o.courier_name}</Row>
                  <Row label="Tracking code">{o.tracking_code || '—'}</Row>
                  {o.delivery_status && <Row label="Delivery status">{o.delivery_status}</Row>}
                  {o.shipped_at && <Row label="Shipped">{fmtDateTime(o.shipped_at)}</Row>}
                  {o.delivered_at && <Row label="Delivered">{fmtDateTime(o.delivered_at)}</Row>}
                </>
              ) : <div style={{ color: 'var(--a-ink-3)', fontSize: '0.88rem' }}>No courier assigned yet.</div>}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h5>Payment</h5></div>
            <div className="admin-card-body">
              <Row label="Method">Cash on Delivery</Row>
              <Row label="Status"><span className={`badge-status ${o.payment_status === 'paid' ? 'bs-confirmed' : 'bs-pending'}`}>{o.payment_status}</span></Row>
              <Row label="Amount">{money(o.total)}</Row>
              {o.payment_status !== 'paid' && o.status !== 'cancelled' && (
                <div style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', marginTop: 6 }}>Collect {money(o.total)} from the customer on delivery.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
