import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

const BLANK = { name: '', contact_person: '', contact_number: '', tracking_url: '', status: '1' }

export default function AdminCouriersWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [couriers, setCouriers] = useState(null)
  const [form, setForm]         = useState(BLANK)
  const [editing, setEditing]   = useState(null)
  const [saving, setSaving]     = useState(false)
  const [msg, setMsg]           = useState(null)
  const fileRef = useRef()
  const formTopRef = useRef()

  function load() {
    axios.post(`${WS}/fetchcouriers`)
      .then(r => setCouriers(r.data.status === 1 ? r.data.couriers || [] : []))
      .catch(() => setCouriers([]))
  }
  useEffect(() => { load() }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 4500)
  }
  const field = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  function reset() {
    setEditing(null)
    setForm(BLANK)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return flash('Courier name is required', false)
    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (editing) fd.append('cid', editing.cid)
    if (fileRef.current?.files[0]) fd.append('logo_img', fileRef.current.files[0])
    try {
      const r = await axios.post(`${WS}/savecourier`, fd)
      if (r.data.status === 1) { flash(r.data.message); reset(); load() }
      else flash(r.data.message || 'Failed', false)
    } catch {
      flash('Could not save the courier', false)
    } finally { setSaving(false) }
  }

  function startEdit(c) {
    setEditing(c)
    setForm({ name: c.name, contact_person: c.contact_person || '', contact_number: c.contact_number || '', tracking_url: c.tracking_url || '', status: String(c.status) })
    if (fileRef.current) fileRef.current.value = ''
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleDelete(c) {
    if (!window.confirm(`Delete the courier "${c.name}"? Its rate cards and unused tracking codes are removed too.`)) return
    const r = await axios.post(`${WS}/deletecourier`, new URLSearchParams({ cid: c.cid }))
    if (r.data.status === 1) { flash('Courier deleted'); if (editing?.cid === c.cid) reset(); load() }
    else flash(r.data.message || 'Delete failed', false)
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Couriers" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header" ref={formTopRef}>
            <h2>Couriers</h2>
            <p>The delivery partners you hand orders to. Assign one to an order from the order page.</p>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          <div className="admin-card mb-4">
            <div className="admin-card-header">
              <i className={`bi ${editing ? 'bi-pencil' : 'bi-plus-circle'} me-2`} />
              {editing ? `Edit Courier — ${editing.name}` : 'Add Courier'}
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label-admin" htmlFor="cr-name">Courier Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input id="cr-name" className="form-control-admin" name="name" value={form.name} onChange={field} maxLength={150} placeholder="e.g. BlueDart, DTDC, Own delivery" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label-admin" htmlFor="cr-person">Contact Person</label>
                    <input id="cr-person" className="form-control-admin" name="contact_person" value={form.contact_person} onChange={field} maxLength={150} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label-admin" htmlFor="cr-phone">Contact Number</label>
                    <input id="cr-phone" type="tel" className="form-control-admin" name="contact_number" value={form.contact_number} onChange={field} maxLength={50} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-admin" htmlFor="cr-url">Tracking Page Link <span style={{ color: 'var(--a-ink-3)', fontWeight: 400 }}>(optional)</span></label>
                    <input id="cr-url" type="url" className="form-control-admin" name="tracking_url" value={form.tracking_url} onChange={field} maxLength={500} placeholder="https://courier.example/track/{code}" />
                    <div style={{ fontSize: '0.75rem', color: 'var(--a-ink-3)', marginTop: 4 }}>Customers get this link with <code>{'{code}'}</code> replaced by their tracking code.</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label-admin" htmlFor="cr-logo">Logo {editing && <span style={{ color: 'var(--a-ink-3)', fontWeight: 400 }}>(optional replace)</span>}</label>
                    <input id="cr-logo" type="file" accept=".jpg,.jpeg,.png,.webp" className="form-control-admin" ref={fileRef} />
                  </div>
                  <div className="col-6 col-md-1">
                    <label className="form-label-admin" htmlFor="cr-status">Status</label>
                    <select id="cr-status" className="form-control-admin" name="status" value={form.status} onChange={field}>
                      <option value="1">Active</option>
                      <option value="0">Paused</option>
                    </select>
                  </div>
                  <div className="col-6 col-md-2 d-flex gap-2">
                    <button className="btn-admin-primary w-100" type="submit" disabled={saving}>
                      {saving ? <span className="spinner-border spinner-border-sm" /> : editing ? <><i className="bi bi-check-lg me-1" />Update</> : <><i className="bi bi-plus-lg me-1" />Add</>}
                    </button>
                    {editing && <button type="button" className="btn-admin-outline" onClick={reset} title="Cancel edit" aria-label="Cancel edit"><i className="bi bi-x-lg" /></button>}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-truck" /><span>All Couriers</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', fontWeight: 400 }}>({couriers?.length ?? 0})</span>
              </div>
            </div>
            <div className="admin-card-body p-0">
              {couriers === null ? (
                <div className="text-center py-5"><span className="spinner-border" /></div>
              ) : couriers.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-truck" />
                  No couriers yet. Add your first delivery partner above.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr><th style={{ width: 64 }}>Logo</th><th>Courier</th><th>Contact</th><th>Orders</th><th>Tracking Codes</th><th>Status</th><th style={{ width: 110 }}>Actions</th></tr>
                    </thead>
                    <tbody>
                      {couriers.map(c => (
                        <tr key={c.cid} style={editing?.cid === c.cid ? { background: 'rgba(var(--primary-rgb),0.05)' } : {}}>
                          <td>
                            {c.logo_img
                              ? <img src={`${IMG}couriers/${c.logo_img}`} alt="" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#fff' }} />
                              : <div style={{ width: 48, height: 48, background: 'var(--a-line)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-truck" style={{ color: 'var(--a-ink-3)' }} /></div>}
                          </td>
                          <td>
                            <div className="fw-bold">{c.name}</div>
                            {c.tracking_url && <div style={{ fontSize: '0.74rem', color: 'var(--a-ink-3)', overflowWrap: 'anywhere' }}>{c.tracking_url}</div>}
                          </td>
                          <td>
                            {c.contact_person || '—'}
                            {c.contact_number && <div style={{ fontSize: '0.78rem' }}><a href={`tel:${c.contact_number}`}>{c.contact_number}</a></div>}
                          </td>
                          <td>
                            {c.order_count}
                            {c.active_count > 0 && <div style={{ fontSize: '0.74rem', color: 'var(--a-warn)', fontWeight: 700 }}>{c.active_count} in progress</div>}
                          </td>
                          <td>
                            <Link to="/admin/couriers/codes">{c.unused_codes} unused</Link>
                            <div style={{ fontSize: '0.74rem', color: 'var(--a-ink-3)' }}>of {c.code_count}</div>
                          </td>
                          <td><span className={`badge-status ${Number(c.status) === 1 ? 'bs-confirmed' : 'bs-pending'}`}>{Number(c.status) === 1 ? 'Active' : 'Paused'}</span></td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-admin-outline btn-admin-sm" title="Edit" aria-label={`Edit ${c.name}`} onClick={() => startEdit(c)}><i className="bi bi-pencil" /></button>
                              <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label={`Delete ${c.name}`} onClick={() => handleDelete(c)}><i className="bi bi-trash" /></button>
                            </div>
                          </td>
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
    </div>
  )
}
