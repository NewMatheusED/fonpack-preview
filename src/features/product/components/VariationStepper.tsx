import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@/features/cart/store'
import { buildItemUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import type { Produto, VariationGroup } from '@/features/catalog/typings'
import { formatarOpcao, useMultiOptionSelection, useVariationSelection } from '../hooks'
import { rotuloCurto } from '../rotulos'
import { hashResumo } from '../utils'
import { QTD_MIN } from '../quantidade'
import OptionRow from './OptionRow'
import MultiSelectOptionCard from './MultiSelectOptionCard'
import QuantityField from './QuantityField'
import ColorSwatch from './ColorSwatch'
import ToggleField from './ToggleField'
import TextField from './TextField'

type VariationStepperProps = {
  produto: Produto
}

/** Só um grupo, e ele é `opcoes`: dá pra selecionar várias opções ao mesmo
 *  tempo, cada uma com a própria quantidade (ver `MultiSelectOptionCard`). */
function grupoDeSelecaoMultipla(variacoes: VariationGroup[]): Extract<VariationGroup, { tipo: 'opcoes' }> | null {
  if (variacoes.length !== 1) return null
  const [grupo] = variacoes
  return grupo.tipo === 'opcoes' ? grupo : null
}

const GRUPO_VAZIO: Extract<VariationGroup, { tipo: 'opcoes' }> = { tipo: 'opcoes', titulo: '', opcoes: [] }

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
  const grupoMultiplo = grupoDeSelecaoMultipla(produto.variacoes)
  const multiplo = useMultiOptionSelection(grupoMultiplo ?? GRUPO_VAZIO)
  const modoMultiplo = grupoMultiplo !== null
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

  const podeAdicionar = modoMultiplo ? multiplo.temSelecao : selecaoCompleta

  // Resumo usado nos links de WhatsApp: no modo múltiplo junta uma linha por
  // opção escolhida, já que cada uma vai virar um item separado no orçamento.
  const resumoParaWhatsApp = modoMultiplo && grupoMultiplo
    ? multiplo.itensSelecionados
        .map(({ opcao, quantidade: qtd }) => `${rotuloCurto(grupoMultiplo.titulo)}: ${formatarOpcao(opcao)} — Qtd: ${qtd}`)
        .join(' | ')
    : resumo

  function handleAdicionar() {
    if (!podeAdicionar) return

    if (modoMultiplo && grupoMultiplo) {
      multiplo.itensSelecionados.forEach(({ opcao, quantidade: qtd }) => {
        const resumoItem = `${rotuloCurto(grupoMultiplo.titulo)}: ${formatarOpcao(opcao)}`
        add({
          id: `${produto.slug}#${hashResumo(resumoItem)}`,
          produtoSlug: produto.slug,
          nome: produto.nome,
          variacaoResumo: resumoItem,
          quantidade: qtd,
        })
      })
    } else {
      add({
        id: `${produto.slug}#${hashResumo(resumo)}`,
        produtoSlug: produto.slug,
        nome: produto.nome,
        variacaoResumo: resumo,
        quantidade,
      })
    }

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
        {modoMultiplo && grupoMultiplo ? (
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
              {grupoMultiplo.titulo.toUpperCase()}
            </h3>

            {/* Produto com um grupo só (ex.: só "Tamanho"): dá pra marcar várias
                opções ao mesmo tempo, cada uma com a própria quantidade — elas
                viram linhas separadas no orçamento. Com mais de um grupo isso
                não rola (ver comentário no branco `else`), por isso o modo
                múltiplo só liga quando `produto.variacoes` tem exatamente um
                grupo do tipo `opcoes`. */}
            <div role="group" aria-label={grupoMultiplo.titulo} className="flex flex-col gap-3">
              {grupoMultiplo.opcoes.map((opcao) => (
                <MultiSelectOptionCard
                  key={opcao.value}
                  opcao={opcao}
                  selecionada={opcao.value in multiplo.selecao}
                  quantidade={multiplo.selecao[opcao.value] ?? QTD_MIN}
                  onSelecionar={() => multiplo.alternar(opcao.value)}
                  onRemover={() => multiplo.remover(opcao.value)}
                  onQuantidadeChange={(n) => multiplo.setQuantidade(opcao.value, n)}
                  onAtalho={(n) => multiplo.somarQuantidade(opcao.value, n)}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
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
                adicionar — vira outra linha do orçamento, com a cor dela própria.
                (Quando há um grupo só, a quantidade já mora dentro de cada card
                — ver ramo `modoMultiplo` acima.) */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {produto.variacoes.length + 1}°: QUANTIDADE
              </h3>
              <QuantityField value={quantidade} onChange={setQuantidade} />
            </div>
          </>
        )}
      </div>

      {modoMultiplo ? (
        multiplo.itensSelecionados.length > 0 && (
          <div className="mt-8 rounded-2xl bg-brand-surface-2 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Resumo das especificações
            </h3>
            <dl className="mt-3 space-y-1.5">
              {multiplo.itensSelecionados.map(({ opcao, quantidade: qtd }) => (
                <div key={opcao.value} className="flex items-center justify-between gap-2 text-sm">
                  <dt className="font-medium text-brand">{formatarOpcao(opcao)}</dt>
                  <dd className="font-semibold text-brand-muted">{qtd}x</dd>
                </div>
              ))}
            </dl>
          </div>
        )
      ) : (
        especificacoes.length > 0 && (
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
        )
      )}

      <div className="mt-8 flex flex-col gap-3">
        {modoMultiplo ? (
          !multiplo.temSelecao && (
            <p className="-mt-1 text-center font-bold text-sm text-brand-muted">
              Escolha pelo menos uma opção para adicionar ao orçamento.
            </p>
          )
        ) : (
          !selecaoCompleta && (
            <p className="-mt-1 text-center font-bold text-sm text-brand-muted">
              {/* Os títulos dos grupos já são imperativos ("Escolha a cor"), então
                  entram na frase como estão — só o primeiro mantém a maiúscula. */}
              {faltando
                .map((titulo, i) => (i === 0 ? titulo : titulo.toLowerCase()))
                .join(' e ')}{' '}
              para adicionar ao orçamento.
            </p>
          )
        )}
        <button
          type="button"
          onClick={handleAdicionar}
          disabled={!podeAdicionar}
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
          href={buildItemUrl(produto.nome, resumoParaWhatsApp)}
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
