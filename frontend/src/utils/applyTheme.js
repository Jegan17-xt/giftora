function hexToHsl(hex) {
  const r = parseInt(hex.slice(1,3),16)/255
  const g = parseInt(hex.slice(3,5),16)/255
  const b = parseInt(hex.slice(5,7),16)/255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  if (max!==min) {
    const d=max-min
    s=l>0.5?d/(2-max-min):d/(max+min)
    if(max===r) h=(g-b)/d+(g<b?6:0)
    else if(max===g) h=(b-r)/d+2
    else h=(r-g)/d+4
    h/=6
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)]
}

function hslToHex(h,s,l) {
  s=Math.max(0,Math.min(100,s))/100
  l=Math.max(0,Math.min(100,l))/100
  const k=n=>(n+h/30)%12
  const a=s*Math.min(l,1-l)
  const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)))
  return '#'+[f(0),f(8),f(4)].map(x=>Math.round(255*x).toString(16).padStart(2,'0')).join('')
}

function cl(v,lo,hi){return Math.max(lo,Math.min(hi,v))}

export function applyTheme(hex) {
  if(!hex||!hex.startsWith('#')||hex.length<7) return
  const [h,s,l]=hexToHsl(hex)
  const set=(n,v)=>document.documentElement.style.setProperty(n,v)

  const primary     = hex
  const primaryDark = hslToHex(h, cl(s,40,100), cl(l-12,8,25))
  const gradEnd     = hslToHex(h, cl(s-20,20,80), cl(l+22,55,88))
  const textDark    = hslToHex(h, cl(s*0.7,15,60), 10)
  const textMid     = hslToHex(h, cl(s*0.5,12,40), 28)
  const textLight   = hslToHex(h, 18, 56)
  const border      = hslToHex(h, cl(s*0.55,25,60), 91)
  const bgSoft      = hslToHex(h, cl(s*0.65,30,70), 97)
  const sidebarDark = hslToHex(h, cl(s,50,100), cl(l*0.4,5,14))
  const sidebarMid  = hslToHex(h, cl(s,45,90),  cl(l*0.7,9,24))

  const pr=parseInt(hex.slice(1,3),16)
  const pg=parseInt(hex.slice(3,5),16)
  const pb=parseInt(hex.slice(5,7),16)
  const rgb=`${pr},${pg},${pb}`

  // User-web vars
  set('--primary',      primary)
  set('--primary-dark', primaryDark)
  set('--primary-light',gradEnd)
  set('--grad-start',   primary)
  set('--grad-end',     gradEnd)
  set('--text-dark',    textDark)
  set('--text-mid',     textMid)
  set('--text-light',   textLight)
  set('--border',       border)
  set('--bg-soft',      bgSoft)

  // Admin-specific vars
  set('--sidebar-dark', sidebarDark)
  set('--sidebar-mid',  sidebarMid)
  set('--primary-rgb',  rgb)

  // Mobile app vars (app.css)
  set('--P',   primary)
  set('--PD',  primaryDark)
  set('--PL',  gradEnd)
  set('--PP',  bgSoft)
  set('--PM',  border)
  set('--BG',  bgSoft)
  set('--BDR', border)
  set('--TH',  textDark)
  set('--TB',  textMid)
  set('--TS',  textLight)

  localStorage.setItem('store_theme_color', hex)
}

export function loadSavedTheme() {
  const saved = localStorage.getItem('store_theme_color')
  if (saved) applyTheme(saved)
}
