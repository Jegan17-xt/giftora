import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Shell from '../../components/user/Shell'
import getClientId from '../../utils/useClientId'
import { fmtDate } from '../../utils/format'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL

export function UserBlog() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios.post(`${WS}/fetchuserblog`, new URLSearchParams(getClientId()))
      .then(r => setPosts(r.data.status === 1 ? r.data.posts || [] : []))
      .catch(() => setPosts([]))
  }, [])

  return (
    <Shell title="Blog">
      <div className="gf-wrap">
        <header className="gf-pagehead">
          <span className="gf-eyebrow">Gift ideas</span>
          <h1>The <span className="gf-accent">Journal</span></h1>
          <p>Gifting tips, ideas and stories for every occasion.</p>
        </header>
        <section className="shop-page">
          {posts === null ? <div className="gf-spin" /> : posts.length === 0 ? (
            <div className="shop-empty"><i className="bi bi-journal-text" /><h2>No articles yet</h2><p>Check back soon.</p></div>
          ) : (
            <div className="gf-posts">
              {posts.map(p => (
                <Link key={p.bid} to={`/user/blog/${p.bid}`} className="gf-post">
                  <div className="gf-post-img">
                    {p.blog_img ? <img src={`${IMG}blog/${p.blog_img}`} alt={p.title} loading="lazy" decoding="async" /> : <i className="bi bi-journal-text" />}
                  </div>
                  <div className="gf-post-body">
                    {p.tag && <span className="gf-tag">{p.tag}</span>}
                    <h2 style={{ fontSize: '1.15rem', lineHeight: 1.3 }}>{p.title}</h2>
                    <p>{p.description}</p>
                    <span style={{ marginTop: 'auto', fontSize: '0.78rem', color: 'var(--ink-3)' }}>{fmtDate(p.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </Shell>
  )
}

export function UserBlogDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(undefined)   // undefined = loading, null = not found

  useEffect(() => {
    setPost(undefined)
    axios.post(`${WS}/fetchblogdetail`, new URLSearchParams({ ...getClientId(), bid: id }))
      .then(r => setPost(r.data.post?.[0] || null))
      .catch(() => setPost(null))
  }, [id])

  return (
    <Shell title={post?.title || 'Blog'} description={post?.description}>
      <div className="gf-wrap">
        {post === undefined ? <div className="gf-spin" style={{ minHeight: '50vh', alignItems: 'center' }} /> : post === null ? (
          <div className="shop-empty" style={{ minHeight: '50vh', justifyContent: 'center' }}>
            <i className="bi bi-journal-x" /><h2>Article not found</h2>
            <Link to="/user/blog" className="gf-btn mt-2">Back to the blog</Link>
          </div>
        ) : (
          <article className="gf-article gf-sec--tight" style={{ paddingTop: 32, paddingBottom: 32 }}>
            <nav className="gf-crumbs" aria-label="Breadcrumb"><Link to="/user">Home</Link><span>/</span><Link to="/user/blog">Blog</Link></nav>
            {post.tag && <span className="gf-tag">{post.tag}</span>}
            <h1 className="gf-h" style={{ marginTop: 12 }}>{post.title}</h1>
            <p style={{ color: 'var(--ink-3)', fontSize: '0.85rem', marginTop: 10 }}>{fmtDate(post.created_at)}</p>
            {post.blog_img && <div className="gf-article-cover"><img src={`${IMG}blog/${post.blog_img}`} alt={post.title} /></div>}
            {post.description && <p className="gf-prose" style={{ fontSize: '1.15rem', color: 'var(--ink)', marginBottom: 18 }}>{post.description}</p>}
            {/* Written by the store admin in the blog editor */}
            <div className="gf-prose" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

            <div className="gf-promo" style={{ marginTop: 40, padding: 32 }}>
              <div><h2 style={{ fontSize: '1.5rem' }}>Found the perfect idea?</h2><p>Browse our gifts and send one today.</p></div>
              <Link to="/user/products" className="gf-btn gf-btn--light">Shop gifts <i className="bi bi-arrow-right" /></Link>
            </div>
          </article>
        )}
      </div>
    </Shell>
  )
}
