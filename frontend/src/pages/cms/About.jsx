import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import Sidenav from './about/Sidenav'
import Aboutus from './about/Aboutus'
import Whoweare from './about/Whoweare'
import Ourmission from './about/Ourmission'
import Ourvision from './about/Ourvision'
import Ourvalues from './about/Ourvalues'
import Companyoverview from './about/Companyoverview'
import Whatwedo from './about/Whatwedo'
import Whychooseus from './about/Whychooseus'

const components = {
  aboutus: Aboutus,
  whoweare: Whoweare,
  ourmission: Ourmission,
  ourvision: Ourvision,
  ourvalues: Ourvalues,
  companyoverview: Companyoverview,
  whatwedo: Whatwedo,
  whychooseus: Whychooseus,
}

const titles = {
  aboutus: 'About Us',
  whoweare: 'Who We Are',
  ourmission: 'Our Mission',
  ourvision: 'Our Vision',
  ourvalues: 'Our Values',
  companyoverview: 'Company Overview',
  whatwedo: 'What We Do',
  whychooseus: 'Why Choose Us',
}

export default function About() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { aboutid } = useParams()
  const Sub = components[aboutid] || Aboutus
  const title = titles[aboutid] || 'About'

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title={`About — ${title}`} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">CMS</li>
                <li className="breadcrumb-item active">About</li>
              </ol>
            </nav>
            <h2>About <small className="text-muted fs-6">{title}</small></h2>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Sidenav />
            </div>
            <div className="col-md-10">
              <Sub />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
