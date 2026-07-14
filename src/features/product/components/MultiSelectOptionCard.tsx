import { Plus, X } from 'lucide-react'
import type { VariationGroup } from '@/features/catalog/typings'
import { ATALHOS_QTD } from '../quantidade'
import QuantityField from './QuantityField'

type VariationOption = Extract<VariationGroup, { tipo: 'opcoes' }>['opcoes'][number]

type MultiSelectOptionCardProps = {
  opcao: VariationOption
  selecionada: boolean
  quantidade: number
  onSelecionar: () => void
  onRemover: () => void
  onQuantidadeChange: (n: number) => void
  onAtalho: (delta: number) => void
}

/**
 * Card de uma opção quando o produto tem só UM grupo de variação (ex.: só
 * "Tamanho"). Diferente do `OptionRow` (seleção única, tipo rádio), aqui dá
 * pra marcar várias opções ao mesmo tempo: cada uma vira uma linha própria no
 * orçamento, com a própria quantidade — por isso o escolhedor de quantidade e
 * os atalhos (+10, +500, +1000) ficam dentro do card assim que ele é
 * selecionado.
 */
export default function MultiSelectOptionCard({
  opcao,
  selecionada,
  quantidade,
  onSelecionar,
  onRemover,
  onQuantidadeChange,
  onAtalho,
}: MultiSelectOptionCardProps) {
  if (!selecionada) {
    return (
      <button
        type="button"
        role="checkbox"
        aria-checked={false}
        onClick={onSelecionar}
        className="flex w-full items-center justify-between gap-4 rounded-2xl bg-brand-surface-2 px-5 py-4 text-left transition-colors hover:bg-brand-accent/10"
      >
        <Rotulo opcao={opcao} />
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-surface"
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
    )
  }

  return (
    <div
      role="checkbox"
      aria-checked={true}
      className="rounded-2xl bg-brand-green-soft/35 p-5 ring-1 ring-inset ring-brand-primary/50"
    >
      <div className="flex items-center justify-between gap-4">
        <Rotulo opcao={opcao} />
        <div className="flex shrink-0 items-center gap-2">
          <QuantityField
            value={quantidade}
            onChange={onQuantidadeChange}
            ariaLabel={`Quantidade de ${opcao.label}`}
            compact
          />
          <button
            type="button"
            aria-label={`Remover ${opcao.label}`}
            onClick={onRemover}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent bg-brand-base text-brand-muted transition-colors hover:border-brand-primary/40 hover:text-brand"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {ATALHOS_QTD.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onAtalho(n)}
            className="rounded-full border border-brand-primary/20 bg-brand-base px-3 py-1.5 text-xs font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-surface"
          >
            +{n}
          </button>
        ))}
      </div>
    </div>
  )
}

function Rotulo({ opcao }: { opcao: VariationOption }) {
  return (
    <span>
      <span className="block text-sm font-semibold text-brand-primary">{opcao.label}</span>
      {opcao.sublabel && (
        <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-brand-muted">
          {opcao.sublabel}
        </span>
      )}
    </span>
  )
}
