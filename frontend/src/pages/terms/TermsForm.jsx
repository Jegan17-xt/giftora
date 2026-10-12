import { useState, useEffect } from 'react'
import axios from 'axios'
import { getUser, useAutoHide } from '../../utils/adminHelpers'

const WS = import.meta.env.VITE_API_URL

export default function TermsForm({ slug, title }) {
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain }

  const [form, setForm] = useState({ title: '', description: '' })
  const [message, setMessage] = useState({ text: '', className: '' })
  useAutoHide(message, setMessage)

  useEffect(() => {
    axios.post(`${WS}/fetchterms`, new URLSearchParams({ ...base, termtype: slug })).then(r => {
      if (r.data.status === 1 && r.data.terms?.length) {
        const t = r.data.terms[0]
        setForm({ title: t.terms_title || '', description: t.terms_desc || '' })
      }
    })
  }, [slug])

  function submit(e) {
    e.preventDefault()
    const fd = new FormData()
    Object.entries({ ...base, termtype: slug, ...form }).forEach(([k, v]) => fd.append(k, v))
    axios.post(`${WS}/updateterms`, fd).then(r => {
      setMessage({ text: r.data.message || 'Updated', className: r.data.status === 1 ? 'text-success' : 'text-danger' })
    })
  }

  return (
    <div className="card">
      <div className="card-header fw-bold">{title}</div>
      <div className="card-body">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control form-control-sm"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control form-control-sm"
              rows={8}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            <i className="bi bi-save me-1" />Update
          </button>
          {message.text && (
            <p className={`mt-2 mb-0 small ${message.className}`}>{message.text}</p>
          )}
        </form>
      </div>
    </div>
  )
}
