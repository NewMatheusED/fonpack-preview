import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-brand-muted" />}
          {item.to ? (
            <Link
              to={item.to}
              className="text-brand-primary transition-colors hover:text-brand-primary-2"
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-brand-primary">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
