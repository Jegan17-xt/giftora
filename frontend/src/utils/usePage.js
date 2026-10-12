import { useEffect, useRef, useState } from 'react'
import useVendorLogo, { setPageTitle } from './useVendorLogo'

/** Sets the tab title ("Shop | <company name>") and the meta description for the current page. */
export function usePageMeta(title, description) {
  const { tagline } = useVendorLogo()
  useEffect(() => {
    setPageTitle(title)
    const text = description || tagline
    if (text) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = String(text).replace(/<[^>]*>/g, '').slice(0, 160)
    }
  }, [title, description, tagline])

  // Leaving the page hands the tab title back to the plain company name.
  useEffect(() => () => setPageTitle(''), [])
}

/** Adds the "in" class the first time the element scrolls into view (for the reveal animation). */
export function useReveal() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [seen])
  return [ref, seen]
}
