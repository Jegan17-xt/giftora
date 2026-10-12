import { useState, useEffect } from 'react'
import axios from 'axios'
import { refreshBranding } from '../../../utils/useVendorLogo'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

const BLANK = { business_name: '', phone: '', email: '', address: '', open_time: '', close_time: '', about: '', instagram: '', facebook: '' }

export default function AdminBusinessInfoWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form,    setForm]    = useState(BLANK)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState(null)

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  useEffect(() => {
    if (!user.profile_id) return
    axios.post(`${WS}/fetchbusinessinfo`, new URLSearchParams(params))
      .then(r => {
        if (r.data.status === 1 && r.data.info?.length) {
          const d = r.data.info[0]
          setForm({
            business_name: d.business_name || '',
            phone:         d.phone         || '',
            email:         d.email         || '',
            address:       d.address       || '',
            open_time:     d.open_time     || '',
            close_time:    d.close_time    || '',
            about:         d.about         || '',
            instagram:     d.instagram     || '',
            facebook:      d.facebook      || '',
            tagline:           d.tagline || '',
            shipping_charge:   String(Number(d.shipping_charge) || 0),
            free_shipping_min: String(Number(d.free_shipping_min) || 0),
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function save(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    axios.post(`${WS}/updatebusinessinfo`, new URLSearchParams({ ...params, ...form }))
      .then(r => { setMsg({ ok: r.data.status === 1, text: r.data.message || 'Saved!' }); if (r.data.status === 1) refreshBranding() })
      .catch(() => setMsg({ ok: false, text: 'Failed to save.' }))
      .finally(() => setSaving(false))
  }

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Store Info" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header"><h2>Store Info</h2><p>Store details shown on the website, plus delivery charges</p></div>

          {loading ? (
            <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>Loading…</div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="admin-card">
                  <div className="admin-card-header"><h5>Basic Information</h5></div>
                  <div className="admin-card-body">
                    <form onSubmit={save}>
                      <div className="row g-3">
                        <div className="col-md-6 mb-3">
                          <label>Store / Company Name *</label>
                          <input type="text" className="form-control" value={form.business_name} onChange={e => set('business_name', e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Phone Number *</label>
                          <input type="tel" className="form-control" value={form.phone} onChange={e => set('phone', e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Email Address</label>
                          <input type="email" className="form-control" value={form.email} onChange={e => set('email', e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Opening Time</label>
                          <input type="text" className="form-control" value={form.open_time} onChange={e => set('open_time', e.target.value)} placeholder="e.g. 9:00 AM" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Closing Time</label>
                          <input type="text" className="form-control" value={form.close_time} onChange={e => set('close_time', e.target.value)} placeholder="e.g. 9:00 PM" />
                        </div>
                        <div className="col-12 mb-3">
                          <label>Tagline</label>
                          <input type="text" className="form-control" maxLength={300} value={form.tagline || ''} onChange={e => set('tagline', e.target.value)} placeholder="Shown in the footer and on the home page" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Delivery Charge (₹)</label>
                          <input type="number" min="0" step="1" className="form-control" value={form.shipping_charge || ''} onChange={e => set('shipping_charge', e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Free Delivery Above (₹) <small style={{ fontWeight: 400 }}>— 0 to always charge</small></label>
                          <input type="number" min="0" step="1" className="form-control" value={form.free_shipping_min || ''} onChange={e => set('free_shipping_min', e.target.value)} />
                        </div>
                        <div className="col-12 mb-3">
                          <label>Address</label>
                          <textarea className="form-control" rows="2" value={form.address} onChange={e => set('address', e.target.value)} />
                        </div>
                        <div className="col-12 mb-3">
                          <label>About / Description</label>
                          <textarea className="form-control" rows="4" value={form.about} onChange={e => set('about', e.target.value)} />
                        </div>
                      </div>
                      {msg && (
                        <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 px-3 mb-3`} style={{ fontSize: '0.85rem', borderRadius: '10px' }}>
                          {msg.text}
                        </div>
                      )}
                      <div className="d-flex gap-3">
                        <button type="submit" disabled={saving} className="btn-admin-primary">
                          <i className={`bi bi-${saving ? 'hourglass-split' : 'floppy'}`} /> {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="admin-card">
                  <div className="admin-card-header"><h5>Social Media</h5></div>
                  <div className="admin-card-body">
                    {[
                      ['bi-instagram', 'Instagram', 'instagram'],
                      ['bi-facebook',  'Facebook',  'facebook' ],
                    ].map(([icon, platform, key]) => (
                      <div key={key} className="mb-3">
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '4px', display: 'block' }}>
                          <i className={`bi ${icon} me-1`} />{platform}
                        </label>
                        <input type="text" value={form[key]} onChange={e => set(key, e.target.value)}
                          style={{ border: '2px solid var(--border)', borderRadius: '10px', padding: '0.5rem 0.75rem', width: '100%', fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.85rem', color: 'var(--text-dark)', outline: 'none' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
