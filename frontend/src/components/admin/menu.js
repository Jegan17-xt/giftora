import axios from 'axios'

const WS = import.meta.env.VITE_API_URL

/** Admin navigation, shared by the desktop sidebar and the mobile drawer. */
export const ADMIN_MENU = [
  {
    label: 'Store',
    items: [
      { to: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
      { to: '/admin/orders',    icon: 'bi-bag-check',    label: 'Orders', prefix: '/admin/orders' },
      {
        key: 'couriers', icon: 'bi-truck', label: 'Couriers', prefix: '/admin/couriers',
        children: [
          { to: '/admin/couriers',       icon: 'bi-truck',      label: 'All Couriers' },
          { to: '/admin/couriers/rates', icon: 'bi-cash-stack', label: 'Delivery Rates' },
          { to: '/admin/couriers/codes', icon: 'bi-upc-scan',   label: 'Tracking Codes' },
        ],
      },
      {
        key: 'products', icon: 'bi-gift', label: 'Products', prefix: '/admin/products',
        children: [
          { to: '/admin/products/add',        icon: 'bi-plus-circle', label: 'Add Product' },
          { to: '/admin/products',            icon: 'bi-list-ul',     label: 'All Products' },
          { to: '/admin/products/categories', icon: 'bi-tags',        label: 'Categories' },
        ],
      },
      { to: '/admin/offers',    icon: 'bi-percent',  label: 'Offers & Coupons' },
      { to: '/admin/customers', icon: 'bi-people',   label: 'Customers' },
      { to: '/admin/reviews',   icon: 'bi-star',     label: 'Reviews' },
      { to: '/admin/enquiries', icon: 'bi-envelope', label: 'Enquiries' },
      {
        key: 'blog', icon: 'bi-newspaper', label: 'Blog', prefix: '/admin/blog',
        children: [
          { to: '/admin/blog/add', icon: 'bi-pencil-square', label: 'Write Post' },
          { to: '/admin/blog',     icon: 'bi-list-ul',       label: 'All Posts' },
        ],
      },
      { to: '/admin/notifications', icon: 'bi-bell', label: 'Notifications' },
    ],
  },
  {
    label: 'Website Content',
    items: [
      { to: '/cms/companyinfo',      icon: 'bi-buildings',         label: 'Company & Contact' },
      { to: '/admin/business-info',  icon: 'bi-shop',              label: 'Store Info & Delivery' },
      { to: '/cms/homebanner',       icon: 'bi-image',             label: 'Home Banners' },
      { to: '/cms/about/aboutus',    icon: 'bi-info-circle',       label: 'About Pages',    prefix: '/cms/about' },
      { to: '/cms/terms/conditions', icon: 'bi-file-earmark-text', label: 'Terms & Policy', prefix: '/cms/terms' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { to: '/settings/apptitle',    icon: 'bi-type',        label: 'Company Name' },
      { to: '/settings/applogo',     icon: 'bi-image-fill',  label: 'Logo & Favicon' },
      { to: '/settings/theme-color', icon: 'bi-palette',     label: 'Theme Color' },
      { to: '/settings/account',     icon: 'bi-person-gear', label: 'My Account' },
    ],
  },
]

/** Key of the submenu that contains the current page, if any. */
export function openMenuFor(pathname) {
  for (const section of ADMIN_MENU) {
    for (const item of section.items) {
      if (item.children && pathname.startsWith(item.prefix)) return item.key
    }
  }
  return null
}

export function adminLogout(navigate) {
  // Revoke the token server-side; sign out locally whatever the outcome.
  axios.post(`${WS}/adminlogout`).catch(() => {}).finally(() => {
    localStorage.removeItem('user')
    navigate('/admin/login')
  })
}
