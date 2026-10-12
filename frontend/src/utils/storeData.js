import { useState, useEffect } from 'react'
import axios from 'axios'
import getClientId from './useClientId'

const WS = import.meta.env.VITE_API_URL

// Storefront data that several components need (header, home, product pages).
// Each endpoint is requested once per page load and shared between them.
const cache = {}

function load(endpoint) {
  if (!cache[endpoint]) {
    cache[endpoint] = axios.post(`${WS}/${endpoint}`, new URLSearchParams(getClientId()))
      .then(r => (r.data.status === 1 ? r.data : null))
      .catch(() => { delete cache[endpoint]; return null })
  }
  return cache[endpoint]
}

function useEndpoint(endpoint) {
  const [data, setData] = useState(undefined)   // undefined = loading, null = failed
  useEffect(() => {
    let live = true
    load(endpoint).then(d => { if (live) setData(d) })
    return () => { live = false }
  }, [endpoint])
  return data
}

/** Home feed: banners, categories, featured, latest products, offers, reviews, blog, stats, store info. */
export const useHome = () => useEndpoint('fetchhome')

/** Every active product plus the category list. */
export const useCatalog = () => useEndpoint('fetchuserproducts')

/** Company contact details, social links, store info (hours, delivery charges). */
export const useContact = () => useEndpoint('fetchcontactinfo')

/** Approved reviews and the product names they can be written for. */
export const useReviews = () => useEndpoint('fetchuserreviews')

/** Forget the cached reviews (after a customer submits one). */
export function refreshReviews() { delete cache.fetchuserreviews }

/** Average rating and review count per product name, built from the approved reviews. */
export function useRatings() {
  const data = useReviews()
  const map = {}
  for (const r of data?.reviews || []) {
    if (!r.product_name) continue
    const m = (map[r.product_name] ||= { sum: 0, count: 0 })
    m.sum += Number(r.rating) || 0
    m.count += 1
  }
  for (const k of Object.keys(map)) map[k].avg = map[k].sum / map[k].count
  return map
}

// ── Occasions ───────────────────────────────────────────────────────────────
// The catalogue has no "occasion" field, so an occasion is a set of words looked
// for in each product's name, description and category. Adding one of these
// words to a product in the admin panel places it in that collection.
export const OCCASIONS = [
  { slug: 'birthday',        label: 'Birthday',         icon: 'bi-cake2',         tint: '#FDE7EF', words: ['birthday', 'balloon', 'party', 'cake', 'surprise'] },
  { slug: 'anniversary',     label: 'Anniversary',      icon: 'bi-heart',         tint: '#FCE8E6', words: ['anniversary', 'rose', 'couple', 'love', 'chocolate'] },
  { slug: 'wedding',         label: 'Wedding',          icon: 'bi-gem',           tint: '#F3EEFC', words: ['wedding', 'hamper', 'frame', 'bouquet', 'flower'] },
  { slug: 'valentines-day',  label: "Valentine's Day",  icon: 'bi-suit-heart',    tint: '#FFE4EC', words: ['valentine', 'rose', 'heart', 'love', 'truffle', 'chocolate'] },
  { slug: 'baby-shower',     label: 'Baby Shower',      icon: 'bi-balloon-heart', tint: '#E6F4FB', words: ['baby', 'shower', 'balloon', 'cushion', 'soft'] },
  { slug: 'congratulations', label: 'Congratulations',  icon: 'bi-trophy',        tint: '#FFF3D6', words: ['congratulation', 'celebration', 'hamper', 'party', 'flower'] },
  { slug: 'thank-you',       label: 'Thank You',        icon: 'bi-flower1',       tint: '#E8F6EC', words: ['thank', 'tea', 'cookies', 'card'] },
  { slug: 'festival',        label: 'Festival Gifts',   icon: 'bi-stars',         tint: '#FFEBDD', words: ['festival', 'festive', 'diwali', 'dry fruit', 'sweet', 'hamper', 'chocolate'] },
]

const haystack = (p) => `${p.product_name} ${p.description || ''} ${p.cat_name || ''}`.toLowerCase()

export function productsForOccasion(products, slug) {
  const occ = OCCASIONS.find(o => o.slug === slug)
  if (!occ) return []
  // Products that name the occasion outright come first.
  const score = (p) => { const h = haystack(p); return occ.words.reduce((n, w, i) => n + (h.includes(w) ? (i === 0 ? 5 : 1) : 0), 0) }
  return products.map(p => [score(p), p]).filter(([s]) => s > 0).sort((a, b) => b[0] - a[0]).map(([, p]) => p)
}

export function searchProducts(products, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return products
  return products.filter(p => { const h = haystack(p) + ' ' + (p.sku || '').toLowerCase(); return words.every(w => h.includes(w)) })
}

/** Products whose category name contains any of the given words (e.g. "card"). */
export function productsInCategoryLike(products, ...words) {
  return products.filter(p => words.some(w => (p.cat_name || '').toLowerCase().includes(w)))
}
