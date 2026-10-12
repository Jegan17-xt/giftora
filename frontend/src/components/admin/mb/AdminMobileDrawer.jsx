import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useVendorLogo from '../../../utils/useVendorLogo'
import { getUser } from '../../../utils/adminHelpers'
import { ADMIN_MENU, openMenuFor, adminLogout } from '../menu'

export default function AdminMobileDrawer({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { appTitle } = useVendorLogo()
  const [openMenu, setOpenMenu] = useState(() => openMenuFor(pathname))
  const user = getUser()

  const isActive = (item) => item.prefix ? pathname.startsWith(item.prefix) : pathname === item.to

  const itemSt = (isOn) => ({
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 16px', borderRadius: '10px', marginBottom: '2px',
    fontSize: '0.85rem', fontFamily: 'Nunito,sans-serif', fontWeight: isOn ? 800 : 600,
    color: isOn ? '#fff' : 'var(--text-mid)',
    background: isOn ? 'var(--primary)' : 'transparent',
    cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left', textDecoration: 'none',
  })

  const subItemSt = (isOn) => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '8px 14px 8px 28px', borderRadius: '8px', marginBottom: '1px',
    fontSize: '0.8rem', fontFamily: 'Nunito Sans,sans-serif', fontWeight: isOn ? 700 : 500,
    color: isOn ? 'var(--primary)' : '#6B7280',
    background: isOn ? 'rgba(var(--primary-rgb),0.08)' : 'transparent',
    cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left', textDecoration: 'none',
  })

  const sectionLabel = { fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 16px 6px', fontFamily: 'Nunito,sans-serif' }
  const chevron = (open) => ({ fontSize: '0.7rem', marginLeft: 'auto', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' })

  return createPortal(
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 998 }} />
      )}

      <div style={{
        position: 'fixed', top: 0, left: 0, height: '100%', width: '280px',
        background: '#fff', zIndex: 999, overflowY: 'auto',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
      }}>
        {/* brand */}
        <div style={{ padding: '20px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: 'var(--text-dark)' }}>
              <i className="bi bi-gift" style={{ color: 'var(--primary)', marginRight: '6px' }} />
              {appTitle}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'Nunito Sans,sans-serif' }}>Admin Panel</div>
          </div>
          <button onClick={onClose} aria-label="Close menu" style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div style={{ flex: 1, padding: '8px' }}>
          {ADMIN_MENU.map(section => (
            <div key={section.label}>
              <div style={sectionLabel}>{section.label}</div>
              {section.items.map(item => item.children ? (
                <div key={item.key}>
                  <button style={itemSt(isActive(item))} onClick={() => setOpenMenu(p => p === item.key ? null : item.key)}>
                    <i className={`bi ${item.icon}`} />{item.label}
                    <i className="bi bi-chevron-down" style={chevron(openMenu === item.key)} />
                  </button>
                  {openMenu === item.key && item.children.map(child => (
                    <Link key={child.to} to={child.to} onClick={onClose} style={subItemSt(pathname === child.to)}>
                      <i className={`bi ${child.icon}`} />{child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.to} to={item.to} onClick={onClose} style={itemSt(isActive(item))}>
                  <i className={`bi ${item.icon}`} />{item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
            {(user.name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-dark)' }}>{user.name || 'Admin'}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email || 'Administrator'}</div>
          </div>
          <button onClick={() => { onClose(); adminLogout(navigate) }} title="Logout" aria-label="Logout" style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '1rem', cursor: 'pointer' }}>
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}
