import { useEffect } from 'react'

export function getUser() {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

export function useAutoHide(message, setMessage) {
  useEffect(() => {
    if (message.text) {
      const t = setTimeout(() => setMessage({ text: '', className: '' }), 3000)
      return () => clearTimeout(t)
    }
  }, [message])
}

export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '')
}
