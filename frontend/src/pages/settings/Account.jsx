import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser } from '../../utils/adminHelpers'

const WS = import.meta.env.VITE_API_URL

export default function Account() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm]     = useState({ name: '', email: '', current_password: '', new_password: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]       = useState(null)
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    axios.post(`${WS}/fetchadminprofile`)
      .then(r => { if (r.data.status === 1) setForm(p => ({ ...p, name: r.data.admin.name, email: r.data.admin.email })) })
      .catch(() => {})
  }, [])

  function submit(e) {
    e.preventDefault()
    if (form.new_password && form.new_password !== form.confirm) {
      setMsg({ ok: false, text: 'The new passwords do not match' })
      return
    }
    setSaving(true)
    setMsg(null)
    const { confirm, ...body } = form
    axios.post(`${WS}/updateadminprofile`, new URLSearchParams(body))
      .then(r => {
        setMsg({ ok: r.data.status === 1, text: r.data.message || 'Saved' })
        if (r.data.status === 1) {
          localStorage.setItem('user', JSON.stringify({ ...getUser(), ...r.data.admin }))
          setForm(p => ({ ...p, current_password: '', new_password: '', confirm: '' }))
        }
      })
      .catch(() => setMsg({ ok: false, text: 'Could not save your account' }))
      .finally(() => setSaving(false))
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="My Account" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header">
            <h2>My Account</h2>
            <p>Your admin sign-in details</p>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <div className="admin-card">
                <div className="admin-card-body">
                  <form onSubmit={submit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label-admin" htmlFor="ac-name">Name</label>
                        <input id="ac-name" className="form-control-admin" required maxLength={150} autoComplete="name" value={form.name} onChange={set('name')} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-admin" htmlFor="ac-email">Login Email</label>
                        <input id="ac-email" type="email" className="form-control-admin" required maxLength={150} autoComplete="username" value={form.email} onChange={set('email')} />
                      </div>
                      <div className="col-12"><hr className="my-1" /><div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Leave the fields below empty to keep your current password.</div></div>
                      <div className="col-md-4">
                        <label className="form-label-admin" htmlFor="ac-cur">Current Password</label>
                        <input id="ac-cur" type="password" className="form-control-admin" autoComplete="current-password" value={form.current_password} onChange={set('current_password')} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label-admin" htmlFor="ac-new">New Password</label>
                        <input id="ac-new" type="password" className="form-control-admin" minLength={8} autoComplete="new-password" value={form.new_password} onChange={set('new_password')} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label-admin" htmlFor="ac-conf">Confirm New Password</label>
                        <input id="ac-conf" type="password" className="form-control-admin" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} />
                      </div>
                    </div>
                    {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mt-3 mb-0`} style={{ fontSize: '0.85rem' }}>{msg.text}</div>}
                    <button className="btn-admin-primary mt-3" type="submit" disabled={saving}>
                      {saving ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-check-lg me-1" />Save Changes</>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
