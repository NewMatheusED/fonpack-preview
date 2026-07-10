import { useCart } from '@/features/cart/store'
import { buildItemUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import type { Produto } from '@/features/catalog/typings'
import { montarResumo, useVariationSelection } from '../hooks'
import { hashResumo } from '../utils'
import OptionRow from './OptionRow'
import ColorSwatch from './ColorSwatch'
import ToggleField from './ToggleField'
import TextField from './TextField'

type VariationStepperProps = {
  produto: Produto
}

export default function VariationStepper({ produto }: VariationStepperProps) {
  const { selecao, setOpcao, setSwatch, setToggle, setTexto, resumo } = useVariationSelection(produto.variacoes)
  const add = useCart((s) => s.add)

  const stepperLabels = produto.stepper ?? []
  const stepConcluido = stepperLabels.map((_, i) => {
    const grupo = produto.variacoes[i]
    return grupo ? Boolean(selecao[grupo.titulo]) : false
  })
  const stepAtivo = stepConcluido.findIndex((concluido) => !concluido)

  function handleAdicionar() {
    add({
      id: `${produto.slug}#${hashResumo(resumo)}`,
      produtoSlug: produto.slug,
      nome: produto.nome,
      variacaoResumo: resumo,
      quantidade: 1,
    })
  }

  return (
    <div>
      {stepperLabels.length > 0 && (
        <ol className="mb-8 flex items-start gap-1 overflow-x-auto">
          {stepperLabels.map((label, i) => {
            const concluido = stepConcluido[i]
            const ativo = i === stepAtivo

            return (
              <li key={label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-center">
                  <span
                    className={cn(
                      'h-3 w-3 shrink-0 rounded-full border-2',
                      concluido
                        ? 'border-brand-primary bg-brand-primary'
                        : ativo
                          ? 'border-brand-primary bg-brand-surface-2'
                          : 'border-brand-accent/50 bg-brand-surface-2',
                    )}
                  />
                  {i < stepperLabels.length - 1 && <span className="h-px flex-1 bg-brand-accent/40" />}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-wide',
                    concluido || ativo ? 'text-brand-primary' : 'text-brand-muted',
                  )}
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ol>
      )}

      <div className="flex flex-col gap-8">
        {produto.variacoes.map((grupo, i) => (
          <div key={grupo.titulo}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              {i + 1}°: {grupo.titulo.toUpperCase()}
            </h3>

            {grupo.tipo === 'opcoes' && (
              <div className="flex flex-col gap-3">
                {grupo.opcoes.map((opcao) => (
                  <OptionRow
                    key={opcao.value}
                    produtoSlug={produto.slug}
                    produtoNome={produto.nome}
                    opcao={opcao}
                    resumo={montarResumo(produto.variacoes, selecao, { tipo: 'opcoes', valor: opcao.label })}
                    onEscolher={() => setOpcao(opcao.label)}
                  />
                ))}
              </div>
            )}

            {grupo.tipo === 'swatch' && (
              <ColorSwatch opcoes={grupo.opcoes} value={selecao[grupo.titulo]} onChange={setSwatch} />
            )}

            {grupo.tipo === 'toggle' && (
              <ToggleField
                label={grupo.label}
                ajuda={grupo.ajuda}
                checked={selecao[grupo.titulo] === 'Sim'}
                onChange={setToggle}
              />
            )}

            {grupo.tipo === 'texto' && (
              <TextField
                placeholder={grupo.placeholder}
                value={selecao[grupo.titulo] ?? ''}
                onChange={setTexto}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAdicionar}
          className="w-full rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
        >
          Adicionar ao orçamento
        </button>
        <a
          href={buildItemUrl(produto.nome, resumo)}
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-xl border border-brand-primary px-5 py-3.5 text-center text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-surface"
        >
          Comprar agora (WhatsApp)
        </a>
        <a
          href={buildItemUrl(produto.nome, '')}
          target="_blank"
          rel="noreferrer"
          className="text-center text-sm font-medium text-brand-primary underline underline-offset-4"
        >
          Falar com um especialista
        </a>
      </div>
    </div>
  )
}
