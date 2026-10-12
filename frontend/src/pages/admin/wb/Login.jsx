import useAppBranding from '../../../hooks/useAppBranding'
import useAdminLogin from '../../../hooks/useAdminLogin'

export default function AdminLoginWb() {
  const { logoImg, appTitle } = useAppBranding()
  const { email, setEmail, password, setPassword, loading, error, submit } = useAdminLogin()

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="text-center mb-4">
          {logoImg
            ? <img src={`${import.meta.env.VITE_IMG_URL}logo/${logoImg}`} alt="logo" style={{maxHeight:'72px',maxWidth:'200px',objectFit:'contain',margin:'0 auto 1rem',display:'block'}} />
            : <div style={{width:'56px',height:'56px',background:'linear-gradient(135deg,var(--primary),var(--primary-light))',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',fontSize:'1.5rem',color:'#fff'}}>
                <i className="bi bi-gift" />
              </div>
          }
          <div style={{fontFamily:'Nunito,sans-serif',fontSize:'1.6rem',fontWeight:700,color:'var(--text-dark)'}}>
            {!logoImg && appTitle}
          </div>
          <div style={{fontSize:'0.8rem',color:'var(--text-light)',marginTop:'0.2rem'}}>Admin Panel</div>
        </div>

        <h5 style={{fontWeight:700,marginBottom:'0.25rem'}}>Welcome back</h5>
        <p style={{fontSize:'0.85rem',color:'var(--text-light)',marginBottom:'1.5rem'}}>Sign in to manage your store</p>

        <form className="form-admin" onSubmit={submit}>
          <div className="mb-3">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <i className="input-icon bi bi-envelope" />
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label>Password</label>
            <div className="input-icon-wrap">
              <i className="input-icon bi bi-lock" />
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2 mb-3" style={{fontSize:'0.82rem'}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-admin-primary w-100 justify-content-center"
            style={{padding:'0.8rem'}}
            disabled={loading}
          >
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Signing in…</>
              : <><i className="bi bi-box-arrow-in-right me-1" />Sign In</>
            }
          </button>
        </form>

        <div className="text-center mt-3" style={{fontSize:'0.78rem',color:'var(--text-light)'}}>
          <i className="bi bi-shield-check me-1" style={{color:'#22C55E'}} />Secured admin access
        </div>
      </div>
    </div>
  )
}
