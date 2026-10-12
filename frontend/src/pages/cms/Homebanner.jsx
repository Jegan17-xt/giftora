import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/admin/wb/Sidebar'
import Topbar from '../../components/admin/wb/Topbar'
import { getUser, useAutoHide } from '../../utils/adminHelpers'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

const MAX_WIDTH  = 1920
const MAX_HEIGHT = 1080

/**
 * Compress an image File using canvas.
 * Resizes to fit within MAX_WIDTH × MAX_HEIGHT, outputs as JPEG at 100% quality.
 * Returns a Promise<File>.
 */
function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img

        // Scale down proportionally if needed
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
          width  = Math.round(width  * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement('canvas')
        canvas.width  = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            const compressed = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressed)
          },
          'image/jpeg',
          1.0   // 100% quality
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export default function Homebanner() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUser()
  const base = { profile_id: user.profile_id, subdomain: user.subdomain, domain: user.domain || '' }

  const [form, setForm]         = useState({ bannertitle: '' })
  const [rawFile, setRawFile]   = useState(null)   // original selected file
  const [preview, setPreview]   = useState(null)   // data-url preview
  const [imgError, setImgError] = useState('')
  const [message, setMessage]   = useState({ text: '', className: '' })
  const [banners, setBanners]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const fileRef = useRef()
  useAutoHide(message, setMessage)

  useEffect(() => { fetchBanners() }, [])

  // Generate preview whenever a file is selected
  useEffect(() => {
    if (!rawFile) { setPreview(null); return }
    const url = URL.createObjectURL(rawFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [rawFile])

  function fetchBanners() {
    axios.post(`${WS}/listhomebanners`, new URLSearchParams(base))
      .then(r => { if (r.data.status === 1) setBanners(r.data.homebanner || []) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!rawFile) { setImgError('Please select a banner image.'); return }
    setImgError('')
    setLoading(true)

    // Compress before upload
    const compressed = await compressImage(rawFile)

    const fd = new FormData()
    Object.entries({ ...base, bannertitle: form.bannertitle }).forEach(([k, v]) => fd.append(k, v))
    fd.append('bannerimg', compressed, compressed.name)

    axios.post(`${WS}/addhomebanner`, fd)
      .then(r => {
        setMessage({
          text:      r.data.message || 'Added',
          className: r.data.status === 1 ? 'text-success' : 'text-danger',
        })
        if (r.data.status === 1) {
          setForm({ bannertitle: '' })
          setRawFile(null)
          setPreview(null)
          if (fileRef.current) fileRef.current.value = ''
          fetchBanners()
        }
      })
      .catch(() => setMessage({ text: 'Upload failed. Please try again.', className: 'text-danger' }))
      .finally(() => setLoading(false))
  }

  function deleteBanner(bid) {
    if (!window.confirm('Delete this banner?')) return
    setDeletingId(bid)
    axios.post(`${WS}/deletehomebanner`, new URLSearchParams({ ...base, bid }))
      .then(r => { if (r.data.status === 1) fetchBanners() })
      .finally(() => setDeletingId(null))
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setRawFile(file)
    setImgError('')
  }

  return (
    <div className="admin-wrap">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Topbar title="Home Banner" onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">

          {/* Breadcrumb */}
          <div className="page-header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><Link to="/admin/dashboard">Home</Link></li>
                <li className="breadcrumb-item">CMS</li>
                <li className="breadcrumb-item active">Home Banner</li>
              </ol>
            </nav>
            <h2>Home Banner</h2>
          </div>

          {/* Add Banner */}
          <div className="card mb-4">
            <div className="card-header fw-bold">Add Banner</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Banner Title</label>
                    <input
                      className="form-control form-control-sm"
                      value={form.bannertitle}
                      onChange={e => setForm(p => ({ ...p, bannertitle: e.target.value }))}
                      placeholder="Optional title"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Banner Image <span className="text-muted">(jpg / jpeg / png, about 1600×560)</span>
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      className="form-control form-control-sm"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    {imgError && <small className="text-danger">{imgError}</small>}
                    <small className="text-muted d-block mt-1">
                      Images are automatically compressed to max 1920×1080px before upload.
                    </small>
                  </div>
                </div>

                {/* Preview */}
                {preview && (
                  <div className="mb-3">
                    <label className="form-label">Preview</label>
                    <div>
                      <img
                        src={preview}
                        alt="preview"
                        style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 6, border: '1px solid #dee2e6' }}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-1" />Uploading…</>
                    : 'Add Banner'}
                </button>

                {message.text && (
                  <p className={`mt-2 fs_12 ${message.className}`}>{message.text}</p>
                )}
              </form>
            </div>
          </div>

          {/* Banner List */}
          <div className="card">
            <div className="card-header fw-bold">
              Banners List
              <span className="badge bg-secondary ms-2">{banners.length}</span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>S.No.</th>
                      <th>Order</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-3">
                          No banners found.
                        </td>
                      </tr>
                    )}
                    {banners.map((b, i) => (
                      <tr key={b.bid}>
                        <td>{i + 1}</td>
                        <td>{b.banner_order}</td>
                        <td>{b.banner_title || <span className="text-muted">—</span>}</td>
                        <td>
                          {b.banner_img
                            ? <img
                                src={`${IMG}homeBanners/${b.banner_img}`}
                                alt={b.banner_title}
                                style={{ height: 50, objectFit: 'cover', borderRadius: 4 }}
                              />
                            : <span className="text-muted">No image</span>}
                        </td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={deletingId === b.bid}
                            onClick={() => deleteBanner(b.bid)}
                          >
                            {deletingId === b.bid
                              ? <span className="spinner-border spinner-border-sm" />
                              : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
