import { useSyncExternalStore } from 'react'

// One small message at the bottom of the screen ("Added to cart", "Code copied"…).
let current = null   // { text, link, linkLabel, id }
let timer = null
const listeners = new Set()
const emit = () => listeners.forEach(fn => fn())

export function showToast(text, link = '', linkLabel = '') {
  current = { text, link, linkLabel, id: Date.now() }
  clearTimeout(timer)
  timer = setTimeout(() => { current = null; emit() }, 2600)
  emit()
}

export function useToast() {
  return useSyncExternalStore(fn => { listeners.add(fn); return () => listeners.delete(fn) }, () => current)
}

export function copyCode(code) {
  const done = () => showToast(`Code ${code} copied. Apply it in your cart.`, '/user/cart', 'Open cart')
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(done, done)
  else done()
  try { sessionStorage.setItem('store_coupon', code) } catch { /* storage unavailable */ }
}
