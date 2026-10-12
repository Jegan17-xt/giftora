import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../../components/admin/wb/Sidebar'
import Topbar from '../../../components/admin/wb/Topbar'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminBlogWb() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [posts, setPosts]             = useState([])
  const [editPost, setEditPost]       = useState(null)
  const [showModal, setShowModal]     = useState(false)
  const [saving, setSaving]           = useState(false)
  const [msg, setMsg]                 = useState(null)
  const editFileRef = useRef()

  const user   = getUser()
  const params = { profile_id: user.profile_id, subdomain: user.subdomain || '', domain: user.domain || '' }

  function load() {
    axios.post(`${WS}/fetchblogposts`, new URLSearchParams(params))
      .then(r => { if (r.data.status === 1) setPosts(r.data.posts || []) })
  }

  useEffect(() => { load() }, [])

  function flash(text, ok = true) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 3500)
  }

  function openEdit(p) {
    setEditPost({ bid: p.bid, title: p.title || '', tag: p.tag || '', description: p.description || '', content: p.content || '', blog_img: p.blog_img })
    setShowModal(true)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    if (!editPost.title.trim()) return flash('Title is required', false)
    setSaving(true)
    const fd = new FormData()
    Object.entries(params).forEach(([k, v]) => fd.append(k, v))
    fd.append('bid', editPost.bid)
    fd.append('title', editPost.title)
    fd.append('tag', editPost.tag)
    fd.append('description', editPost.description)
    fd.append('content', editPost.content)
    if (editFileRef.current?.files[0]) fd.append('blog_img', editFileRef.current.files[0])
    try {
      const r = await axios.post(`${WS}/updateblogpost`, fd)
      if (r.data.status === 1) {
        flash('Post updated')
        setShowModal(false)
        load()
      } else flash(r.data.message || 'Failed', false)
    } finally { setSaving(false) }
  }

  async function handleDelete(bid) {
    if (!window.confirm('Delete this post?')) return
    const r = await axios.post(`${WS}/deleteblogpost`, new URLSearchParams({ ...params, bid }))
    if (r.data.status === 1) { flash('Deleted'); load() }
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Blog Posts" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h2>List Blogs</h2>
              <p>Manage your published blog articles</p>
            </div>
            <Link to="/admin/blog/add" className="btn-admin-primary">
              <i className="bi bi-pencil-square me-1" /> Post Blog
            </Link>
          </div>

          {msg && (
            <div className={`alert ${msg.ok ? 'alert-success' : 'alert-danger'} py-2 mb-3`}>
              {msg.text}
            </div>
          )}

          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-newspaper" />
                <span>Blog Posts</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 400 }}>
                  ({posts.length} post{posts.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
            <div className="admin-card-body p-0">
              {posts.length === 0 ? (
                <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                  <i className="bi bi-newspaper" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem', opacity: 0.4 }} />
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No blog posts yet</div>
                  <Link to="/admin/blog/add" className="btn-admin-primary" style={{ display: 'inline-flex' }}>
                    <i className="bi bi-plus-lg me-1" /> Write First Post
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th style={{ width: 50 }}>#</th>
                        <th style={{ width: 72 }}>Image</th>
                        <th>Title</th>
                        <th style={{ width: 110 }}>Tag</th>
                        <th style={{ width: 120 }}>Date</th>
                        <th style={{ width: 100 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((p, i) => (
                        <tr key={p.bid}>
                          <td>{i + 1}</td>
                          <td>
                            {p.blog_img
                              ? <img src={`${IMG}blog/${p.blog_img}`} alt="" style={{ width: 58, height: 38, objectFit: 'cover', borderRadius: 6 }} />
                              : <div style={{ width: 58, height: 38, background: 'var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <i className="bi bi-newspaper" style={{ color: 'var(--text-light)', fontSize: '14px' }} />
                                </div>
                            }
                          </td>
                          <td>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{p.title}</div>
                            {p.description && (
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', marginTop: '2px', lineHeight: 1.4 }}>
                                {p.description.length > 90 ? p.description.slice(0, 90) + '…' : p.description}
                              </div>
                            )}
                          </td>
                          <td>
                            {p.tag
                              ? <span style={{ background: 'rgba(var(--primary-rgb),0.1)', color: 'var(--primary)', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '99px' }}>{p.tag}</span>
                              : <span style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.78rem' }}>—</span>
                            }
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-mid)', whiteSpace: 'nowrap' }}>{fmtDate(p.created_at)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <button className="btn-admin-outline btn-admin-sm" title="Edit" onClick={() => openEdit(p)}>
                                <i className="bi bi-pencil" />
                              </button>
                              <button className="btn-admin-danger btn-admin-sm" title="Delete" onClick={() => handleDelete(p.bid)}>
                                <i className="bi bi-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── EDIT MODAL ── */}
      {showModal && editPost && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.45)' }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid var(--border)', padding: '1rem 1.25rem' }}>
                <h5 className="modal-title" style={{ fontFamily: 'Nunito,sans-serif', fontWeight: 800, fontSize: '1rem' }}>
                  <i className="bi bi-pencil me-2" style={{ color: 'var(--primary)' }} />Edit Blog Post
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body" style={{ padding: '1.5rem' }}>
                <form id="editBlogForm" onSubmit={handleUpdate}>
                  <div className="row g-4">
                    <div className="col-12">
                      <label className="form-label-admin">Title <span style={{ color: 'var(--danger,#EF4444)' }}>*</span></label>
                      <input
                        className="form-control-admin"
                        value={editPost.title}
                        onChange={e => setEditPost(p => ({ ...p, title: e.target.value }))}
                        placeholder="Post title"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-admin">Tag / Category</label>
                      <input
                        className="form-control-admin"
                        value={editPost.tag}
                        onChange={e => setEditPost(p => ({ ...p, tag: e.target.value }))}
                        placeholder="e.g. Hair Care"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-admin">Replace Cover Image</label>
                      <input type="file" accept="image/*" className="form-control-admin" ref={editFileRef} />
                      {editPost.blog_img && (
                        <div style={{ marginTop: '6px' }}>
                          <img src={`${IMG}blog/${editPost.blog_img}`} alt="" style={{ height: 44, borderRadius: 6, border: '2px solid var(--border)' }} />
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginLeft: '8px' }}>Current image</span>
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label-admin">Short Description</label>
                      <textarea
                        className="form-control-admin"
                        value={editPost.description}
                        onChange={e => setEditPost(p => ({ ...p, description: e.target.value }))}
                        rows={3}
                        placeholder="Brief summary for the blog listing"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label-admin">Full Content</label>
                      <textarea
                        className="form-control-admin"
                        value={editPost.content}
                        onChange={e => setEditPost(p => ({ ...p, content: e.target.value }))}
                        rows={8}
                        style={{ minHeight: '180px' }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '0.85rem 1.25rem', gap: '0.5rem' }}>
                <button className="btn-admin-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-admin-primary" form="editBlogForm" type="submit" disabled={saving}>
                  {saving
                    ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                    : <><i className="bi bi-check-lg me-1" />Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
