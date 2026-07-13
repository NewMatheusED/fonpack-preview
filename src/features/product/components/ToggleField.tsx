import { Switch } from '@/components/ui/switch'

type ToggleFieldProps = {
  label: string
  ajuda?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ToggleField({ label, ajuda, checked, onChange }: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-surface px-5 py-4">
      <div>
        <p className="text-sm font-semibold text-brand-primary">{label}</p>
        {ajuda && <p className="mt-0.5 text-xs text-brand-muted">{ajuda}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
