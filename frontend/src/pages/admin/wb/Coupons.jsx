import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import { money, fmtDate } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL

const BLANK = { code: '', description: '', discount_type: 'percent', discount_value: '', min_order: '', max_discount: '', valid_to: '', status: '1' }
const num = (v) => (Number(v) ? String(Number(v)) : '')

export default function AdminCouponsWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [coupons, setCoupons] = useState([])
  const [form, setForm]       = useState(BLANK)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving]   = useState(false)
  const [msg, setMsg]         = useState(null)
  const formTopRef = useRef()

  function load() {
    axios.post(`${WS}/fetchcoupons`)
      .then(r => { if (r.data.status === 1) setCoupons(r.data.coupons || []) })
      .catch(() => {})
  }
  useEffect(() => { load() }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 4000)
  }
  const field = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const reset = () => { setEditing(null); setForm(BLANK) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = new URLSearchParams({ ...form, ...(editing ? { cid: editing.cid } : {}) })
      const r = await axios.post(`${WS}/savecoupon`, body)
      if (r.data.status === 1) { flash(r.data.message); reset(); load() }
      else flash(r.data.message || 'Failed', false)
    } catch {
      flash('Could not save the offer', false)
    } finally { setSaving(false) }
  }

  function startEdit(c) {
    setEditing(c)
    setForm({
      code: c.code, description: c.description || '', discount_type: c.discount_type,
      discount_value: num(c.discount_value), min_order: num(c.min_order), max_discount: num(c.max_discount),
      valid_to: c.valid_to || '', status: String(c.status),
    })
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleDelete(c) {
    if (!window.confirm(`Delete the offer "${c.code}"?`)) return
    const r = await axios.post(`${WS}/deletecoupon`, new URLSearchParams({ cid: c.cid }))
    if (r.data.status === 1) { flash('Offer deleted'); if (editing?.cid === c.cid) reset(); load() }
    else flash('Delete failed', false)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Offers & Coupons" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header" ref={formTopRef}>
            <h2>Offers &amp; Coupons</h2>
            <p>Coupon codes customers can apply in the cart. Active offers are shown on the home page.</p>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          <div className="admin-card mb-4">
            <div className="admin-card-header">
              <i className={`bi ${editing ? 'bi-pencil' : 'bi-plus-circle'} me-2`} />
              {editing ? `Edit Offer — ${editing.code}` : 'Add Offer'}
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label-admin" htmlFor="cp-code">Coupon Code <span style={{ color: '#EF4444' }}>*</span></label>
                    <input id="cp-code" className="form-control-admin" name="code" value={form.code} onChange={field} maxLength={40} placeholder="e.g. WELCOME10" style={{ textTransform: 'uppercase' }} />
                  </div>
                  <div className="col-md-9">
                    <label className="form-label-admin" htmlFor="cp-desc">Description (shown to customers)</label>
                    <input id="cp-desc" className="form-control-admin" name="description" value={form.description} onChange={field} maxLength={255} placeholder="e.g. 10% off your first order" />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-type">Discount Type</label>
                    <select id="cp-type" className="form-control-admin" name="discount_type" value={form.discount_type} onChange={field}>
                      <option value="percent">Percent (%)</option>
                      <option value="flat">Flat (₹)</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-val">Value <span style={{ color: '#EF4444' }}>*</span></label>
                    <input id="cp-val" type="number" min="0" step="0.01" className="form-control-admin" name="discount_value" value={form.discount_value} onChange={field} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-min">Min Order (₹)</label>
                    <input id="cp-min" type="number" min="0" className="form-control-admin" name="min_order" value={form.min_order} onChange={field} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-max">Max Discount (₹)</label>
                    <input id="cp-max" type="number" min="0" className="form-control-admin" name="max_discount" value={form.max_discount} onChange={field} placeholder="No limit" />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-to">Valid Until</label>
                    <input id="cp-to" type="date" className="form-control-admin" name="valid_to" value={form.valid_to} onChange={field} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cp-status">Status</label>
                    <select id="cp-status" className="form-control-admin" name="status" value={form.status} onChange={field}>
                      <option value="1">Active</option>
                      <option value="0">Paused</option>
                    </select>
                  </div>
                  <div className="col-12 d-flex justify-content-end gap-2">
                    {editing && <button type="button" className="btn-admin-outline" onClick={reset}>Cancel</button>}
                    <button className="btn-admin-primary" type="submit" disabled={saving}>
                      {saving
                        ? <span className="spinner-border spinner-border-sm" />
                        : editing ? <><i className="bi bi-check-lg me-1" />Update Offer</> : <><i className="bi bi-plus-lg me-1" />Add Offer</>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-percent" /><span>All Offers</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 400 }}>({coupons.length})</span>
              </div>
            </div>
            <div className="admin-card-body p-0">
              {coupons.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>No offers yet. Add one above.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Code</th><th>Discount</th><th>Min Order</th><th>Valid Until</th><th>Status</th><th style={{ width: 110 }}>Actions</th></tr>
                    </thead>
                    <tbody>
                      {coupons.map(c => {
                        const expired = c.valid_to && c.valid_to < today
                        return (
                          <tr key={c.cid}>
                            <td>
                              <div style={{ fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.04em' }}>{c.code}</div>
                              {c.description && <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>{c.description}</div>}
                            </td>
                            <td style={{ fontWeight: 700 }}>
                              {c.discount_type === 'flat' ? `${money(c.discount_value)} off` : `${Number(c.discount_value)}% off`}
                              {Number(c.max_discount) > 0 && <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 400 }}>up to {money(c.max_discount)}</div>}
                            </td>
                            <td>{Number(c.min_order) > 0 ? money(c.min_order) : '—'}</td>
                            <td>{c.valid_to ? fmtDate(c.valid_to) : 'No expiry'}</td>
                            <td>
                              <span className={`badge-status ${expired ? 'bs-cancelled' : Number(c.status) === 1 ? 'bs-confirmed' : 'bs-pending'}`}>
                                {expired ? 'Expired' : Number(c.status) === 1 ? 'Active' : 'Paused'}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn-admin-outline btn-admin-sm" title="Edit" aria-label={`Edit ${c.code}`} onClick={() => startEdit(c)}><i className="bi bi-pencil" /></button>
                                <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label={`Delete ${c.code}`} onClick={() => handleDelete(c)}><i className="bi bi-trash" /></button>
                              </div>
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
    </div>
  )
}
