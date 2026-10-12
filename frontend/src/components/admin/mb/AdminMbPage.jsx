import { useState } from 'react'
import AdminBottomNav from './AdminBottomNav'
import AdminMobileDrawer from './AdminMobileDrawer'

/** Frame for the mobile admin pages: coloured header with menu button, scroll area, bottom nav. */
export default function AdminMbPage({ title, subtitle, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="phone">
      <AdminMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="ph">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>{title}</div>
            {subtitle && <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>{subtitle}</div>}
          </div>
          <button onClick={() => setDrawerOpen(true)} aria-label="Menu" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="bi bi-list" style={{ color: '#fff', fontSize: '1.2rem' }} />
          </button>
        </div>
      </div>
      <div className="scroll" style={{ paddingBottom: '80px' }}>{children}</div>
      <AdminBottomNav />
    </div>
  )
}
