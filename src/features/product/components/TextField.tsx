import { Input } from '@/components/ui/input'

type TextFieldProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export default function TextField({ placeholder, value, onChange }: TextFieldProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 rounded-xl border-brand-accent/40 bg-brand-surface-2 px-4 text-brand"
    />
  )
}
