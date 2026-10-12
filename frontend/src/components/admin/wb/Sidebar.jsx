import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useVendorLogo from '../../../utils/useVendorLogo'
import { getUser } from '../../../utils/adminHelpers'
import { ADMIN_MENU, openMenuFor, adminLogout } from '../menu'

const IMG = import.meta.env.VITE_IMG_URL

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logoImg, appTitle } = useVendorLogo()
  const [openMenu, setOpenMenu] = useState(() => openMenuFor(pathname))
  const user = getUser()

  const isActive = (item) => item.prefix ? pathname.startsWith(item.prefix) : pathname === item.to

  return (
    <>
      <aside className={`admin-sidebar${isOpen ? ' open' : ''}`} id="sidebar">
        <div className="sidebar-brand">
          {logoImg ? (
            <img
              src={`${IMG}logo/${logoImg}`}
              alt={appTitle}
              style={{ height: 36, maxWidth: 150, objectFit: 'contain', borderRadius: 6, background: '#fff', padding: '3px 8px' }}
            />
          ) : (
            <>
              <div className="sidebar-brand-icon"><i className="bi bi-gift" /></div>
              <div>
                <div className="sidebar-brand-text">{appTitle}</div>
                <div className="sidebar-brand-sub">Admin Panel</div>
              </div>
            </>
          )}
        </div>

        {ADMIN_MENU.map(section => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            <ul className="sidebar-nav">
              {section.items.map(item => item.children ? (
                <li key={item.key}>
                  <button
                    className={`sidebar-has-sub${isActive(item) ? ' active' : ''}`}
                    onClick={() => setOpenMenu(prev => prev === item.key ? null : item.key)}
                    aria-expanded={openMenu === item.key}
                  >
                    <span><i className={`bi ${item.icon}`} />{item.label}</span>
                    <i className={`bi bi-chevron-${openMenu === item.key ? 'up' : 'down'} sub-arrow`} />
                  </button>
                  {openMenu === item.key && (
                    <ul className="sidebar-submenu">
                      {item.children.map(child => (
                        <li key={child.to}>
                          <Link to={child.to} onClick={onClose} className={pathname === child.to ? 'active' : ''}>
                            <i className={`bi ${child.icon}`} />{child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to}>
                  <Link to={item.to} onClick={onClose} className={isActive(item) ? 'active' : ''}>
                    <i className={`bi ${item.icon}`} />{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="sidebar-footer">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
            {(user.name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="admin-name">{user.name || 'Admin'}</div>
            <div className="admin-role" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email || 'Administrator'}</div>
          </div>
          <button
            onClick={() => adminLogout(navigate)}
            className="ms-auto"
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', cursor: 'pointer' }}
            title="Logout"
            aria-label="Logout"
          >
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
      </aside>
      {isOpen && <div className="admin-overlay show" onClick={onClose} />}
    </>
  )
}
