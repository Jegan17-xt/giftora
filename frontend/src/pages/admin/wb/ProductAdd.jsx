import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'
import ProductForm, { BLANK_PRODUCT, productFormData } from '../../../components/admin/ProductForm'

const WS = import.meta.env.VITE_API_URL

export default function AdminProductAddWb() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm]     = useState(BLANK_PRODUCT)
  const [categories, setCategories] = useState([])
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]       = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    axios.post(`${WS}/fetchcategories`)
      .then(r => { if (r.data.status === 1) setCategories(r.data.categories || []) })
      .catch(() => {})
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    try {
      const r = await axios.post(`${WS}/addproduct`, productFormData(form, fileRef.current?.files[0]))
      if (r.data.status === 1) {
        setMsg({ text: 'Product added successfully!', ok: true })
        setTimeout(() => navigate('/admin/products'), 900)
      } else {
        setMsg({ text: r.data.message || 'Failed to add product', ok: false })
      }
    } catch {
      setMsg({ text: 'Could not save the product. Please try again.', ok: false })
    } finally { setSaving(false) }
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Add Product" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h2>Add Product</h2>
              <p>Create a new gift for your store</p>
            </div>
            <Link className="btn-admin-outline" to="/admin/products"><i className="bi bi-arrow-left me-1" /> Back to List</Link>
          </div>

          {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>{msg.text}</div>}

          {categories.length === 0 && (
            <div className="alert alert-info py-2 mb-3" style={{ fontSize: '0.85rem' }}>
              No categories yet. <Link to="/admin/products/categories">Add a category</Link> so customers can browse by type.
            </div>
          )}

          <div className="admin-card">
            <div className="admin-card-header"><i className="bi bi-plus-circle me-2" />New Product</div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit}>
                <ProductForm form={form} setForm={setForm} categories={categories} fileRef={fileRef} />
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link className="btn-admin-outline" to="/admin/products">Cancel</Link>
                  <button className="btn-admin-primary" type="submit" disabled={saving}>
                    {saving
                      ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                      : <><i className="bi bi-check-lg me-1" />Add Product</>}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
