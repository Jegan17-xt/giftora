import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const WS = import.meta.env.VITE_API_URL

/** Sign-in form state for the admin login pages (desktop and mobile). */
export default function useAdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${WS}/adminlogin`, new URLSearchParams({ email, password }))
      if (res.data.status === 1) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate(location.state?.from || '/admin/dashboard', { replace: true })
      } else {
        setError(res.data.message || 'Invalid email or password. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, password, setPassword, loading, error, submit }
}
