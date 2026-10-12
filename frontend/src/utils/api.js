import axios from 'axios'
import basePath from './basePath'

export const API = import.meta.env.VITE_API_URL
export const IMG = import.meta.env.VITE_IMG_URL

// Attach the admin session token to every API call made while an admin is signed in.
axios.interceptors.request.use(cfg => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.token && cfg.url?.startsWith(API)) cfg.headers.Authorization = `Bearer ${user.token}`
  } catch { /* ignore a corrupt session */ }
  return cfg
})

// An expired or revoked admin session sends the admin back to the login page.
axios.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401 && localStorage.getItem('user')) {
      localStorage.removeItem('user')
      if (!window.location.pathname.endsWith('/admin/login')) {
        window.location.assign(`${basePath}/admin/login`)
      }
    }
    return Promise.reject(err)
  }
)
