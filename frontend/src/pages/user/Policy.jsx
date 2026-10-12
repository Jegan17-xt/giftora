import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'

const WS = import.meta.env.VITE_API_URL

const LABELS = {
  conditions:   'Terms and Conditions',
  privacy:      'Privacy Policy',
  disclaimer:   'Disclaimer',
  cookiepolicy: 'Cookie Policy',
}

export default function UserPolicy() {
  const { type } = useParams()
  const [terms, setTerms] = useState(null)

  useEffect(() => {
    axios.post(`${WS}/fetchuserterms`, new URLSearchParams(getClientId()))
      .then(r => setTerms(r.data.terms || []))
      .catch(() => setTerms([]))
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [type])

  const doc   = terms?.find(t => t.termtype === type)
  const title = doc?.terms_title || LABELS[type] || 'Policy'

  return (
    <Shell title={title}>
      <section className="shop-page">
        <div className="gf-wrap" style={{ maxWidth: 820 }}>
          <div className="gf-chips mb-4">
            {Object.entries(LABELS).map(([key, label]) => (
              <Link key={key} to={`/user/policy/${key}`}
                className={`gf-chip${type === key ? ' on' : ''}`}
                >
                {label}
              </Link>
            ))}
          </div>

          <div className="shop-panel">
            <h1 className="gf-h gf-h--sm">{title}</h1>
            {terms === null ? (
              <div className="text-center py-4"><span className="spinner-border" style={{ color: 'var(--primary)' }} /></div>
            ) : doc?.terms_desc ? (
              <p className="gf-prose" style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>{doc.terms_desc}</p>
            ) : (
              <p style={{ color: 'var(--ink-3)', marginTop: '1rem' }}>This page has not been published yet.</p>
            )}
          </div>
        </div>
      </section>
    </Shell>
  )
}
