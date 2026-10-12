import { useSyncExternalStore } from 'react'

// The wishlist lives in the shopper's browser (no account is needed to use it).
const KEY = 'store_wishlist'
const listeners = new Set()

function read() {
  try {
    const items = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(items) ? items : []
  } catch { return [] }
}

let items = read()

function save(next) {
  items = next
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ }
  listeners.forEach(fn => fn())
}

window.addEventListener('storage', e => {
  if (e.key === KEY) { items = read(); listeners.forEach(fn => fn()) }
})

export function toggleWishlist(pid) {
  save(items.includes(pid) ? items.filter(p => p !== pid) : [...items, pid])
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useWishlist() {
  const list = useSyncExternalStore(subscribe, () => items)
  return { pids: list, count: list.length, has: (pid) => list.includes(pid) }
}
