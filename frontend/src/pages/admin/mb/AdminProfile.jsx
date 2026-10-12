import { useNavigate } from 'react-router-dom'
import AdminBottomNav from '../../../components/admin/mb/AdminBottomNav'
import AdminMobileDrawer from '../../../components/admin/mb/AdminMobileDrawer'
import { useState } from 'react'

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

const menuItems = [
  { icon: 'bi-person-gear',   label: 'Edit Profile',          sub: 'Update personal details'       },
  { icon: 'bi-shield-lock',   label: 'Change Password',       sub: 'Update your credentials'       },
  { icon: 'bi-bell',          label: 'Notification Settings', sub: 'Manage alerts & reminders'     },
  { icon: 'bi-palette',       label: 'App Appearance',        sub: 'Theme and display settings'    },
  { icon: 'bi-headset',       label: 'Help & Support',        sub: 'Get assistance'                },
  { icon: 'bi-info-circle',   label: 'About App',             sub: 'Version 1.0.0'                 },
]

export default function AdminProfileMb() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const user = getUser()

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="sbar sbar-purple" />
      <div className="prof-hero" style={{ background: 'linear-gradient(135deg,var(--text-dark),#2D1B6B)', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', padding: '0 1rem' }}>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg,var(--primary),#9B6BFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.8rem', color: '#fff', fontFamily: 'Nunito,sans-serif', fontWeight: 900 }}>
            {(user.name || 'A')[0].toUpperCase()}
          </div>
          <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.15rem', color: '#fff' }}>{user.name || 'Admin User'}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{user.email}</div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>Store Administrator</div>
        </div>
      </div>

      <div className="scroll" style={{ paddingBottom: '80px', padding: '1rem 1rem 80px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(var(--primary-rgb),0.07)', marginBottom: '14px' }}>
          {menuItems.map(({ icon, label, sub }, i) => (
            <button key={label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 1rem', background: 'transparent', border: 'none', borderBottom: i < menuItems.length - 1 ? '1px solid var(--bg-soft)' : 'none', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(var(--primary-rgb),0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`bi ${icon}`} style={{ color: 'var(--primary)', fontSize: '1rem' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-dark)' }}>{label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{sub}</div>
              </div>
              <i className="bi bi-chevron-right" style={{ color: '#C4BAE8', fontSize: '0.8rem' }} />
            </button>
          ))}
        </div>

        <button onClick={handleLogout} style={{ width: '100%', background: '#FFF0F0', border: 'none', borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#EF4444', fontFamily: 'Nunito Sans,sans-serif', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
          <i className="bi bi-box-arrow-right" /> Sign Out
        </button>
      </div>

      <AdminBottomNav />
    </div>
  )
}
