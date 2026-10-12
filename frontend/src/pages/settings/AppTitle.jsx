import { useState, useEffect } from 'react'
import axios from 'axios'
import { refreshBranding } from '../../utils/useVendorLogo'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser, useAutoHide } from '../../utils/adminHelpers'

const WS = import.meta.env.VITE_API_URL
const MAX = 40

export default function AppTitle() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain }

  const [apptitle, setApptitle] = useState('')
  const [message, setMessage] = useState({ text: '', className: '' })
  useAutoHide(message, setMessage)

  useEffect(() => {
    axios.post(`${WS}/myappname`, new URLSearchParams(base))
      .then(r => {
        if (r.data.status === 1 && r.data.appname?.length)
          setApptitle(r.data.appname[0].apptitle || '')
      })
  }, [])

  function submit(e) {
    e.preventDefault()
    const fd = new FormData()
    Object.entries({ ...base, apptitle }).forEach(([k, v]) => fd.append(k, v))
    axios.post(`${WS}/updateappname`, fd).then(r => {
      setMessage({
        text: r.data.message || 'Updated',
        className: r.data.status === 1 ? 'text-success' : 'text-danger'
      })
      if (r.data.status === 1) refreshBranding()
    })
  }

  const remaining = MAX - apptitle.length

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Company Name" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">Settings</li>
                <li className="breadcrumb-item active">Company Name</li>
              </ol>
            </nav>
            <h2>Company Name</h2>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header fw-bold">Company Name</div>
                <div className="card-body">
                  <form onSubmit={submit}>
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input
                        className={`form-control form-control-sm${remaining < 0 ? ' border-danger text-danger' : ''}`}
                        value={apptitle}
                        onChange={e => setApptitle(e.target.value.slice(0, MAX))}
                      />
                      <small className={remaining < 5 ? 'text-danger' : 'text-muted'}>
                        {MAX - apptitle.length} characters remaining
                      </small>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Update</button>
                    {message.text && (
                      <p className={`mt-2 mb-0 small ${message.className}`}>{message.text}</p>
                    )}
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
