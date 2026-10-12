import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

const BLANK = { cat_name: '', cat_desc: '', sort_order: '0', status: '1' }

export default function AdminCategoriesWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [categories, setCategories]   = useState([])
  const [form, setForm]               = useState(BLANK)
  const [editing, setEditing]         = useState(null)
  const [saving, setSaving]           = useState(false)
  const [deletingId, setDeletingId]   = useState(null)
  const [msg, setMsg]                 = useState(null)
  const fileRef = useRef()
  const formTopRef = useRef()

  function load() {
    axios.post(`${WS}/fetchcategories`)
      .then(r => { if (r.data.status === 1) setCategories(r.data.categories || []) })
      .catch(() => {})
  }

  useEffect(() => { load() }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 4000)
  }

  const field = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  function reset() {
    setEditing(null)
    setForm(BLANK)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.cat_name.trim()) return flash('Category name is required', false)
    setSaving(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (editing) fd.append('cat_id', editing.cat_id)
    if (fileRef.current?.files[0]) fd.append('cat_img', fileRef.current.files[0])
    try {
      const r = await axios.post(`${WS}${editing ? '/updatecategory' : '/addcategory'}`, fd)
      if (r.data.status === 1) {
        flash(editing ? 'Category updated' : 'Category added')
        reset()
        load()
      } else flash(r.data.message || 'Failed', false)
    } catch {
      flash('Could not save the category', false)
    } finally { setSaving(false) }
  }

  function startEdit(cat) {
    setEditing(cat)
    setForm({ cat_name: cat.cat_name, cat_desc: cat.cat_desc || '', sort_order: String(cat.sort_order ?? 0), status: String(cat.status ?? 1) })
    if (fileRef.current) fileRef.current.value = ''
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleDelete(cat) {
    if (!window.confirm(`Delete the category "${cat.cat_name}"?`)) return
    setDeletingId(cat.cat_id)
    try {
      const r = await axios.post(`${WS}/deletecategory`, new URLSearchParams({ cat_id: cat.cat_id }))
      if (r.data.status === 1) { flash('Category deleted'); if (editing?.cat_id === cat.cat_id) reset(); load() }
      else flash(r.data.message || 'Delete failed', false)
    } finally { setDeletingId(null) }
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Categories" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header" ref={formTopRef}>
            <h2>Product Categories</h2>
            <p>Group your gifts so customers can browse by type</p>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          {/* ── ADD / EDIT FORM ── */}
          <div className="admin-card mb-4">
            <div className="admin-card-header">
              <i className={`bi ${editing ? 'bi-pencil' : 'bi-plus-circle'} me-2`} />
              {editing ? `Edit Category — ${editing.cat_name}` : 'Add Category'}
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label-admin" htmlFor="cat-name">Category Name <span style={{ color: '#EF4444' }}>*</span></label>
                    <input id="cat-name" className="form-control-admin" name="cat_name" value={form.cat_name} onChange={field} maxLength={150} placeholder="e.g. Greeting Cards" />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label-admin" htmlFor="cat-desc">Short Description</label>
                    <input id="cat-desc" className="form-control-admin" name="cat_desc" value={form.cat_desc} onChange={field} maxLength={500} placeholder="One line about this category" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label-admin" htmlFor="cat-img">
                      Category Image {editing && <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional replace)</span>}
                    </label>
                    <input id="cat-img" type="file" accept=".jpg,.jpeg,.png,.webp" className="form-control-admin" ref={fileRef} />
                    {editing?.cat_img && (
                      <div style={{ marginTop: '5px' }}>
                        <img src={`${IMG}categories/${editing.cat_img}`} alt="" style={{ height: 36, borderRadius: 6, border: '2px solid var(--border)' }} />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginLeft: '6px' }}>current</span>
                      </div>
                    )}
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cat-order">Display Order</label>
                    <input id="cat-order" type="number" min="0" className="form-control-admin" name="sort_order" value={form.sort_order} onChange={field} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label-admin" htmlFor="cat-status">Status</label>
                    <select id="cat-status" className="form-control-admin" name="status" value={form.status} onChange={field}>
                      <option value="1">Active</option>
                      <option value="0">Hidden</option>
                    </select>
                  </div>
                  <div className="col-md-4 d-flex gap-2">
                    <button className="btn-admin-primary w-100" type="submit" disabled={saving}>
                      {saving
                        ? <span className="spinner-border spinner-border-sm" />
                        : editing
                          ? <><i className="bi bi-check-lg me-1" />Update</>
                          : <><i className="bi bi-plus-lg me-1" />Add Category</>}
                    </button>
                    {editing && (
                      <button type="button" className="btn-admin-outline" onClick={reset} title="Cancel edit" aria-label="Cancel edit"><i className="bi bi-x-lg" /></button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ── LIST ── */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-tags" />
                <span>Categories</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 400 }}>({categories.length})</span>
              </div>
            </div>
            <div className="admin-card-body p-0">
              {categories.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                  <i className="bi bi-tags" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', opacity: 0.4 }} />
                  <div style={{ fontWeight: 600 }}>No categories yet. Add one above.</div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 70 }}>Image</th>
                        <th>Category</th>
                        <th style={{ width: 100 }}>Products</th>
                        <th style={{ width: 90 }}>Order</th>
                        <th style={{ width: 100 }}>Status</th>
                        <th style={{ width: 110 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(cat => (
                        <tr key={cat.cat_id} style={editing?.cat_id === cat.cat_id ? { background: 'rgba(var(--primary-rgb),0.05)' } : {}}>
                          <td>
                            {cat.cat_img
                              ? <img src={`${IMG}categories/${cat.cat_img}`} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                              : <div style={{ width: 48, height: 48, background: 'var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <i className="bi bi-tag" style={{ color: 'var(--text-light)', fontSize: '14px' }} />
                                </div>}
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{cat.cat_name}</div>
                            {cat.cat_desc && <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>{cat.cat_desc}</div>}
                          </td>
                          <td>{cat.product_count}</td>
                          <td>{cat.sort_order}</td>
                          <td>
                            <span className={`badge-status ${Number(cat.status) === 1 ? 'bs-confirmed' : 'bs-cancelled'}`}>
                              {Number(cat.status) === 1 ? 'Active' : 'Hidden'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-admin-outline btn-admin-sm" title="Edit" aria-label={`Edit ${cat.cat_name}`} onClick={() => startEdit(cat)}><i className="bi bi-pencil" /></button>
                              <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label={`Delete ${cat.cat_name}`} disabled={deletingId === cat.cat_id} onClick={() => handleDelete(cat)}>
                                {deletingId === cat.cat_id ? <span className="spinner-border spinner-border-sm" /> : <i className="bi bi-trash" />}
                              </button>
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
