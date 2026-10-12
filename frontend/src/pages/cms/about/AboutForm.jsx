import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { getUser, useAutoHide } from '../../../utils/adminHelpers'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

const slugToDb = {
  companyoverview: 'comp',
  whychooseus:     'whyus',
}

export default function AboutForm({ slug, title, useQuillForShort = false }) {
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain || '' }
  const dbSlug = slugToDb[slug] || slug

  const [formData, setFormData]       = useState({ shortdesc: '', desc: '' })
  const [imgFile,  setImgFile]        = useState(null)
  const [preview,  setPreview]        = useState(null)
  const [existingImg, setExistingImg] = useState('')
  const [message, setMessage]         = useState({ text: '', className: '' })
  const [loading,  setLoading]        = useState(true)
  const [saving,   setSaving]         = useState(false)
  const fileRef = useRef()
  useAutoHide(message, setMessage)

  useEffect(() => {
    setLoading(true)
    setFormData({ shortdesc: '', desc: '' })
    setExistingImg('')
    setPreview(null)
    setImgFile(null)
    axios.post(`${WS}/fetchaboutus`, new URLSearchParams(base))
      .then(r => {
        if (r.data.status === 1 && r.data.aboutus?.length) {
          const a = r.data.aboutus[0]
          setFormData({
            shortdesc: a[`${dbSlug}_sdesc`] || '',
            desc:      a[`${dbSlug}_desc`]  || '',
          })
          setExistingImg(a[`${dbSlug}_img`] || '')
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  // Preview for newly selected file
  useEffect(() => {
    if (!imgFile) { setPreview(null); return }
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imgFile])

  function submit(e) {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData()
    Object.entries({ ...base, slug, shortdesc: formData.shortdesc, desc: formData.desc })
      .forEach(([k, v]) => fd.append(k, v))
    if (imgFile) fd.append('aboutimg', imgFile)
    axios.post(`${WS}/update_about`, fd)
      .then(r => {
        setMessage({ text: r.data.message || 'Updated', className: r.data.status === 1 ? 'text-success' : 'text-danger' })
        if (r.data.status === 1 && r.data.img) {
          setExistingImg(r.data.img)
          setImgFile(null)
          setPreview(null)
          if (fileRef.current) fileRef.current.value = ''
        }
      })
      .catch(() => setMessage({ text: 'Save failed. Please try again.', className: 'text-danger' }))
      .finally(() => setSaving(false))
  }

  function deleteImg() {
    if (!window.confirm('Delete this image?')) return
    axios.post(`${WS}/deletaboutimg`, new URLSearchParams({ ...base, slug }))
      .then(r => { if (r.data.status === 1) setExistingImg('') })
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header fw-bold">{title}</div>
        <div className="card-body text-center py-4">
          <span className="spinner-border spinner-border-sm me-2" />Loading…
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header fw-bold">{title}</div>
      <div className="card-body">
        <form onSubmit={submit}>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control form-control-sm" value={title} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Banner Image</label>
            {existingImg ? (
              <div>
                <img
                  src={`${IMG}aboutUs/${existingImg}`}
                  alt="banner"
                  style={{ maxHeight: 120, display: 'block', marginBottom: 8, borderRadius: 4, border: '1px solid #dee2e6' }}
                />
                <button type="button" className="btn btn-danger btn-sm" onClick={deleteImg}>
                  <i className="bi bi-trash me-1" />Delete Image
                </button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  className="form-control form-control-sm"
                  accept=".jpg,.jpeg,.png"
                  onChange={e => setImgFile(e.target.files[0] || null)}
                />
                <small className="text-muted">JPG / JPEG / PNG only</small>
                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="preview"
                      style={{ maxHeight: 120, borderRadius: 4, border: '1px solid #dee2e6' }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Short Description</label>
            {useQuillForShort ? (
              <ReactQuill
                value={formData.shortdesc}
                onChange={v => setFormData(p => ({ ...p, shortdesc: v }))}
                style={{ height: 80, marginBottom: 42 }}
              />
            ) : (
              <textarea
                className="form-control form-control-sm"
                style={{ height: 70 }}
                value={formData.shortdesc}
                onChange={e => setFormData(p => ({ ...p, shortdesc: e.target.value }))}
              />
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <ReactQuill
              value={formData.desc}
              onChange={v => setFormData(p => ({ ...p, desc: v }))}
              style={{ height: 250, marginBottom: 42 }}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
              {saving
                ? <><span className="spinner-border spinner-border-sm me-1" />Saving…</>
                : <><i className="bi bi-save me-1" />UPDATE</>}
            </button>
          </div>

          {message.text && (
            <p className={`mt-2 mb-0 small ${message.className}`}>{message.text}</p>
          )}
        </form>
      </div>
    </div>
  )
}
