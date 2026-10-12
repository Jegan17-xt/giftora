import { Link, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'

const items = [
  { id: 'conditions',   label: 'Terms and Conditions', icon: 'mdi:file-document-outline' },
  { id: 'privacy',      label: 'Privacy Policy',        icon: 'mdi:lock-outline' },
  { id: 'disclaimer',   label: 'Disclaimer',            icon: 'mdi:alert-circle-outline' },
  { id: 'cookiepolicy', label: 'Cookie Policy',         icon: 'mdi:cookie-outline' },
]

export default function Termsidenav() {
  const { termid } = useParams()

  return (
    <div className="list-group list-group-flush">
      {items.map(it => (
        <Link
          key={it.id}
          to={`/cms/terms/${it.id}`}
          className={`list-group-item list-group-item-action py-2 px-3 d-flex align-items-center gap-2 ${termid === it.id ? 'submenuactive active' : ''}`}
        >
          <Icon icon={it.icon} />
          <span>{it.label}</span>
        </Link>
      ))}
    </div>
  )
}
