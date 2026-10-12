export function money(value) {
  const n = Number(value) || 0
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })
}

export function fmtDate(value) {
  if (!value) return ''
  const d = new Date(String(value).replace(' ', 'T'))
  return isNaN(d) ? String(value) : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Whole-number percentage saved against the MRP (0 when there is no saving). */
export function discountPct(mrp, price) {
  const m = Number(mrp), p = Number(price)
  return m > p && m > 0 ? Math.round(((m - p) / m) * 100) : 0
}

export const ORDER_STATUSES = ['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled']

export const ORDER_STATUS = {
  pending:   { label: 'Pending',   cls: 'bs-pending',   mb: 'bdg-wait', color: '#F59E0B' },
  confirmed: { label: 'Confirmed', cls: 'bs-confirmed', mb: 'bdg-ok',   color: '#3B82F6' },
  packed:    { label: 'Packed',    cls: 'bs-new',       mb: 'bdg-ok',   color: '#8B5CF6' },
  shipped:   { label: 'Shipped',   cls: 'bs-new',       mb: 'bdg-ok',   color: '#0D9488' },
  delivered: { label: 'Delivered', cls: 'bs-completed', mb: 'bdg-dn',   color: '#22C55E' },
  cancelled: { label: 'Cancelled', cls: 'bs-cancelled', mb: 'bdg-no',   color: '#EF4444' },
}

export function orderStatus(status) {
  return ORDER_STATUS[String(status || '').toLowerCase()] || { label: status || '—', cls: 'bs-new', mb: 'bdg-wait', color: '#9CA3AF' }
}
