import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VariationGroup } from '@/features/catalog/typings'

type VariationOption = Extract<VariationGroup, { tipo: 'opcoes' }>['opcoes'][number]

type OptionRowProps = {
  opcao: VariationOption
  selecionada: boolean
  onSelecionar: () => void
}

/**
 * Uma opção de variação (ex.: a onda do papelão). É um controle de SELEÇÃO —
 * clicar aqui só escolhe a opção; quem coloca o item no orçamento é o botão
 * "Adicionar ao orçamento" no fim do formulário.
 */
export default function OptionRow({ opcao, selecionada, onSelecionar }: OptionRowProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selecionada}
      onClick={onSelecionar}
      className={cn(
        'flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors',
        selecionada
          ? 'bg-brand-green-soft/35 ring-1 ring-inset ring-brand-primary/50'
          : 'bg-brand-surface-2 hover:bg-brand-accent/10',
      )}
    >
      <span>
        <span className="block text-sm font-semibold text-brand-primary">{opcao.label}</span>
        {opcao.sublabel && (
          <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-brand-muted">
            {opcao.sublabel}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-surface"
      >
        {selecionada ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>
  )
}
