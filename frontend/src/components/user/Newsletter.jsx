import { useState } from 'react'
import axios from 'axios'
import getClientId from '../../utils/useClientId'
import { Reveal } from './Shell'

const WS = import.meta.env.VITE_API_URL

/** Email sign-up. Requests arrive in the admin panel under Enquiries. */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')   // idle | sending | ok | err

  function submit(e) {
    e.preventDefault()
    setState('sending')
    const body = new URLSearchParams({
      ...getClientId(),
      cname: 'Newsletter subscriber', cemail: email, cmobile: '',
      subject: 'Newsletter signup', message: `Please add ${email} to the newsletter list.`,
    })
    axios.post(`${WS}/addcontactenquiry`, body)
      .then(r => { setState(r.data.status === 1 ? 'ok' : 'err'); if (r.data.status === 1) setEmail('') })
      .catch(() => setState('err'))
  }

  return (
    <section className="gf-sec gf-sec--tight" aria-labelledby="news-h">
      <div className="gf-wrap">
        <Reveal className="gf-news">
          <div>
            <span className="gf-eyebrow">Newsletter</span>
            <h2 className="gf-h gf-h--sm" id="news-h">Gift ideas and offers, <span className="gf-accent">in your inbox</span></h2>
            <p className="gf-sub">Be the first to hear about new arrivals, seasonal collections and coupon codes.</p>
          </div>
          <div>
            <form onSubmit={submit}>
              <input type="email" required maxLength={150} value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your email address" aria-label="Email address" autoComplete="email" />
              <button type="submit" className="gf-btn" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
            <p className={`note ${state === 'ok' ? 'ok' : state === 'err' ? 'err' : ''}`} role="status">
              {state === 'ok' ? 'Thank you! You are on the list.'
                : state === 'err' ? 'Could not sign you up. Please try again.'
                : 'No spam. Unsubscribe any time.'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
