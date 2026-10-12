import { Link, useLocation } from 'react-router-dom'

export default function AdminBottomNav() {
  const { pathname } = useLocation()
  const on = (path) => pathname === path ? 'bn on' : 'bn'

  return (
    <nav className="bnav">
      <Link to="/admin/dashboard"    className={on('/admin/dashboard')}><i className="bi bi-speedometer2" />Dashboard</Link>
      <Link to="/admin/orders"       className={on('/admin/orders')}><i className="bi bi-bag-check" />Orders</Link>
      <Link to="/admin/products"     className={on('/admin/products')}><i className="bi bi-gift" />Products</Link>
      <Link to="/admin/notifications" className={on('/admin/notifications')}><i className="bi bi-bell" />Alerts</Link>
      <Link to="/admin/profile"      className={on('/admin/profile')}><i className="bi bi-person-fill" />Profile</Link>
    </nav>
  )
}
