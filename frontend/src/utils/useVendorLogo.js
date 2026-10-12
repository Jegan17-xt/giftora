import { useState, useEffect } from 'react'
import axios from 'axios'
import { applyTheme, loadSavedTheme } from './applyTheme'

const WS  = import.meta.env.VITE_API_URL
const IMG = import.meta.env.VITE_IMG_URL
const CACHE_KEY = 'store_branding'

// Branding (company name, logo, favicon, theme) is owned by the database.
// The last known values are cached only to avoid a flash on reload; every page
// load fetches the current values again, so admin changes show up everywhere.

function readCache() {
  try { return JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null') } catch { return null }
}

let state = readCache() || { logoImg: '', favImg: '', appTitle: '', tagline: '', profileId: '', storeKey: '', ready: false }
let request = null
const listeners = new Set()

function setFavicon(file) {
  let link = document.querySelector('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = file ? `${IMG}fevicon/${file}` : 'data:,'
}

let pageTitle = ''

function applyToDocument() {
  if (state.appTitle) document.title = pageTitle ? `${pageTitle} | ${state.appTitle}` : state.appTitle
  setFavicon(state.favImg)
}

/** Name of the page being shown; the tab title becomes "<page> | <company name>". */
export function setPageTitle(title) {
  pageTitle = title || ''
  applyToDocument()
}

function publish(next) {
  state = { ...state, ...next, ready: true }
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  applyToDocument()
  listeners.forEach(fn => fn(state))
}

export function getBranding() {
  return state
}

/** Fetch the current branding from the server. Admin pages call this after saving a change. */
export function refreshBranding() {
  request = axios.post(`${WS}/fetchapplogo_open`, new URLSearchParams({ hostname: window.location.hostname }))
    .then(r => {
      if (r.data.status !== 1) { publish({}); return }
      if (r.data.theme_color) applyTheme(r.data.theme_color)
      publish({
        logoImg:   r.data.logo?.logo_img || '',
        favImg:    r.data.logo?.fev_img || '',
        appTitle:  r.data.app_title || '',
        tagline:   r.data.tagline || '',
        profileId: r.data.profile_id || '',
        storeKey:  r.data.subdomain || '',
      })
    })
    .catch(() => publish({}))
  return request
}

export default function useVendorLogo() {
  const [snap, setSnap] = useState(state)

  useEffect(() => {
    listeners.add(setSnap)
    setSnap(state)
    if (!request) {
      loadSavedTheme()
      applyToDocument()
      refreshBranding()
    }
    return () => { listeners.delete(setSnap) }
  }, [])

  return {
    logoImg:     snap.logoImg,
    favImg:      snap.favImg,
    appTitle:    snap.appTitle,
    tagline:     snap.tagline,
    storeKey:    snap.storeKey,
    vendorReady: snap.ready,
  }
}
