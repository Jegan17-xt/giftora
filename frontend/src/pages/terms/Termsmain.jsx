import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar  from '../../components/admin/wb/Topbar'
import Termsidenav  from './Termsidenav'
import Conditions   from './Conditions'
import Privacypolicy from './Privacypolicy'
import Disclaimer   from './Disclaimer'
import Cookie       from './Cookie'

const components = {
  conditions:   Conditions,
  privacy:      Privacypolicy,
  disclaimer:   Disclaimer,
  cookiepolicy: Cookie,
}

const titles = {
  conditions:   'Terms and Conditions',
  privacy:      'Privacy Policy',
  disclaimer:   'Disclaimer',
  cookiepolicy: 'Cookie Policy',
}

export default function Termsmain() {
  const { termid } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const Sub   = components[termid] || Conditions
  const title = titles[termid]   || 'Terms & Policy'

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Terms & Policy" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">CMS</li>
                <li className="breadcrumb-item active">Terms &amp; Policy</li>
              </ol>
            </nav>
            <h2>Terms &amp; Policy <small className="text-muted fs-6 fw-normal">{title}</small></h2>
          </div>

          <div className="row">
            <div className="col-md-3 col-lg-2 mb-3">
              <Termsidenav />
            </div>
            <div className="col-md-9 col-lg-10">
              <Sub />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
