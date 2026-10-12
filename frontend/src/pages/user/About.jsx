import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Shell, { Reveal } from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import useVendorLogo from '../../utils/useVendorLogo'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

// Sections the admin can fill in under Website Content → About Pages.
const SECTIONS = [
  { prefix: 'whoweare',   title: 'Who We Are' },
  { prefix: 'ourmission', title: 'Our Mission' },
  { prefix: 'ourvision',  title: 'Our Vision' },
  { prefix: 'ourvalues',  title: 'Our Values' },
  { prefix: 'comp',       title: 'Company Overview' },
  { prefix: 'whatwedo',   title: 'What We Do' },
  { prefix: 'whyus',      title: 'Why Choose Us' },
]

const hasText = (html) => !!html && html.replace(/<[^>]*>/g, '').trim().length > 0

export default function UserAbout() {
  const { appTitle, tagline } = useVendorLogo()
  const [data, setData] = useState(undefined)

  useEffect(() => {
    axios.post(`${WS}/fetchuserabout`, new URLSearchParams(getClientId()))
      .then(r => setData(r.data.status === 1 ? r.data : null))
      .catch(() => setData(null))
  }, [])

  const about = data?.about || {}
  const info  = data?.info || {}
  const stats = data?.stats
  const sections = SECTIONS
    .map(s => ({ ...s, sdesc: about[`${s.prefix}_sdesc`], desc: about[`${s.prefix}_desc`], img: about[`${s.prefix}_img`] }))
    .filter(s => hasText(s.sdesc) || hasText(s.desc))
  const statList = stats ? [
    [stats.products, 'Gifts to choose from'], [stats.categories, 'Gift categories'],
    [stats.orders, 'Orders delivered'], [stats.reviews, 'Customer reviews'],
  ].filter(([n]) => n > 0) : []

  return (
    <Shell title="About Us" description={info.about}>
      {data === undefined ? <div className="gf-spin" style={{ minHeight: '50vh', alignItems: 'center' }} /> : (
        <>
          <section className="gf-sec">
            <div className="gf-wrap">
              <div className={`gf-about-hero${about.aboutus_img ? '' : ' solo'}`}>
                <div>
                  <span className="gf-eyebrow">About {appTitle}</span>
                  <h1 className="gf-h">Our <span className="gf-accent">Story</span></h1>
                  {hasText(about.aboutus_sdesc)
                    ? <div className="gf-prose" style={{ marginTop: 16, fontWeight: 600, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: about.aboutus_sdesc }} />
                    : (info.about || tagline) && <p className="gf-prose" style={{ marginTop: 16 }}>{info.about || tagline}</p>}
                  {hasText(about.aboutus_desc) && <div className="gf-prose" style={{ marginTop: 10 }} dangerouslySetInnerHTML={{ __html: about.aboutus_desc }} />}
                  <Link to="/user/products" className="gf-btn mt-4">Shop gifts <i className="bi bi-arrow-right" /></Link>
                </div>
                {about.aboutus_img && (
                  <div className="gf-about-img"><img src={`${IMG}aboutUs/${about.aboutus_img}`} alt={`About ${appTitle}`} /></div>
                )}
              </div>
            </div>
          </section>

          {statList.length > 0 && (
            <section className="gf-sec gf-sec--tight gf-sec--tint">
              <div className="gf-wrap">
                <div className="gf-stats" style={{ gridTemplateColumns: `repeat(${statList.length}, 1fr)` }}>
                  {statList.map(([n, label]) => (
                    <div key={label} className="gf-stat"><b>{Number(n).toLocaleString()}</b><span>{label}</span></div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {sections.length > 0 && (
            <section className="gf-sec">
              <div className="gf-wrap">
                <Reveal className="gf-about-grid">
                  {sections.map(s => (
                    <article key={s.prefix} className="gf-about-card">
                      {s.img && <div className="gf-about-img" style={{ marginBottom: 16, boxShadow: 'none', borderRadius: 16 }}><img src={`${IMG}aboutUs/${s.img}`} alt={s.title} loading="lazy" /></div>}
                      <h3>{s.title}</h3>
                      {hasText(s.sdesc) && <div className="gf-prose lead" style={{ fontSize: '0.95rem' }} dangerouslySetInnerHTML={{ __html: s.sdesc }} />}
                      {hasText(s.desc) && <div className="gf-prose" style={{ fontSize: '0.92rem' }} dangerouslySetInnerHTML={{ __html: s.desc }} />}
                    </article>
                  ))}
                </Reveal>
              </div>
            </section>
          )}
        </>
      )}
    </Shell>
  )
}
