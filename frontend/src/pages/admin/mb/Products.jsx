import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AdminMbPage from '../../../components/admin/mb/AdminMbPage'
import { money } from '../../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL
const muted = { textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }

export default function AdminProductsMb() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  useEffect(() => {
    axios.post(`${WS}/fetchproducts`)
      .then(r => { if (r.data.status === 1) setProducts(r.data.products || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p => {
    const q = search.trim().toLowerCase()
    return !q || p.product_name?.toLowerCase().includes(q) || p.cat_name?.toLowerCase().includes(q)
  })

  return (
    <AdminMbPage title="Products" subtitle="Gifts in your store">
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div className="searchbar" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
            <i className="bi bi-search" />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" aria-label="Search products"
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0, fontSize: '0.88rem', color: 'var(--text-dark)' }} />
          </div>
          <Link to="/admin/products/add" aria-label="Add product" style={{ width: 44, borderRadius: 12, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
            <i className="bi bi-plus-lg" />
          </Link>
        </div>

        {loading ? <div style={muted}>Loading…</div> : filtered.length === 0 ? <div style={muted}>No products found.</div> : filtered.map(p => {
          const active = Number(p.status) === 1
          return (
            <div key={p.pid} style={{ background: '#fff', borderRadius: '16px', padding: '0.8rem', marginBottom: '10px', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              {p.product_img ? (
                <img src={`${IMG}products/${p.product_img}`} alt="" style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(var(--primary-rgb),0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="bi bi-gift" style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-dark)' }}>{p.product_name}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                  {p.cat_name && <>{p.cat_name} · </>}
                  <span style={{ color: 'var(--text-dark)', fontWeight: 800 }}>{money(p.price)}</span>
                  {' · '}<span style={{ color: Number(p.stock) <= 5 ? '#DC2626' : 'inherit', fontWeight: 700 }}>{p.stock} in stock</span>
                </div>
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: active ? '#16A34A' : '#EF4444', background: active ? '#22C55E1A' : '#EF44441A', padding: '2px 8px', borderRadius: '99px', flexShrink: 0 }}>
                {active ? 'Active' : 'Hidden'}
              </span>
            </div>
          )
        })}
        <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', textAlign: 'center', marginTop: 8 }}>
          To edit or delete a product, open this page on a larger screen.
        </div>
      </div>
    </AdminMbPage>
  )
}
