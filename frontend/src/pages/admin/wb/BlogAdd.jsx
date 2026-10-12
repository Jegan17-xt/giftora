import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS = import.meta.env.VITE_API_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

const BLANK = { title: '', tag: '', description: '', content: '' }

export default function AdminBlogAddWb() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm]   = useState(BLANK)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]     = useState(null)
  const fileRef = useRef()

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function field(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 3500)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return flash('Title is required', false)
    setSaving(true)
    const fd = new FormData()
    Object.entries(params).forEach(([k, v]) => fd.append(k, v))
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (fileRef.current?.files[0]) fd.append('blog_img', fileRef.current.files[0])
    try {
      const r = await axios.post(`${WS}/addblogpost`, fd)
      if (r.data.status === 1) {
        flash('Post published successfully!')
        setForm(BLANK)
        if (fileRef.current) fileRef.current.value = ''
        setTimeout(() => navigate('/admin/blog'), 1200)
      } else {
        flash(r.data.message || 'Failed to publish', false)
      }
    } finally { setSaving(false) }
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Post Blog" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header">
            <div>
              <h2>Post Blog</h2>
              <p>Write and publish a new blog article</p>
            </div>
          </div>

          {msg && (
            <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>
              {msg.text}
            </div>
          )}

          <div className="admin-card">
            <div className="admin-card-header">
              <i className="bi bi-pencil-square me-2" />New Blog Post
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">

                  {/* Title */}
                  <div className="col-12">
                    <label className="form-label-admin">
                      Title <span style={{ color: 'var(--danger,#EF4444)' }}>*</span>
                    </label>
                    <input
                      className="form-control-admin"
                      name="title"
                      value={form.title}
                      onChange={field}
                      placeholder="Enter blog post title"
                    />
                  </div>

                  {/* Tag + Image side by side */}
                  <div className="col-md-6">
                    <label className="form-label-admin">Tag / Category</label>
                    <input
                      className="form-control-admin"
                      name="tag"
                      value={form.tag}
                      onChange={field}
                      placeholder="e.g. Hair Care, Skincare, Bridal"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-admin">Cover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control-admin"
                      ref={fileRef}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
                      Recommended: 800×450px, JPG or PNG
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="col-12">
                    <label className="form-label-admin">Short Description</label>
                    <textarea
                      className="form-control-admin"
                      name="description"
                      value={form.description}
                      onChange={field}
                      rows={3}
                      placeholder="Brief summary shown in the blog listing (2–3 sentences)"
                    />
                  </div>

                  {/* Full Content */}
                  <div className="col-12">
                    <label className="form-label-admin">Full Content</label>
                    <textarea
                      className="form-control-admin"
                      name="content"
                      value={form.content}
                      onChange={field}
                      rows={10}
                      placeholder="Write the full article here. HTML tags are supported."
                      style={{ minHeight: '220px' }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="col-12 d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn-admin-outline"
                      onClick={() => navigate('/admin/blog')}
                    >
                      <i className="bi bi-arrow-left me-1" /> Back to List
                    </button>
                    <button className="btn-admin-primary" type="submit" disabled={saving}>
                      {saving
                        ? <><span className="spinner-border spinner-border-sm me-2" />Publishing…</>
                        : <><i className="bi bi-cloud-upload me-1" />Publish Post</>}
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
