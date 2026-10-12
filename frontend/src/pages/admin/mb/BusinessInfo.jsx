import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminBottomNav from '../../../components/admin/mb/AdminBottomNav'
import AdminMobileDrawer from '../../../components/admin/mb/AdminMobileDrawer'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

const BLANK = { business_name: '', phone: '', email: '', address: '', open_time: '', close_time: '', about: '', instagram: '', facebook: '' }

export default function AdminBusinessInfoMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
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
          setForm({ business_name: d.business_name || '', phone: d.phone || '', email: d.email || '', address: d.address || '', open_time: d.open_time || '', close_time: d.close_time || '', about: d.about || '', instagram: d.instagram || '', facebook: d.facebook || '' })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function save(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    axios.post(`${WS}/updatebusinessinfo`, new URLSearchParams({ ...params, ...form }))
      .then(r => setMsg({ ok: r.data.status === 1, text: r.data.message || 'Saved!' }))
      .catch(() => setMsg({ ok: false, text: 'Failed to save.' }))
      .finally(() => setSaving(false))
  }

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="ph">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Store Info</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Store details and delivery charges</div>
          </div>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px', padding: '1rem 1rem 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Loading…</div>
        ) : (
          <form onSubmit={save}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem', marginBottom: '14px', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)' }}>
              <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '12px' }}>Basic Information</div>
              {[
                { label: 'Business Name', key: 'business_name', type: 'text'  },
                { label: 'Phone',         key: 'phone',         type: 'tel'   },
                { label: 'Email',         key: 'email',         type: 'email' },
                { label: 'Opening Time',  key: 'open_time',     type: 'text'  },
                { label: 'Closing Time',  key: 'close_time',    type: 'text'  },
              ].map(({ label, key, type }) => (
                <div key={key} className="fgroup" style={{ marginBottom: '10px' }}>
                  <label className="flabel">{label}</label>
                  <input type={type} className="finput" value={form[key]} onChange={e => set(key, e.target.value)} />
                </div>
              ))}
              <div className="fgroup" style={{ marginBottom: '10px' }}>
                <label className="flabel">Address</label>
                <textarea className="finput" rows="2" value={form.address} onChange={e => set('address', e.target.value)} style={{ resize: 'none' }} />
              </div>
              <div className="fgroup" style={{ marginBottom: '0' }}>
                <label className="flabel">About</label>
                <textarea className="finput" rows="3" value={form.about} onChange={e => set('about', e.target.value)} style={{ resize: 'none' }} />
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem', marginBottom: '14px', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)' }}>
              <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)', marginBottom: '12px' }}>Social Media</div>
              {[
                { label: 'Instagram', key: 'instagram' },
                { label: 'Facebook',  key: 'facebook'  },
              ].map(({ label, key }) => (
                <div key={key} className="fgroup" style={{ marginBottom: '10px' }}>
                  <label className="flabel">{label}</label>
                  <input type="text" className="finput" value={form[key]} onChange={e => set(key, e.target.value)} />
                </div>
              ))}
            </div>

            {msg && (
              <div style={{ padding: '0.65rem 1rem', borderRadius: '10px', marginBottom: '12px', fontSize: '0.82rem', background: msg.ok ? '#DCFCE7' : '#FEE2E2', color: msg.ok ? '#16A34A' : '#DC2626' }}>
                {msg.text}
              </div>
            )}

            <button type="submit" disabled={saving} className="btn-p" style={{ width: '100%' }}>
              <i className={`bi bi-${saving ? 'hourglass-split' : 'floppy'}`} /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
