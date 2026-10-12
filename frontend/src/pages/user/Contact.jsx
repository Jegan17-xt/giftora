import { useState } from 'react'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import { useContact } from '../../utils/storeData'

const WS = import.meta.env.VITE_API_URL
const BLANK = { cname: '', cmobile: '', cemail: '', subject: '', message: '' }

export default function UserContact() {
  const data = useContact()
  const [form, setForm]     = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]       = useState(null)
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const ci   = data?.contactinfo || {}
  const info = data?.info || {}
  const address = [ci.house_no, ci.area, ci.city, ci.state, ci.pincode].filter(Boolean).join(', ')
  const hours   = info.open_time && info.close_time ? `${info.open_time} – ${info.close_time}` : ''
  const items = [
    address && { icon: 'bi-geo-alt', label: 'Address', value: address },
    ci.phone_one && { icon: 'bi-telephone', label: 'Phone', value: [ci.phone_one, ci.phone_two].filter(Boolean).join(' · '), href: `tel:${ci.phone_one.replace(/\s/g, '')}` },
    ci.email_one && { icon: 'bi-envelope', label: 'Email', value: [ci.email_one, ci.email_two].filter(Boolean).join(' · '), href: `mailto:${ci.email_one}` },
    hours && { icon: 'bi-clock', label: 'Hours', value: hours },
  ].filter(Boolean)

  function submit(e) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    axios.post(`${WS}/addcontactenquiry`, new URLSearchParams({ ...getClientId(), ...form }))
      .then(r => {
        if (r.data.status === 1) { setMsg({ ok: true, text: 'Message sent. We will get back to you soon.' }); setForm(BLANK) }
        else setMsg({ ok: false, text: r.data.message || 'Could not send your message.' })
      })
      .catch(() => setMsg({ ok: false, text: 'Network error. Please try again.' }))
      .finally(() => setSaving(false))
  }

  return (
    <Shell title="Contact">
      <div className="gf-wrap">
        <header className="gf-pagehead">
          <span className="gf-eyebrow">Get in touch</span>
          <h1>Contact <span className="gf-accent">us</span></h1>
          <p>Questions about an order or a custom gift? Send us a message.</p>
        </header>

        <section className="shop-page">
          <div className="gf-contact">
            <div className="gf-contact-list">
              {items.map(it => (
                <div key={it.label} className="gf-contact-item">
                  <i className={`bi ${it.icon}`} />
                  <span><b>{it.label}</b>{it.href ? <a href={it.href}>{it.value}</a> : it.value}</span>
                </div>
              ))}
            </div>

            <form className="shop-panel" onSubmit={submit}>
              <h5><i className="bi bi-send" />Send a message</h5>
              <div className="row g-3">
                <div className="col-sm-6 shop-field">
                  <label htmlFor="ct-name">Your Name *</label>
                  <input id="ct-name" className="form-control" required maxLength={200} autoComplete="name" value={form.cname} onChange={set('cname')} />
                </div>
                <div className="col-sm-6 shop-field">
                  <label htmlFor="ct-ph">Phone</label>
                  <input id="ct-ph" type="tel" className="form-control" maxLength={20} autoComplete="tel" value={form.cmobile} onChange={set('cmobile')} />
                </div>
                <div className="col-sm-6 shop-field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" type="email" className="form-control" maxLength={150} autoComplete="email" value={form.cemail} onChange={set('cemail')} />
                </div>
                <div className="col-sm-6 shop-field">
                  <label htmlFor="ct-subject">Subject</label>
                  <input id="ct-subject" className="form-control" maxLength={300} value={form.subject} onChange={set('subject')} />
                </div>
                <div className="col-12 shop-field">
                  <label htmlFor="ct-msg">Message *</label>
                  <textarea id="ct-msg" className="form-control" rows={5} required maxLength={3000} value={form.message} onChange={set('message')} />
                </div>
              </div>
              {msg && <div className={`gf-alert ${msg.ok ? 'ok' : 'err'} mt-3`} role="status">{msg.text}</div>}
              <button type="submit" className="gf-btn mt-3" disabled={saving}>{saving ? 'Sending…' : <>Send message <i className="bi bi-arrow-right" /></>}</button>
            </form>
          </div>
        </section>
      </div>
    </Shell>
  )
}
