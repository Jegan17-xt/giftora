import { useState } from 'react'
import axios from 'axios'
import Shell, { Stars } from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import { useReviews, refreshReviews } from '../../utils/storeData'
import { fmtDate } from '../../utils/format'

const WS = import.meta.env.VITE_API_URL
const BLANK = { reviewer_name: '', reviewer_ph: '', rating: '5', product_name: '', review_text: '' }

export default function UserReviews() {
  const data = useReviews()
  const [form, setForm]     = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]       = useState(null)
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const reviews  = data?.reviews || []
  const products = data?.products || []
  const average  = reviews.length ? reviews.reduce((n, r) => n + Number(r.rating || 0), 0) / reviews.length : 0
  const spread   = [5, 4, 3, 2, 1].map(n => [n, reviews.filter(r => Number(r.rating) === n).length])

  function submit(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    axios.post(`${WS}/addreview`, new URLSearchParams({ ...getClientId(), ...form }))
      .then(r => {
        if (r.data.status === 1) {
          setMsg({ ok: true, text: 'Thank you! Your review will appear once it is approved.' })
          setForm(BLANK)
          refreshReviews()
        } else setMsg({ ok: false, text: r.data.message || 'Could not submit your review.' })
      })
      .catch(() => setMsg({ ok: false, text: 'Network error. Please try again.' }))
      .finally(() => setSaving(false))
  }

  return (
    <Shell title="Reviews">
      <div className="gf-wrap">
        <header className="gf-pagehead">
          <span className="gf-eyebrow">Reviews</span>
          <h1>What our customers <span className="gf-accent">say</span></h1>
        </header>

        <section className="shop-page">
          <div className="row g-4">
            <div className="col-lg-7">
              {reviews.length > 0 && (
                <div className="shop-panel mb-4 d-flex align-items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: '3.2rem', lineHeight: 1, fontWeight: 600 }}>{average.toFixed(1)}</div>
                    <div className="gf-rating" style={{ fontSize: '1rem' }}><Stars value={average} /></div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 200, display: 'grid', gap: 6 }}>
                    {spread.map(([n, c]) => (
                      <div key={n} className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>
                        <span style={{ width: 14 }}>{n}</span><i className="bi bi-star-fill" style={{ color: 'var(--star)', fontSize: '0.7rem' }} />
                        <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'var(--line)' }}>
                          <div style={{ width: `${(c / reviews.length) * 100}%`, height: '100%', borderRadius: 99, background: 'var(--star)' }} />
                        </div>
                        <span style={{ width: 20, textAlign: 'right' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data === undefined ? <div className="gf-spin" /> : reviews.length === 0 ? (
                <div className="shop-empty"><i className="bi bi-chat-quote" /><h2>No reviews yet</h2><p>Be the first to share your experience.</p></div>
              ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                  {reviews.map(rv => (
                    <figure key={rv.rid} className="gf-review" style={{ margin: 0 }}>
                      <Stars value={rv.rating} />
                      <blockquote>“{rv.review_text}”</blockquote>
                      <figcaption className="who">
                        <span className="gf-avatar">{rv.reviewer_name?.[0]?.toUpperCase() || '?'}</span>
                        <span><b>{rv.reviewer_name}</b><span>{[rv.product_name, fmtDate(rv.created_at)].filter(Boolean).join(' · ')}</span></span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>

            <div className="col-lg-5">
              <div className="gf-sticky">
                <form className="shop-panel" onSubmit={submit}>
                  <h5><i className="bi bi-pencil-square" />Write a review</h5>
                  <div className="row g-3">
                    <div className="col-sm-6 shop-field">
                      <label htmlFor="rv-name">Your Name *</label>
                      <input id="rv-name" className="form-control" required maxLength={200} autoComplete="name" value={form.reviewer_name} onChange={set('reviewer_name')} />
                    </div>
                    <div className="col-sm-6 shop-field">
                      <label htmlFor="rv-ph">Phone</label>
                      <input id="rv-ph" type="tel" className="form-control" maxLength={20} autoComplete="tel" value={form.reviewer_ph} onChange={set('reviewer_ph')} />
                    </div>
                    <div className="col-sm-6 shop-field">
                      <label htmlFor="rv-rating">Rating *</label>
                      <select id="rv-rating" className="form-select" value={form.rating} onChange={set('rating')}>
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div className="col-sm-6 shop-field">
                      <label htmlFor="rv-product">Gift Purchased</label>
                      <select id="rv-product" className="form-select" value={form.product_name} onChange={set('product_name')}>
                        <option value="">Select a gift…</option>
                        {products.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="col-12 shop-field">
                      <label htmlFor="rv-text">Your Review *</label>
                      <textarea id="rv-text" className="form-control" rows={4} required maxLength={2000} value={form.review_text} onChange={set('review_text')} placeholder="How was the gift and the delivery?" />
                    </div>
                  </div>
                  {msg && <div className={`gf-alert ${msg.ok ? 'ok' : 'err'} mt-3`} role="status">{msg.text}</div>}
                  <button type="submit" className="gf-btn gf-btn--block mt-3" disabled={saving}>{saving ? 'Submitting…' : 'Submit review'}</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Shell>
  )
}
