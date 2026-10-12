import { useState, useEffect } from 'react'
import axios from 'axios'
import { refreshBranding } from '../../utils/useVendorLogo'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser, useAutoHide } from '../../utils/adminHelpers'

const WS = import.meta.env.VITE_API_URL

function LimitedInput({ value, onChange, max, ...props }) {
  const near = value.length >= Math.floor(max * 0.85)
  return (
    <input
      {...props}
      className={`form-control form-control-sm ${near ? 'text-danger' : ''}`}
      value={value}
      onChange={e => onChange(e.target.value.slice(0, max))}
    />
  )
}

export default function Companyinfo() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain }

  const [ci, setCi] = useState({
    companyname: '', phone_one: '', phone_two: '',
    email_one: '', email_two: '', house_no: '', area: '',
    city: '', pincode: '', district: '', state: '', country: ''
  })
  const [ciMsg, setCiMsg] = useState({ text: '', className: '' })
  useAutoHide(ciMsg, setCiMsg)

  const [sl, setSl] = useState({ fb: '', insta: '', linked: '' })
  const [slMsg, setSlMsg] = useState({ text: '', className: '' })
  useAutoHide(slMsg, setSlMsg)

  useEffect(() => {
    const params = new URLSearchParams(base)
    axios.post(`${WS}/fetchcompanyinfo`, params)
      .then(r => { if (r.data.status === 1 && r.data.companyinfo?.length) setCi(r.data.companyinfo[0]) })
    axios.post(`${WS}/fetchsociallinks`, params)
      .then(r => { if (r.data.status === 1 && r.data.sociallinks?.length) setSl(r.data.sociallinks[0]) })
  }, [])

  function submitCI(e) {
    e.preventDefault()
    const fd = new FormData()
    Object.entries({ ...base, ...ci }).forEach(([k, v]) => fd.append(k, v))
    axios.post(`${WS}/updatecompanyinfo`, fd)
      .then(r => {
        setCiMsg({ text: r.data.message || 'Updated', className: r.data.status === 1 ? 'text-success' : 'text-danger' })
        if (r.data.status === 1) refreshBranding()
      })
  }

  function submitSL(e) {
    e.preventDefault()
    const fd = new FormData()
    Object.entries({ ...base, ...sl }).forEach(([k, v]) => fd.append(k, v))
    axios.post(`${WS}/updatesociallinkinfo`, fd)
      .then(r => setSlMsg({ text: r.data.message || 'Updated', className: r.data.status === 1 ? 'text-success' : 'text-danger' }))
  }

  const f = (key, max) => (
    <LimitedInput value={ci[key] || ''} onChange={v => setCi(p => ({ ...p, [key]: v }))} max={max} />
  )

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Company Info" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">CMS</li>
                <li className="breadcrumb-item active">Company Info</li>
              </ol>
            </nav>
            <h2>Company Info</h2>
          </div>
          <div className="row">

          {/* Card 1 – Company Info */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header fw-bold">Company Info</div>
              <div className="card-body">
                <form onSubmit={submitCI}>
                  <div className="mb-2">
                    <label className="form-label">Company Name</label>
                    {f('companyname', 40)}
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <label className="form-label">Contact Primary</label>
                      {f('phone_one', 20)}
                    </div>
                    <div className="col-6">
                      <label className="form-label">Contact Secondary</label>
                      {f('phone_two', 20)}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <label className="form-label">Email Primary</label>
                      {f('email_one', 30)}
                    </div>
                    <div className="col-6">
                      <label className="form-label">Email Secondary</label>
                      {f('email_two', 30)}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4">
                      <label className="form-label">House / Flat No</label>
                      {f('house_no', 10)}
                    </div>
                    <div className="col-8">
                      <label className="form-label">Area / Location</label>
                      {f('area', 256)}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <label className="form-label">City</label>
                      {f('city', 40)}
                    </div>
                    <div className="col-6">
                      <label className="form-label">Pincode</label>
                      {f('pincode', 15)}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4">
                      <label className="form-label">District</label>
                      {f('district', 40)}
                    </div>
                    <div className="col-4">
                      <label className="form-label">State</label>
                      {f('state', 40)}
                    </div>
                    <div className="col-4">
                      <label className="form-label">Country</label>
                      {f('country', 40)}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">UPDATE</button>
                  {ciMsg.text && <p className={`mt-2 fs_12 ${ciMsg.className}`}>{ciMsg.text}</p>}
                </form>
              </div>
            </div>
          </div>

          {/* Card 2 – Social Media Links */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header fw-bold">Social Media Links</div>
              <div className="card-body">
                <form onSubmit={submitSL}>
                  <div className="mb-2">
                    <label className="form-label">Facebook Page Link</label>
                    <input className="form-control form-control-sm" value={sl.fb || ''}
                      onChange={e => setSl(p => ({ ...p, fb: e.target.value }))} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Instagram Page Link</label>
                    <input className="form-control form-control-sm" value={sl.insta || ''}
                      onChange={e => setSl(p => ({ ...p, insta: e.target.value }))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">LinkedIn Page Link</label>
                    <input className="form-control form-control-sm" value={sl.linked || ''}
                      onChange={e => setSl(p => ({ ...p, linked: e.target.value }))} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">UPDATE</button>
                  {slMsg.text && <p className={`mt-2 fs_12 ${slMsg.className}`}>{slMsg.text}</p>}
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
