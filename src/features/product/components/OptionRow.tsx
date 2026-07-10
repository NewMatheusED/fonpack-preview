import { Plus } from 'lucide-react'
import { useCart } from '@/features/cart/store'
import type { VariationGroup } from '@/features/catalog/typings'
import { hashResumo } from '../utils'

type VariationOption = Extract<VariationGroup, { tipo: 'opcoes' }>['opcoes'][number]

type OptionRowProps = {
  produtoSlug: string
  produtoNome: string
  opcao: VariationOption
  /** Resumo completo do orçamento já considerando esta opção escolhida. */
  resumo: string
  onEscolher?: () => void
}

export default function OptionRow({ produtoSlug, produtoNome, opcao, resumo, onEscolher }: OptionRowProps) {
  const add = useCart((s) => s.add)

  function handleClick() {
    onEscolher?.()
    add({
      id: `${produtoSlug}#${hashResumo(resumo)}`,
      produtoSlug,
      nome: produtoNome,
      variacaoResumo: resumo,
      quantidade: 1,
    })
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-surface px-5 py-4 transition-colors hover:bg-brand-accent/10">
      <div>
        <p className="text-sm font-semibold text-brand-primary">{opcao.label}</p>
        {opcao.sublabel && (
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand-muted">
            {opcao.sublabel}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label={`Adicionar ${opcao.label} ao orçamento`}
        onClick={handleClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-surface transition-colors hover:bg-brand-primary-2"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
