import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser, useAutoHide } from '../../utils/adminHelpers'
import { applyTheme } from '../../utils/applyTheme'

const WS = import.meta.env.VITE_API_URL

const PRESETS = [
  { label: 'Rose',       hex: '#E11D74' },
  { label: 'Purple',     hex: '#6C3CE1' },
  { label: 'Deep Blue',  hex: '#1e40af' },
  { label: 'Sky',        hex: '#0891b2' },
  { label: 'Emerald',    hex: '#059669' },
  { label: 'Rose',       hex: '#be123c' },
  { label: 'Fuchsia',    hex: '#c026d3' },
  { label: 'Orange',     hex: '#c2410c' },
  { label: 'Slate',      hex: '#334155' },
  { label: 'Indigo',     hex: '#4338ca' },
  { label: 'Teal',       hex: '#0f766e' },
  { label: 'Crimson',    hex: '#dc2626' },
  { label: 'Forest',     hex: '#166534' },
]

function Preview({ color }) {
  const style = {
    '--prev-color': color,
    '--prev-dark': color,
  }
  return (
    <div style={style}>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light,#9590B0)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Live Preview
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Mini sidebar */}
        <div style={{ width: 120, borderRadius: 12, overflow: 'hidden', background: color, padding: '10px 0', flexShrink: 0 }}>
          <div style={{ padding: '0 10px 8px', borderBottom: '1px solid rgba(255,255,255,0.12)', marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, background: `linear-gradient(135deg,#fff3,#fff1)`, marginBottom: 4 }} />
            <div style={{ height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.7)', width: '70%' }} />
          </div>
          {[75, 60, 55, 60].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: i === 0 ? '#fff' : 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
              <div style={{ height: 6, borderRadius: 3, background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)', width: `${w}%` }} />
            </div>
          ))}
          {/* Active item */}
          <div style={{ margin: '4px 6px', borderRadius: 6, padding: '4px 6px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: '#fff', flexShrink: 0 }} />
            <div style={{ height: 6, borderRadius: 3, background: '#fff', width: '65%' }} />
          </div>
        </div>

        {/* Right side preview */}
        <div style={{ flex: 1, minWidth: 140 }}>
          {/* Button */}
          <div style={{ background: color, borderRadius: 8, padding: '6px 12px', color: '#fff', fontSize: '0.75rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 8, boxShadow: `0 4px 12px ${color}55` }}>
            <i className="bi bi-plus-circle" style={{ fontSize: '0.7rem' }} /> Add New
          </div>
          {/* Card */}
          <div style={{ background: '#fff', borderRadius: 10, border: `1px solid`, borderColor: `${color}33`, padding: '10px', boxShadow: `0 2px 8px ${color}15` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-graph-up" style={{ color, fontSize: '0.9rem' }} />
              </div>
              <div>
                <div style={{ height: 7, borderRadius: 3, background: '#1a1035', width: 60, marginBottom: 4 }} />
                <div style={{ height: 5, borderRadius: 3, background: '#eee', width: 40 }} />
              </div>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: `${color}30`, width: '100%', marginBottom: 3 }} />
            <div style={{ height: 5, borderRadius: 3, background: `${color}18`, width: '70%' }} />
          </div>
          {/* User panel button */}
          <div style={{ marginTop: 8, background: `linear-gradient(135deg,${color},${color}bb)`, borderRadius: 8, padding: '6px 12px', color: '#fff', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, boxShadow: `0 4px 12px ${color}44` }}>
            <i className="bi bi-bag-plus" style={{ fontSize: '0.7rem' }} /> Add to Cart
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThemColor() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain }

  const [tcolor, setTcolor] = useState('#E11D74')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', className: '' })
  useAutoHide(message, setMessage)

  useEffect(() => {
    axios.post(`${WS}/fetchthemecolor`, new URLSearchParams(base)).then(r => {
      if (r.data.status === 1 && r.data.color?.length) {
        setTcolor(r.data.color[0].color || '#E11D74')
      }
    })
  }, [])

  function pickColor(hex) {
    setTcolor(hex)
    applyTheme(hex)
  }

  function submit(e) {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData()
    Object.entries({ ...base, tcolor }).forEach(([k, v]) => fd.append(k, v))
    axios.post(`${WS}/updatethemecolor`, fd).then(r => {
      setSaving(false)
      setMessage({ text: r.data.message || 'Updated', className: r.data.status === 1 ? 'text-success' : 'text-danger' })
      if (r.data.status === 1) applyTheme(tcolor)
    }).catch(() => { setSaving(false); setMessage({ text: 'Network error', className: 'text-danger' }) })
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Theme Color" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">Settings</li>
                <li className="breadcrumb-item active">Theme Color</li>
              </ol>
            </nav>
            <h2>Theme Color</h2>
            <p>Choose a color — your entire admin panel and customer-facing website update instantly.</p>
          </div>

          <div className="row g-4">

            {/* Picker + Presets */}
            <div className="col-lg-7">
              <div className="card">
                <div className="card-header fw-bold d-flex align-items-center gap-2">
                  <i className="bi bi-palette" style={{ color: tcolor }} /> Choose Your Brand Color
                </div>
                <div className="card-body">

                  {/* Preset swatches */}
                  <div className="mb-4">
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light,#9590B0)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Quick Presets
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {PRESETS.map(({ label, hex }) => (
                        <button
                          key={hex}
                          type="button"
                          title={label}
                          onClick={() => pickColor(hex)}
                          style={{
                            width: 42, height: 42, borderRadius: 10, background: hex, border: 'none',
                            cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0,
                            outline: tcolor === hex ? `3px solid ${hex}` : 'none',
                            outlineOffset: 2,
                            boxShadow: tcolor === hex ? `0 4px 14px ${hex}55` : `0 2px 8px ${hex}44`,
                            transform: tcolor === hex ? 'scale(1.15)' : 'scale(1)',
                            position: 'relative',
                          }}
                        >
                          {tcolor === hex && (
                            <i className="bi bi-check-lg" style={{ color: '#fff', fontSize: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom color picker */}
                  <div className="mb-4">
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-light,#9590B0)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Custom Color
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input
                        type="color"
                        value={tcolor}
                        onChange={e => pickColor(e.target.value)}
                        style={{ width: 52, height: 44, borderRadius: 10, border: '2px solid var(--border,#EAE3FF)', padding: 3, cursor: 'pointer', background: '#fff' }}
                      />
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800, color: tcolor, letterSpacing: '0.05em' }}>
                          {tcolor.toUpperCase()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light,#9590B0)' }}>Click the swatch to open color wheel</div>
                      </div>
                      {/* Color swatch bar */}
                      <div style={{ flex: 1, height: 44, borderRadius: 10, background: `linear-gradient(135deg,${tcolor},${tcolor}99)`, boxShadow: `0 4px 16px ${tcolor}44` }} />
                    </div>
                  </div>

                  {/* Save */}
                  <form onSubmit={submit}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        type="submit"
                        disabled={saving}
                        style={{
                          background: `linear-gradient(135deg,${tcolor},${tcolor}cc)`,
                          color: '#fff', border: 'none', borderRadius: 10,
                          padding: '0.6rem 1.5rem', fontFamily: 'Nunito,sans-serif',
                          fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer',
                          boxShadow: `0 4px 14px ${tcolor}44`, transition: 'all 0.2s',
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        {saving
                          ? <><span className="spinner-border spinner-border-sm" />Saving...</>
                          : <><i className="bi bi-check-circle" />Apply & Save Theme</>
                        }
                      </button>
                      {message.text && <span className={`small ${message.className}`}>{message.text}</span>}
                    </div>
                  </form>

                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="col-lg-5">
              <div className="card h-100">
                <div className="card-header fw-bold">
                  <i className="bi bi-eye me-1" /> Theme Preview
                </div>
                <div className="card-body">
                  <Preview color={tcolor} />
                  <div className="mt-4 p-3" style={{ background: 'var(--bg-soft,#F5F0FF)', borderRadius: 10 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid,#3D3660)', marginBottom: '0.5rem' }}>
                      <i className="bi bi-info-circle me-1" /> What changes
                    </div>
                    {[
                      'Admin sidebar & active nav items',
                      'Buttons, badges & links',
                      'Form focus borders',
                      'Storefront (homepage, products, buttons)',
                      'Mobile app theme color',
                    ].map(t => (
                      <div key={t} style={{ fontSize: '0.78rem', color: 'var(--text-light,#9590B0)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <i className="bi bi-check2" style={{ color: tcolor, fontSize: '0.8rem' }} /> {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
