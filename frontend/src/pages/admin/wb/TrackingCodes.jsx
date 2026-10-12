import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import { fmtDate } from '../../../utils/format'

const WS = import.meta.env.VITE_API_URL

/** Tracking code pool: upload batches of codes per courier, then see which are used. */
export default function AdminTrackingCodesWb() {
  const [params, setParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [couriers, setCouriers] = useState([])
  const [uploads, setUploads]   = useState(null)
  const [data, setData]         = useState(null)     // { codes, total, page, per_page, stats }
  const [filters, setFilters]   = useState({ tracking_code: '', order_no: '', state: '' })
  const [applied, setApplied]   = useState({ tracking_code: '', order_no: '', state: '' })
  const [page, setPage]         = useState(1)
  const [form, setForm]         = useState({ courier_id: '', title: '', codes: '' })
  const [saving, setSaving]     = useState(false)
  const [msg, setMsg]           = useState(null)
  const fileRef = useRef()
  const uploadId = params.get('batch') || ''

  function loadUploads() {
    axios.post(`${WS}/fetchtrackinguploads`).then(r => setUploads(r.data.uploads || [])).catch(() => setUploads([]))
  }
  function loadCodes() {
    axios.post(`${WS}/fetchtrackingcodes`, new URLSearchParams({ ...applied, upload_id: uploadId, page }))
      .then(r => { if (r.data.status === 1) setData(r.data) })
      .catch(() => {})
  }
  useEffect(() => {
    loadUploads()
    axios.post(`${WS}/fetchcouriers`).then(r => setCouriers(r.data.couriers || [])).catch(() => {})
  }, [])
  useEffect(() => { loadCodes() }, [applied, page, uploadId])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 5000)
  }

  async function handleUpload(e) {
    e.preventDefault()
    const file = fileRef.current?.files[0]
    if (!file && !form.codes.trim()) return flash('Choose a file or type the codes in', false)
    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (file) fd.append('sheet', file)
    try {
      const r = await axios.post(`${WS}/uploadtrackingcodes`, fd)
      if (r.data.status === 1) {
        flash(r.data.message)
        setForm({ courier_id: '', title: '', codes: '' })
        if (fileRef.current) fileRef.current.value = ''
        loadUploads(); setPage(1); loadCodes()
      } else flash(r.data.message || 'Upload failed', false)
    } catch {
      flash('Could not upload the codes', false)
    } finally { setSaving(false) }
  }

  async function deleteBatch(u) {
    if (!window.confirm(`Delete "${u.title}"? Its ${u.total_codes} tracking code(s) are removed too.`)) return
    const r = await axios.post(`${WS}/deletetrackingupload`, new URLSearchParams({ uid: u.uid }))
    if (r.data.status === 1) { flash('Batch deleted'); if (uploadId === u.uid) setParams({}); loadUploads(); loadCodes() }
    else flash(r.data.message || 'Delete failed', false)
  }

  async function downloadBatch(u) {
    try {
      const r = await axios.post(`${WS}/downloadtrackingupload`, new URLSearchParams({ uid: u.uid }), { responseType: 'blob' })
      const url = URL.createObjectURL(r.data)
      const a = document.createElement('a')
      a.href = url; a.download = u.file_name || 'tracking-codes'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      flash('The original file is not available for this batch', false)
    }
  }

  function search(e) {
    e.preventDefault()
    setPage(1)
    setApplied(filters)
  }
  function clear() {
    const blank = { tracking_code: '', order_no: '', state: '' }
    setFilters(blank); setApplied(blank); setPage(1); setParams({})
  }

  const pages = data ? Math.max(1, Math.ceil(data.total / data.per_page)) : 1
  const batch = uploads?.find(u => u.uid === uploadId)

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Tracking Codes" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <h2>Tracking Codes</h2>
            <p>Keep a pool of tracking codes from each courier. On an order, "Use next code" takes one from here.</p>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          {data && (
            <div className="row g-3 mb-4">
              {[['Total Codes', data.stats.total, 'bi-upc-scan', 'purple'], ['Used', data.stats.used, 'bi-check2-circle', 'green'], ['Not Used', data.stats.not_used, 'bi-hourglass', 'orange']].map(([label, value, icon, color]) => (
                <div key={label} className="col-4">
                  <div className="stat-card"><div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div></div>
                </div>
              ))}
            </div>
          )}

          {/* ── UPLOAD ── */}
          <div className="admin-card mb-4">
            <div className="admin-card-header"><i className="bi bi-upload me-2" />Add Tracking Codes</div>
            <div className="admin-card-body">
              {couriers.length === 0 ? (
                <div>Add a courier first on the <Link to="/admin/couriers">Couriers</Link> page.</div>
              ) : (
                <form onSubmit={handleUpload}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label-admin" htmlFor="tc-courier">Courier <span style={{ color: '#EF4444' }}>*</span></label>
                      <select id="tc-courier" className="form-control-admin" required value={form.courier_id} onChange={e => setForm(f => ({ ...f, courier_id: e.target.value }))}>
                        <option value="">Select courier…</option>
                        {couriers.map(c => <option key={c.cid} value={c.cid}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label-admin" htmlFor="tc-title">Batch Title <span style={{ color: '#EF4444' }}>*</span></label>
                      <input id="tc-title" className="form-control-admin" required maxLength={255} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. October AWB sheet" />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label-admin" htmlFor="tc-file">Sheet of codes</label>
                      <input id="tc-file" type="file" accept=".xlsx,.csv,.txt" className="form-control-admin" ref={fileRef} />
                      <div style={{ fontSize: '0.75rem', color: 'var(--a-ink-3)', marginTop: 4 }}>.xlsx, .csv or .txt with the codes in the first column.</div>
                    </div>
                    <div className="col-12">
                      <label className="form-label-admin" htmlFor="tc-codes">…or type / paste codes, one per line</label>
                      <textarea id="tc-codes" className="form-control-admin" rows={3} value={form.codes} onChange={e => setForm(f => ({ ...f, codes: e.target.value }))} />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button className="btn-admin-primary" type="submit" disabled={saving}>
                        {saving ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-upload me-1" />Add Codes</>}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ── BATCHES ── */}
          <div className="admin-card mb-4">
            <div className="admin-card-header"><div className="d-flex align-items-center gap-2"><i className="bi bi-collection" /><span>Batches</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', fontWeight: 400 }}>({uploads?.length ?? 0})</span></div></div>
            <div className="admin-card-body p-0">
              {uploads === null ? <div className="text-center py-4"><span className="spinner-border" /></div> : uploads.length === 0 ? (
                <div className="text-center py-5"><i className="bi bi-collection" />No batches yet.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead><tr><th>Batch</th><th>Courier</th><th>Codes</th><th>Used</th><th>Added</th><th style={{ width: 150 }}>Actions</th></tr></thead>
                    <tbody>
                      {uploads.map(u => (
                        <tr key={u.uid} style={uploadId === u.uid ? { background: 'rgba(var(--primary-rgb),0.05)' } : {}}>
                          <td><div className="fw-bold">{u.title}</div>{u.file_name && <div style={{ fontSize: '0.74rem', color: 'var(--a-ink-3)' }}>{u.file_name}</div>}</td>
                          <td>{u.courier_name}</td>
                          <td>{u.total_codes}</td>
                          <td>{u.used_codes}</td>
                          <td>{fmtDate(u.created_at)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-admin-outline btn-admin-sm" title="View codes" aria-label={`View codes in ${u.title}`} onClick={() => { setPage(1); setParams({ batch: u.uid }) }}><i className="bi bi-list-ul" /></button>
                              {u.file_name && <button className="btn-admin-outline btn-admin-sm" title="Download file" aria-label={`Download ${u.file_name}`} onClick={() => downloadBatch(u)}><i className="bi bi-download" /></button>}
                              <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label={`Delete ${u.title}`} onClick={() => deleteBatch(u)}><i className="bi bi-trash" /></button>
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

          {/* ── CODES ── */}
          <div className="admin-card">
            <div className="admin-card-header flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2"><i className="bi bi-upc-scan" /><span>{batch ? `Codes in "${batch.title}"` : 'All Codes'}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--a-ink-3)', fontWeight: 400 }}>({data?.total ?? 0})</span></div>
              <form className="d-flex gap-2 flex-wrap" onSubmit={search}>
                <input type="search" placeholder="Tracking code…" aria-label="Search tracking code" value={filters.tracking_code} onChange={e => setFilters(f => ({ ...f, tracking_code: e.target.value }))} style={{ padding: '0.4rem 0.8rem', width: 160 }} />
                <input type="search" placeholder="Order no…" aria-label="Search order number" value={filters.order_no} onChange={e => setFilters(f => ({ ...f, order_no: e.target.value }))} style={{ padding: '0.4rem 0.8rem', width: 140 }} />
                <select aria-label="Filter by use" value={filters.state} onChange={e => setFilters(f => ({ ...f, state: e.target.value }))} style={{ padding: '0.4rem 0.7rem' }}>
                  <option value="">All</option><option value="unused">Not used</option><option value="used">Used</option>
                </select>
                <button type="submit" className="btn-admin-outline btn-admin-sm" aria-label="Search"><i className="bi bi-search" /></button>
                {(applied.tracking_code || applied.order_no || applied.state || uploadId) && <button type="button" className="btn-admin-outline btn-admin-sm" onClick={clear}>Clear</button>}
              </form>
            </div>
            <div className="admin-card-body p-0">
              {!data ? <div className="text-center py-5"><span className="spinner-border" /></div> : data.codes.length === 0 ? (
                <div className="text-center py-5"><i className="bi bi-upc-scan" />No tracking codes found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead><tr><th>Tracking Code</th><th>Courier</th><th>Batch</th><th>Status</th><th>Order</th><th>Customer</th><th>Order Date</th></tr></thead>
                    <tbody>
                      {data.codes.map(c => (
                        <tr key={c.id}>
                          <td className="fw-bold">{c.tracking_code}</td>
                          <td>{c.courier_name}</td>
                          <td>{c.title}</td>
                          <td><span className={`badge-status ${c.oid ? 'bs-confirmed' : 'bs-new'}`}>{c.oid ? 'Used' : 'Not used'}</span></td>
                          <td>{c.oid ? <Link to={`/admin/orders/${c.oid}`}>{c.order_no}</Link> : '—'}</td>
                          <td>{c.customer || '—'}</td>
                          <td>{c.order_date ? fmtDate(c.order_date) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {pages > 1 && (
                <div className="d-flex justify-content-between align-items-center p-3" style={{ borderTop: '1px solid var(--a-line)' }}>
                  <button className="btn-admin-outline btn-admin-sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}><i className="bi bi-chevron-left" /> Previous</button>
                  <span style={{ fontSize: '0.84rem' }}>Page {page} of {pages}</span>
                  <button className="btn-admin-outline btn-admin-sm" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next <i className="bi bi-chevron-right" /></button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
