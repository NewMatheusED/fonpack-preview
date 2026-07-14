import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/features/cart/store'
import { buildItemUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import type { Produto } from '@/features/catalog/typings'
import { useVariationSelection } from '../hooks'
import { hashResumo } from '../utils'
import { QTD_MIN } from '../quantidade'
import OptionRow from './OptionRow'
import QuantityField from './QuantityField'
import ColorSwatch from './ColorSwatch'
import ToggleField from './ToggleField'
import TextField from './TextField'

type VariationStepperProps = {
  produto: Produto
}

export default function VariationStepper({ produto }: VariationStepperProps) {
  const {
    selecao,
    setOpcao,
    setSwatch,
    setToggle,
    setTexto,
    resumo,
    especificacoes,
    selecaoCompleta,
    faltando,
  } = useVariationSelection(produto.variacoes)
  const add = useCart((s) => s.add)
  const totalItens = useCart((s) => s.totalItens())
  const [quantidade, setQuantidade] = useState(QTD_MIN)
  const [adicionado, setAdicionado] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const stepperLabels = produto.stepper ?? []
  const stepConcluido = stepperLabels.map((_, i) => {
    const grupo = produto.variacoes[i]
    return grupo ? Boolean(selecao[grupo.titulo]) : false
  })
  const stepAtivo = stepConcluido.findIndex((concluido) => !concluido)

  function handleAdicionar() {
    if (!selecaoCompleta) return

    add({
      id: `${produto.slug}#${hashResumo(resumo)}`,
      produtoSlug: produto.slug,
      nome: produto.nome,
      variacaoResumo: resumo,
      quantidade,
    })
    setAdicionado(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAdicionado(false), 2200)
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
                          ? 'border-brand-primary bg-brand-base'
                          : 'border-brand-accent/50 bg-brand-base',
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
              <div role="radiogroup" aria-label={grupo.titulo} className="flex flex-col gap-3">
                {/* Comparar pelo `value`, nunca pelo label: a Fita Gomada tem
                    duas opções chamadas "60mm" (uma delas personalizada) e a
                    Fita Acrílica duas "48x100 - 2 CORES". Pelo label, clicar
                    numa acendia as duas. */}
                {grupo.opcoes.map((opcao) => (
                  <OptionRow
                    key={opcao.value}
                    opcao={opcao}
                    selecionada={selecao[grupo.titulo] === opcao.value}
                    onSelecionar={() => setOpcao(opcao.value)}
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

        {/* Quantidade em linha própria, e não dentro de cada opção. No modelo do
            Framer a quantidade fica colada na linha da variação, e daí vem um
            defeito: escolher duas medidas obriga as duas à mesma cor. Aqui a
            página configura UM item completo (medida + cor + impressão +
            quantidade); querendo outra medida, é só configurar de novo e
            adicionar — vira outra linha do orçamento, com a cor dela própria. */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
            {produto.variacoes.length + 1}°: QUANTIDADE
          </h3>
          <QuantityField value={quantidade} onChange={setQuantidade} />
        </div>
      </div>

      {especificacoes.length > 0 && (
        <div className="mt-8 rounded-2xl bg-brand-surface-2 p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Resumo do item
          </h3>
          <dl className="mt-3 space-y-1.5">
            {especificacoes.map((espec) => (
              <div key={espec.rotulo} className="flex gap-2 text-sm">
                <dt className="text-brand-muted">{espec.rotulo}:</dt>
                <dd className="font-medium text-brand">{espec.valor}</dd>
              </div>
            ))}
            <div className="flex gap-2 text-sm">
              <dt className="text-brand-muted">Quantidade:</dt>
              <dd className="font-medium text-brand">{quantidade}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        {!selecaoCompleta && (
          <p className="-mt-1 text-center font-bold text-sm text-brand-muted">
            {/* Os títulos dos grupos já são imperativos ("Escolha a cor"), então
                entram na frase como estão — só o primeiro mantém a maiúscula. */}
            {faltando
              .map((titulo, i) => (i === 0 ? titulo : titulo.toLowerCase()))
              .join(' e ')}{' '}
            para adicionar ao orçamento.
          </p>
        )}
        <button
          type="button"
          onClick={handleAdicionar}
          disabled={!selecaoCompleta}
          className="w-full rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2 disabled:cursor-not-allowed disabled:bg-brand-muted/30 disabled:text-brand-muted disabled:hover:bg-brand-muted/30"
        >
          Adicionar ao orçamento
        </button>

        <p
          role="status"
          className={cn(
            'rounded-xl bg-brand-green-soft px-4 py-2.5 text-center text-sm font-semibold text-brand-primary transition-opacity',
            adicionado ? 'opacity-100' : 'sr-only opacity-0',
          )}
        >
          {adicionado ? 'Produto adicionado com sucesso!' : ''}
        </p>

        {/* No celular o badge do carrinho fica lá no topo da tela — sem este
            atalho, quem adicionou não tem caminho para fechar o pedido. Fica
            enquanto houver item no orçamento, não só durante a confirmação. */}
        {totalItens > 0 && (
          <Link
            to="/orcamento"
            className="text-center text-sm font-semibold text-brand-primary underline underline-offset-4"
          >
            Ver meu orçamento ({totalItens})
          </Link>
        )}
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
