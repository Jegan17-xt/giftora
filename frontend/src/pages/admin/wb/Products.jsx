import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import ProductForm, { productFormData } from '../../../components/admin/ProductForm'
import { money, discountPct } from '../../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

export default function AdminProductsWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [catFilter, setCatFilter]   = useState('')
  const [edit, setEdit]             = useState(null)
  const [saving, setSaving]         = useState(false)
  const [msg, setMsg]               = useState(null)
  const fileRef = useRef()

  function load() {
    return axios.post(`${WS}/fetchproducts`)
      .then(r => { if (r.data.status === 1) setProducts(r.data.products || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    axios.post(`${WS}/fetchcategories`)
      .then(r => { if (r.data.status === 1) setCategories(r.data.categories || []) })
      .catch(() => {})
  }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 3500)
  }

  function openEdit(p) {
    setEdit({
      pid: p.pid, product_name: p.product_name || '', cat_id: p.cat_id || '', sku: p.sku || '',
      description: p.description || '', mrp: String(Number(p.mrp)), price: String(Number(p.price)),
      stock: String(p.stock ?? 0), weight_grams: Number(p.weight_grams) ? String(p.weight_grams) : '', is_featured: String(p.is_featured ?? 0), status: String(p.status ?? 1),
      product_img: p.product_img || '',
    })
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const r = await axios.post(`${WS}/updateproduct`, productFormData(edit, fileRef.current?.files[0]))
      if (r.data.status === 1) {
        flash('Product updated')
        setEdit(null)
        load()
      } else flash(r.data.message || 'Update failed', false)
    } catch {
      flash('Could not save the product', false)
    } finally { setSaving(false) }
  }

  async function handleDelete(p) {
    if (!window.confirm(`Delete "${p.product_name}"? This cannot be undone.`)) return
    const r = await axios.post(`${WS}/deleteproduct`, new URLSearchParams({ pid: p.pid }))
    if (r.data.status === 1) { flash('Product deleted'); load() }
    else flash(r.data.message || 'Delete failed', false)
  }

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase()
    return (!catFilter || p.cat_id === catFilter) &&
      (!q || p.product_name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q))
  })

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Products" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h2>Products</h2>
              <p>Manage the gifts, prices, offers and stock in your store</p>
            </div>
            <Link to="/admin/products/add" className="btn-admin-primary"><i className="bi bi-plus-lg me-1" /> Add Product</Link>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          <div className="admin-card">
            <div className="admin-card-header flex-wrap gap-2">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-gift" />
                <span>All Products</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 400 }}>({filtered.length})</span>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)} aria-label="Filter by category"
                  style={{ border: '2px solid var(--border)', borderRadius: 10, padding: '0.4rem 0.7rem', fontSize: '0.85rem' }}>
                  <option value="">All categories</option>
                  {categories.map(c => <option key={c.cat_id} value={c.cat_id}>{c.cat_name}</option>)}
                </select>
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or SKU…" aria-label="Search products"
                  style={{ border: '2px solid var(--border)', borderRadius: 10, padding: '0.4rem 0.8rem', fontSize: '0.85rem', outline: 'none', width: 200 }} />
              </div>
            </div>
            <div className="admin-card-body p-0">
              {loading ? (
                <div className="text-center py-5"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
              ) : products.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                  <i className="bi bi-gift" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', opacity: 0.4 }} />
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No products yet</div>
                  <Link to="/admin/products/add" className="btn-admin-primary" style={{ display: 'inline-flex' }}><i className="bi bi-plus-lg me-1" /> Add First Product</Link>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>No products match your filters.</div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 64 }}>Image</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th style={{ width: 100 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(p => {
                        const off = discountPct(p.mrp, p.price)
                        return (
                          <tr key={p.pid}>
                            <td>
                              {p.product_img
                                ? <img src={`${IMG}products/${p.product_img}`} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                                : <div style={{ width: 48, height: 48, background: 'var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-gift" style={{ color: 'var(--text-light)' }} />
                                  </div>}
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                                {p.product_name}
                                {Number(p.is_featured) === 1 && <i className="bi bi-fire ms-1" title="Trending" style={{ color: '#F59E0B' }} />}
                              </div>
                              {p.sku && <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>SKU {p.sku}</div>}
                            </td>
                            <td>
                              {p.cat_name
                                ? <span style={{ background: 'rgba(var(--primary-rgb),0.1)', color: 'var(--primary)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', whiteSpace: 'nowrap' }}>{p.cat_name}</span>
                                : <span style={{ color: 'var(--text-light)' }}>—</span>}
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{money(p.price)}</span>
                              {off > 0 && <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}><s>{money(p.mrp)}</s> · {off}% off</div>}
                            </td>
                            <td style={{ fontWeight: 700, color: Number(p.stock) <= 5 ? '#DC2626' : 'var(--text-mid)' }}>{p.stock}</td>
                            <td>
                              <span className={`badge-status ${Number(p.status) === 1 ? 'bs-confirmed' : 'bs-cancelled'}`}>
                                {Number(p.status) === 1 ? 'Active' : 'Hidden'}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button className="btn-admin-outline btn-admin-sm" title="Edit" aria-label={`Edit ${p.product_name}`} onClick={() => openEdit(p)}><i className="bi bi-pencil" /></button>
                                <button className="btn-admin-danger btn-admin-sm" title="Delete" aria-label={`Delete ${p.product_name}`} onClick={() => handleDelete(p)}><i className="bi bi-trash" /></button>
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

      {/* ── EDIT MODAL ── */}
      {edit && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.45)' }} tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.25rem' }}>
                <h5 className="modal-title" style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '1rem' }}>
                  <i className="bi bi-pencil me-2" style={{ color: 'var(--primary)' }} />Edit Product
                </h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setEdit(null)} />
              </div>
              <div className="modal-body" style={{ padding: '1.5rem' }}>
                <form id="editProductForm" onSubmit={handleUpdate}>
                  <ProductForm form={edit} setForm={setEdit} categories={categories} fileRef={fileRef} />
                </form>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '0.85rem 1.25rem', gap: '0.5rem' }}>
                <button className="btn-admin-outline" onClick={() => setEdit(null)}>Cancel</button>
                <button className="btn-admin-primary" form="editProductForm" type="submit" disabled={saving}>
                  {saving
                    ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                    : <><i className="bi bi-check-lg me-1" />Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
