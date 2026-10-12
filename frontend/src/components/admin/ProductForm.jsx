const IMG = import.meta.env.VITE_IMG_URL

export const BLANK_PRODUCT = {
  product_name: '', cat_id: '', sku: '', description: '',
  mrp: '', price: '', stock: '', weight_grams: '', is_featured: '0', status: '1',
}

/** Build the multipart body for /addproduct and /updateproduct. */
export function productFormData(form, file, extra = {}) {
  const fd = new FormData()
  Object.entries({ ...extra, ...form }).forEach(([k, v]) => { if (k !== 'product_img') fd.append(k, v ?? '') })
  if (file) fd.append('product_img', file)
  return fd
}

/** Product fields shared by the "Add Product" page and the edit dialog. */
export default function ProductForm({ form, setForm, categories, fileRef }) {
  const field = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const req = <span style={{ color: '#EF4444' }}>*</span>

  return (
    <div className="row g-4">
      <div className="col-md-8">
        <label className="form-label-admin" htmlFor="pf-name">Product Name {req}</label>
        <input id="pf-name" className="form-control-admin" name="product_name" value={form.product_name} onChange={field} maxLength={255} placeholder="e.g. Luxury Celebration Gift Hamper" />
      </div>
      <div className="col-md-4">
        <label className="form-label-admin" htmlFor="pf-cat">Category</label>
        <select id="pf-cat" className="form-control-admin" name="cat_id" value={form.cat_id || ''} onChange={field}>
          <option value="">— No category —</option>
          {categories.map(c => <option key={c.cat_id} value={c.cat_id}>{c.cat_name}</option>)}
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label className="form-label-admin" htmlFor="pf-mrp">MRP (₹)</label>
        <input id="pf-mrp" type="number" min="0" step="0.01" className="form-control-admin" name="mrp" value={form.mrp} onChange={field} placeholder="1299" />
      </div>
      <div className="col-6 col-md-3">
        <label className="form-label-admin" htmlFor="pf-price">Selling Price (₹) {req}</label>
        <input id="pf-price" type="number" min="0" step="0.01" className="form-control-admin" name="price" value={form.price} onChange={field} placeholder="999" />
      </div>
      <div className="col-6 col-md-3">
        <label className="form-label-admin" htmlFor="pf-stock">Stock</label>
        <input id="pf-stock" type="number" min="0" step="1" className="form-control-admin" name="stock" value={form.stock} onChange={field} placeholder="25" />
      </div>
      <div className="col-6 col-md-3">
        <label className="form-label-admin" htmlFor="pf-sku">SKU</label>
        <input id="pf-sku" className="form-control-admin" name="sku" value={form.sku || ''} onChange={field} maxLength={60} placeholder="GH-001" />
      </div>

      <div className="col-6 col-md-3">
        <label className="form-label-admin" htmlFor="pf-weight">Weight (grams)</label>
        <input id="pf-weight" type="number" min="0" step="1" className="form-control-admin" name="weight_grams" value={form.weight_grams ?? ''} onChange={field} placeholder="250" />
      </div>
      <div className="col-6 col-md-9 d-flex align-items-end">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', paddingBottom: 10 }}>Packed weight, used with courier delivery rates. Left empty it counts as 250 g.</div>
      </div>

      <div className="col-md-8">
        <label className="form-label-admin" htmlFor="pf-desc">Description</label>
        <textarea id="pf-desc" className="form-control-admin" name="description" value={form.description || ''} onChange={field} rows={5} placeholder="What is in the gift, size, care notes…" />
      </div>
      <div className="col-md-4">
        <label className="form-label-admin" htmlFor="pf-img">Product Image</label>
        <input id="pf-img" type="file" accept=".jpg,.jpeg,.png,.webp" className="form-control-admin" ref={fileRef} />
        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>Square image, about 800×800px (jpg, png or webp)</div>
        {form.product_img && (
          <div style={{ marginTop: '6px' }}>
            <img src={`${IMG}products/${form.product_img}`} alt="" style={{ height: 56, width: 56, objectFit: 'cover', borderRadius: 8, border: '2px solid var(--border)' }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginLeft: '8px' }}>Current</span>
          </div>
        )}
        <div className="row g-2" style={{ marginTop: '8px' }}>
          <div className="col-6">
            <label className="form-label-admin" htmlFor="pf-status">Status</label>
            <select id="pf-status" className="form-control-admin" name="status" value={form.status} onChange={field}>
              <option value="1">Active</option>
              <option value="0">Hidden</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label-admin" htmlFor="pf-feat">Trending</label>
            <select id="pf-feat" className="form-control-admin" name="is_featured" value={form.is_featured} onChange={field}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
