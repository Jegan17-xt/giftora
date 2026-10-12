import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useIsMobile } from './hooks/useIsMobile'
import { getUser } from './utils/adminHelpers'

// Storefront (one responsive design for desktop, tablet and mobile)
import UserHome from './pages/user/Home'
import UserProducts from './pages/user/Products'
import UserProductDetail from './pages/user/ProductDetail'
import UserCart from './pages/user/Cart'
import UserCheckout from './pages/user/Checkout'
import UserOrderSuccess from './pages/user/OrderSuccess'
import UserMyOrders from './pages/user/MyOrders'
import UserWishlist from './pages/user/Wishlist'
import UserAccount from './pages/user/Account'
import UserAbout from './pages/user/About'
import UserReviews from './pages/user/Reviews'
import { UserBlog, UserBlogDetail } from './pages/user/Blog'
import UserContact from './pages/user/Contact'
import UserPolicy from './pages/user/Policy'

// Admin panel: loaded on demand so shoppers never download it.
// Admin — desktop pages
const AdminLoginWb = lazy(() => import('./pages/admin/wb/Login'))
const AdminDashboardWb = lazy(() => import('./pages/admin/wb/Dashboard'))
const AdminOrdersWb = lazy(() => import('./pages/admin/wb/Orders'))
const AdminOrderDetailWb = lazy(() => import('./pages/admin/wb/OrderDetail'))
const AdminCouriersWb = lazy(() => import('./pages/admin/wb/Couriers'))
const AdminCourierRatesWb = lazy(() => import('./pages/admin/wb/CourierRates'))
const AdminTrackingCodesWb = lazy(() => import('./pages/admin/wb/TrackingCodes'))
const AdminCustomersWb = lazy(() => import('./pages/admin/wb/Customers'))
const AdminProductsWb = lazy(() => import('./pages/admin/wb/Products'))
const AdminProductAddWb = lazy(() => import('./pages/admin/wb/ProductAdd'))
const AdminCategoriesWb = lazy(() => import('./pages/admin/wb/Categories'))
const AdminCouponsWb = lazy(() => import('./pages/admin/wb/Coupons'))
const AdminReviewsWb = lazy(() => import('./pages/admin/wb/Reviews'))
const AdminEnquiriesWb = lazy(() => import('./pages/admin/wb/Enquiries'))
const AdminBlogWb = lazy(() => import('./pages/admin/wb/Blog'))
const AdminBlogAddWb = lazy(() => import('./pages/admin/wb/BlogAdd'))
const AdminBusinessInfoWb = lazy(() => import('./pages/admin/wb/BusinessInfo'))
const AdminNotificationsWb = lazy(() => import('./pages/admin/wb/Notifications'))

// Admin — mobile pages
const AdminLoginMb = lazy(() => import('./pages/admin/mb/Login'))
const AdminDashboardMb = lazy(() => import('./pages/admin/mb/Dashboard'))
const AdminOrdersMb = lazy(() => import('./pages/admin/mb/Orders'))
const AdminCustomersMb = lazy(() => import('./pages/admin/mb/Customers'))
const AdminProductsMb = lazy(() => import('./pages/admin/mb/Products'))
const AdminReviewsMb = lazy(() => import('./pages/admin/mb/Reviews'))
const AdminBlogMb = lazy(() => import('./pages/admin/mb/Blog'))
const AdminBusinessInfoMb = lazy(() => import('./pages/admin/mb/BusinessInfo'))
const AdminProfileMb = lazy(() => import('./pages/admin/mb/AdminProfile'))
const AdminNotificationsMb = lazy(() => import('./pages/admin/mb/Notifications'))

// Admin — content & settings
const Companyinfo = lazy(() => import('./pages/cms/Companyinfo'))
const Homebanner = lazy(() => import('./pages/cms/Homebanner'))
const About = lazy(() => import('./pages/cms/About'))
const Termsmain = lazy(() => import('./pages/terms/Termsmain'))
const AppTitle = lazy(() => import('./pages/settings/AppTitle'))
const AppLogo = lazy(() => import('./pages/settings/AppLogo'))
const Them_color = lazy(() => import('./pages/settings/Them_color'))
const Account = lazy(() => import('./pages/settings/Account'))

function Split({ Wb, Mb }) {
  const isMobile = useIsMobile()
  return isMobile ? <Mb /> : <Wb />
}

/** Everything behind this needs a signed-in admin; the API enforces it again on every call. */
function RequireAdmin() {
  const location = useLocation()
  return getUser().token
    ? <Outlet />
    : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
}

export default function App() {
  return (
    <Suspense fallback={<div className="page-loader"><div className="page-spinner" /></div>}>
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="/home" element={<Navigate to="/user" replace />} />

      {/* ── STOREFRONT ──────────────────────────────────────── */}
      <Route path="/user" element={<UserHome />} />
      <Route path="/user/home" element={<UserHome />} />
      <Route path="/user/products" element={<UserProducts />} />
      <Route path="/user/products/:id" element={<UserProductDetail />} />
      <Route path="/user/cart" element={<UserCart />} />
      <Route path="/user/checkout" element={<UserCheckout />} />
      <Route path="/user/order-success" element={<UserOrderSuccess />} />
      <Route path="/user/my-orders" element={<UserMyOrders />} />
      <Route path="/user/wishlist" element={<UserWishlist />} />
      <Route path="/user/profile" element={<UserAccount />} />
      <Route path="/user/login" element={<Navigate to="/user/profile" replace />} />
      <Route path="/user/about" element={<UserAbout />} />
      <Route path="/user/reviews" element={<UserReviews />} />
      <Route path="/user/blog" element={<UserBlog />} />
      <Route path="/user/blog/:id" element={<UserBlogDetail />} />
      <Route path="/user/contact" element={<UserContact />} />
      <Route path="/user/policy/:type" element={<UserPolicy />} />

      {/* ── ADMIN ───────────────────────────────────────────── */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<Split Wb={AdminLoginWb} Mb={AdminLoginMb} />} />

      <Route element={<RequireAdmin />}>
        <Route path="/admin/dashboard" element={<Split Wb={AdminDashboardWb} Mb={AdminDashboardMb} />} />
        <Route path="/admin/orders" element={<Split Wb={AdminOrdersWb} Mb={AdminOrdersMb} />} />
        <Route path="/admin/orders/:oid" element={<AdminOrderDetailWb />} />
        <Route path="/admin/couriers" element={<AdminCouriersWb />} />
        <Route path="/admin/couriers/rates" element={<AdminCourierRatesWb />} />
        <Route path="/admin/couriers/codes" element={<AdminTrackingCodesWb />} />
        <Route path="/admin/customers" element={<Split Wb={AdminCustomersWb} Mb={AdminCustomersMb} />} />
        <Route path="/admin/products/add" element={<AdminProductAddWb />} />
        <Route path="/admin/products/categories" element={<AdminCategoriesWb />} />
        <Route path="/admin/products" element={<Split Wb={AdminProductsWb} Mb={AdminProductsMb} />} />
        <Route path="/admin/offers" element={<AdminCouponsWb />} />
        <Route path="/admin/reviews" element={<Split Wb={AdminReviewsWb} Mb={AdminReviewsMb} />} />
        <Route path="/admin/enquiries" element={<AdminEnquiriesWb />} />
        <Route path="/admin/blog/add" element={<AdminBlogAddWb />} />
        <Route path="/admin/blog" element={<Split Wb={AdminBlogWb} Mb={AdminBlogMb} />} />
        <Route path="/admin/business-info" element={<Split Wb={AdminBusinessInfoWb} Mb={AdminBusinessInfoMb} />} />
        <Route path="/admin/notifications" element={<Split Wb={AdminNotificationsWb} Mb={AdminNotificationsMb} />} />
        <Route path="/admin/profile" element={<Split Wb={Account} Mb={AdminProfileMb} />} />

        {/* Content management */}
        <Route path="/cms/companyinfo" element={<Companyinfo />} />
        <Route path="/cms/homebanner" element={<Homebanner />} />
        <Route path="/cms/about/:aboutid" element={<About />} />
        <Route path="/cms/terms/:termid" element={<Termsmain />} />

        {/* Settings */}
        <Route path="/settings/apptitle" element={<AppTitle />} />
        <Route path="/settings/applogo" element={<AppLogo />} />
        <Route path="/settings/theme-color" element={<Them_color />} />
        <Route path="/settings/account" element={<Account />} />
      </Route>

      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
    </Suspense>
  )
}
