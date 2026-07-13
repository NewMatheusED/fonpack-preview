import { cn } from '@/lib/utils'
import type { VariationGroup } from '@/features/catalog/typings'

type SwatchOption = Extract<VariationGroup, { tipo: 'swatch' }>['opcoes'][number]

type ColorSwatchProps = {
  opcoes: SwatchOption[]
  value?: string
  onChange: (label: string) => void
}

export default function ColorSwatch({ opcoes, value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {opcoes.map((opcao) => (
        <button
          key={opcao.label}
          type="button"
          aria-label={opcao.label}
          aria-pressed={value === opcao.label}
          onClick={() => onChange(opcao.label)}
          className={cn(
            'h-9 w-9 rounded-full border-2 transition-shadow',
            value === opcao.label
              ? 'border-brand-primary ring-2 ring-brand-primary/30 ring-offset-2 ring-offset-brand-surface-2'
              : 'border-brand-accent/40',
          )}
          style={{ backgroundColor: opcao.cor }}
        />
      ))}
    </div>
  )
}
