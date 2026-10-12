import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { refreshBranding } from '../../utils/useVendorLogo'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser, useAutoHide } from '../../utils/adminHelpers'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

export default function AppLogo() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain }

  const [appLogo, setAppLogo] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [fevFile,  setFevFile]  = useState(null)
  const [logoMsg,  setLogoMsg]  = useState({ text: '', className: '' })
  const [fevMsg,   setFevMsg]   = useState({ text: '', className: '' })
  const logoRef = useRef()
  const fevRef  = useRef()
  useAutoHide(logoMsg, setLogoMsg)
  useAutoHide(fevMsg,  setFevMsg)

  useEffect(() => { fetchLogo() }, [])

  function fetchLogo() {
    axios.post(`${WS}/fetchapplogo`, new URLSearchParams(base)).then(r => {
      if (r.data.status === 1 && r.data.applogo?.length) {
        const data = r.data.applogo[0]
        setAppLogo(data)
        // Cache in localStorage so Sidebar picks it up after reload
        refreshBranding()
        refreshBranding()
      }
    })
  }

  function submitLogo(e) {
    e.preventDefault()
    if (!logoFile) return
    const fd = new FormData()
    Object.entries(base).forEach(([k, v]) => fd.append(k, v))
    fd.append('logopic', logoFile)
    axios.post(`${WS}/editapplogobypid`, fd).then(r => {
      if (r.data.status === 1) {
        refreshBranding()
        setLogoMsg({ text: 'Logo updated successfully', className: 'text-success' })
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setLogoMsg({ text: r.data.message || 'Upload failed', className: 'text-danger' })
      }
    })
  }

  function deleteLogo() {
    if (!window.confirm('Delete logo?')) return
    axios.post(`${WS}/deleteapplogo`, new URLSearchParams(base)).then(r => {
      if (r.data.status === 1) {
        refreshBranding()
        setTimeout(() => window.location.reload(), 800)
      }
    })
  }

  function submitFev(e) {
    e.preventDefault()
    if (!fevFile) return
    const fd = new FormData()
    Object.entries(base).forEach(([k, v]) => fd.append(k, v))
    fd.append('feviconpic', fevFile)
    axios.post(`${WS}/editappfeviconbypid`, fd).then(r => {
      if (r.data.status === 1) {
        refreshBranding()
        setFevMsg({ text: 'Favicon updated successfully', className: 'text-success' })
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setFevMsg({ text: r.data.message || 'Upload failed', className: 'text-danger' })
      }
    })
  }

  function deleteFev() {
    if (!window.confirm('Delete favicon?')) return
    axios.post(`${WS}/deleteappfevicon`, new URLSearchParams(base)).then(r => {
      if (r.data.status === 1) {
        refreshBranding()
        setTimeout(() => window.location.reload(), 800)
      }
    })
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="App Logo" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">Settings</li>
                <li className="breadcrumb-item active">App Logo</li>
              </ol>
            </nav>
            <h2>App Logo</h2>
          </div>

          <div className="row">

            {/* ── App Logo Card ── */}
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header fw-bold">APP LOGO</div>
                <div className="card-body">
                  {appLogo?.logo_img ? (
                    <>
                      <img
                        src={`${IMG}logo/${appLogo.logo_img}`}
                        alt="App Logo"
                        style={{ maxHeight: 80, maxWidth: '100%', display: 'block', marginBottom: 12 }}
                      />
                      <button className="btn btn-danger btn-sm" onClick={deleteLogo}>
                        <i className="bi bi-trash me-1" />Delete Logo
                      </button>
                    </>
                  ) : (
                    <form onSubmit={submitLogo}>
                      <div className="mb-3">
                        <label className="form-label text-muted small">Accepted: jpg, jpeg, png</label>
                        <input
                          ref={logoRef}
                          type="file"
                          className="form-control form-control-sm"
                          accept=".jpg,.jpeg,.png"
                          onChange={e => setLogoFile(e.target.files[0])}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm">
                        <i className="bi bi-upload me-1" />Upload Logo
                      </button>
                    </form>
                  )}
                  {logoMsg.text && (
                    <p className={`mt-2 mb-0 small ${logoMsg.className}`}>{logoMsg.text}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── App Favicon Card ── */}
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header fw-bold">APP FAVICON</div>
                <div className="card-body">
                  {appLogo?.fev_img ? (
                    <>
                      <img
                        src={`${IMG}fevicon/${appLogo.fev_img}`}
                        alt="Favicon"
                        style={{ maxHeight: 64, maxWidth: 64, display: 'block', marginBottom: 12 }}
                      />
                      <button className="btn btn-danger btn-sm" onClick={deleteFev}>
                        <i className="bi bi-trash me-1" />Delete Favicon
                      </button>
                    </>
                  ) : (
                    <form onSubmit={submitFev}>
                      <div className="mb-3">
                        <label className="form-label text-muted small">Accepted: jpg, jpeg, png, ico</label>
                        <input
                          ref={fevRef}
                          type="file"
                          className="form-control form-control-sm"
                          accept=".jpg,.jpeg,.png,.ico"
                          onChange={e => setFevFile(e.target.files[0])}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm">
                        <i className="bi bi-upload me-1" />Upload Favicon
                      </button>
                    </form>
                  )}
                  {fevMsg.text && (
                    <p className={`mt-2 mb-0 small ${fevMsg.className}`}>{fevMsg.text}</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
