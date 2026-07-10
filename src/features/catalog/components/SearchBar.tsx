import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
      <Input
        type="search"
        placeholder="Buscar..."
        aria-label="Buscar produtos"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-full border-brand-accent/40 bg-brand-surface-2 pl-9 text-brand focus-visible:ring-brand-primary/30"
      />
    </div>
  )
}
