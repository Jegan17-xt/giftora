import { Link, useParams } from 'react-router-dom'

const items = [
  { id: 'aboutus',        label: 'About Us' },
  { id: 'whoweare',       label: 'Who We Are' },
  { id: 'ourmission',     label: 'Our Mission' },
  { id: 'ourvision',      label: 'Our Vision' },
  { id: 'ourvalues',      label: 'Our Values' },
  { id: 'companyoverview',label: 'Company Overview' },
  { id: 'whatwedo',       label: 'What We Do' },
  { id: 'whychooseus',    label: 'Why Choose Us' },
]

const disabled = ['Our Story','Meet the Team','Our Journey','Leadership','Our People','Our Promise']

export default function Sidenav() {
  const { aboutid } = useParams()

  return (
    <div className="list-group list-group-flush">
      {items.map(it => (
        <Link
          key={it.id}
          to={`/cms/about/${it.id}`}
          className={`list-group-item list-group-item-action py-2 px-3 ${aboutid === it.id ? 'submenuactive active' : ''}`}
        >
          {it.label}
        </Link>
      ))}
      {disabled.map(label => (
        <span
          key={label}
          className="list-group-item list-group-item-action py-2 px-3 text-muted"
          style={{ textDecoration: 'line-through', cursor: 'default' }}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
