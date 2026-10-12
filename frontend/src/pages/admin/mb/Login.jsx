import useAppBranding from '../../../hooks/useAppBranding'
import useAdminLogin from '../../../hooks/useAdminLogin'

export default function AdminLoginMb() {
  const { logoImg, appTitle } = useAppBranding()
  const { email, setEmail, password, setPassword, loading, error, submit } = useAdminLogin()

  return (
    <div className="phone">
      <div className="sbar sbar-purple" />
      <div
        className="scroll"
        style={{background:'linear-gradient(160deg,var(--text-dark) 0%,#2D1B6B 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100%',padding:'2rem 1.5rem'}}
      >
        {logoImg
          ? <img src={`${import.meta.env.VITE_IMG_URL}logo/${logoImg}`} alt="logo" style={{maxHeight:'80px',maxWidth:'220px',objectFit:'contain',marginBottom:'1.2rem'}} />
          : <div style={{width:'64px',height:'64px',borderRadius:'18px',background:'linear-gradient(135deg,var(--primary),#9B6BFF)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.2rem',boxShadow:'0 8px 32px rgba(var(--primary-rgb),0.4)'}}>
              <i className="bi bi-scissors" style={{fontSize:'1.8rem',color:'#fff'}} />
            </div>
        }

        <div style={{fontFamily:'Nunito,sans-serif',fontWeight:900,fontSize:'1.6rem',color:'#fff',marginBottom:'4px'}}>
          {!logoImg && appTitle}
        </div>
        <div style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.55)',marginBottom:'2rem'}}>Admin Portal</div>

        <form onSubmit={submit} style={{width:'100%',maxWidth:'360px'}}>
          <div className="fgroup" style={{marginBottom:'1rem'}}>
            <label className="flabel" style={{color:'rgba(255,255,255,0.7)'}}>Email Address</label>
            <input
              type="email"
              className="finput"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{background:'rgba(255,255,255,0.08)',border:'2px solid rgba(255,255,255,0.12)',color:'#fff'}}
              required
            />
          </div>

          <div className="fgroup" style={{marginBottom:'1rem'}}>
            <label className="flabel" style={{color:'rgba(255,255,255,0.7)'}}>Password</label>
            <input
              type="password"
              className="finput"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{background:'rgba(255,255,255,0.08)',border:'2px solid rgba(255,255,255,0.12)',color:'#fff'}}
              required
            />
          </div>

          {error && (
            <div style={{background:'rgba(239,68,68,0.15)',border:'1px solid rgba(239,68,68,0.4)',borderRadius:'8px',color:'#FCA5A5',fontSize:'0.8rem',padding:'0.6rem 0.8rem',marginBottom:'1rem'}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-p"
            style={{width:'100%', opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading
              ? <><i className="bi bi-arrow-repeat" /> Signing in…</>
              : <><i className="bi bi-box-arrow-in-right" /> Sign In</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}
