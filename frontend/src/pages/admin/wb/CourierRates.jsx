import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import { money } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL
const BLANK = { courier_id: '', avg_weight_grams: '', home_rate: '', other_rate: '' }

export default function AdminCourierRatesWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [costs, setCosts]       = useState(null)
  const [homeState, setHomeState] = useState('')
  const [couriers, setCouriers] = useState([])
  const [form, setForm]         = useState(BLANK)
  const [editing, setEditing]   = useState(null)
  const [saving, setSaving]     = useState(false)
  const [msg, setMsg]           = useState(null)
  const formTopRef = useRef()

  function load() {
    axios.post(`${WS}/fetchcouriercosts`)
      .then(r => { setCosts(r.data.costs || []); setHomeState(r.data.home_state || '') })
      .catch(() => setCosts([]))
  }
  useEffect(() => {
    load()
    axios.post(`${WS}/fetchcouriers`).then(r => setCouriers(r.data.couriers || [])).catch(() => {})
  }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 4500)
  }
  const field = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const reset = () => { setEditing(null); setForm(BLANK) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const r = await axios.post(`${WS}/savecouriercost`, new URLSearchParams({ ...form, ...(editing ? { ccid: editing.ccid } : {}) }))
      if (r.data.status === 1) { flash(r.data.message); reset(); load() }
      else flash(r.data.message || 'Failed', false)
    } catch {
      flash('Could not save the rate', false)
    } finally { setSaving(false) }
  }

  function startEdit(c) {
    setEditing(c)
    setForm({ courier_id: c.courier_id, avg_weight_grams: String(c.avg_weight_grams), home_rate: String(Number(c.home_rate)), other_rate: String(Number(c.other_rate)) })
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  async function handleDelete(c) {
    if (!window.confirm(`Delete the ${c.avg_weight_grams} g rate for ${c.courier_name}?`)) return
    const r = await axios.post(`${WS}/deletecouriercost`, new URLSearchParams({ ccid: c.ccid }))
    if (r.data.status === 1) { flash('Rate deleted'); if (editing?.ccid === c.ccid) reset(); load() }
    else flash('Delete failed', false)
  }

  const home = homeState || 'your state'

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Delivery Rates" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header" ref={formTopRef}>
            <h2>Delivery Rates</h2>
            <p>Courier rate cards used to work out the delivery charge at checkout.</p>
          </div>

          <div className="alert alert-info py-2 mb-3">
            <div>
              With no rates here, checkout uses the flat delivery charge from <Link to="/admin/business-info">Store Info &amp; Delivery</Link>.
              Once you add rates, the charge is the rate for the nearest weight × the parcel weight in kg (1 kg minimum).
              Products without a weight count as 250 g. The free-delivery limit in Store Info still applies.
              {!homeState && <> Set your state in <Link to="/cms/companyinfo">Company &amp; Contact</Link> so in-state orders get the in-state rate.</>}
            </div>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          <div className="admin-card mb-4">
            <div className="admin-card-header">
              <i className={`bi ${editing ? 'bi-pencil' : 'bi-plus-circle'} me-2`} />
              {editing ? 'Edit Rate' : 'Add Rate'}
            </div>
            <div className="admin-card-body">
              {couriers.length === 0 ? (
                <div>Add a courier first on the <Link to="/admin/couriers">Couriers</Link> page.</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                      <label className="form-label-admin" htmlFor="rt-courier">Courier <span style={{ color: '#EF4444' }}>*</span></label>
                      <select id="rt-courier" className="form-control-admin" name="courier_id" value={form.courier_id} onChange={field} required>
                        <option value="">Select courier…</option>
                        {couriers.map(c => <option key={c.cid} value={c.cid}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-6 col-md-2">
                      <label className="form-label-admin" htmlFor="rt-weight">Weight (grams) <span style={{ color: '#EF4444' }}>*</span></label>
                      <input id="rt-weight" type="number" min="1" step="1" className="form-control-admin" name="avg_weight_grams" value={form.avg_weight_grams} onChange={field} placeholder="1000" required />
                    </div>
                    <div className="col-6 col-md-2">
                      <label className="form-label-admin" htmlFor="rt-home">Within {home} (₹/kg)</label>
                      <input id="rt-home" type="number" min="0" step="0.01" className="form-control-admin" name="home_rate" value={form.home_rate} onChange={field} required />
                    </div>
                    <div className="col-6 col-md-2">
                      <label className="form-label-admin" htmlFor="rt-other">Other states (₹/kg)</label>
                      <input id="rt-other" type="number" min="0" step="0.01" className="form-control-admin" name="other_rate" value={form.other_rate} onChange={field} required />
                    </div>
                    <div className="col-6 col-md-3 d-flex gap-2">
                      <button className="btn-admin-primary w-100" type="submit" disabled={saving}>
                        {saving ? <span className="spinner-border spinner-border-sm" /> : editing ? <><i className="bi bi-check-lg me-1" />Update Rate</> : <><i className="bi bi-plus-lg me-1" />Add Rate</>}
                      </button>
                      {editing && <button type="button" className="btn-admin-outline" onClick={reset} aria-label="Cancel edit"><i className="bi bi-x-lg" /></button>}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2"><i className="bi bi-cash-stack" /><span>Rate Cards</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', fontWeight: 400 }}>({costs?.length ?? 0})</span></div>
            </div>
            <div className="admin-card-body p-0">
              {costs === null ? (
                <div className="text-center py-5"><span className="spinner-border" /></div>
              ) : costs.length === 0 ? (
                <div className="text-center py-5"><i className="bi bi-cash-stack" />No rates yet. The flat delivery charge from Store Info is in use.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead><tr><th>Courier</th><th>Weight</th><th>Within {home}</th><th>Other States</th><th style={{ width: 110 }}>Actions</th></tr></thead>
                    <tbody>
                      {costs.map(c => (
                        <tr key={c.ccid}>
                          <td className="fw-bold">{c.courier_name}{Number(c.courier_status) !== 1 && <span className="badge-status bs-pending ms-2">Paused</span>}</td>
                          <td>{Number(c.avg_weight_grams).toLocaleString('en-IN')} g</td>
                          <td>{money(c.home_rate)} / kg</td>
                          <td>{money(c.other_rate)} / kg</td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-admin-outline btn-admin-sm" title="Edit" aria-label="Edit rate" onClick={() => startEdit(c)}><i className="bi bi-pencil" /></button>
                              <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label="Delete rate" onClick={() => handleDelete(c)}><i className="bi bi-trash" /></button>
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
