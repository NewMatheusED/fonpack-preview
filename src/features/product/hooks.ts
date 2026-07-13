import { useState } from 'react'
import type { VariationGroup } from '@/features/catalog/typings'
import { rotuloCurto } from './rotulos'

/** Grupo (pelo título) → `value` da opção escolhida. */
export type VariationSelection = Record<string, string>

function tituloPorTipo(variacoes: VariationGroup[], tipo: VariationGroup['tipo']): string | undefined {
  return variacoes.find((grupo) => grupo.tipo === tipo)?.titulo
}

/** Grupos que o cliente precisa escolher para o orçamento fazer sentido. O
 *  toggle tem default implícito ("Não") e o texto é livre, então são opcionais. */
function ehObrigatorio(grupo: VariationGroup): boolean {
  return grupo.tipo === 'opcoes' || grupo.tipo === 'swatch'
}

/**
 * Texto de exibição do valor escolhido num grupo.
 *
 * A seleção é guardada pelo `value` da opção, não pelo label — há produtos com
 * DOIS labels iguais: a Fita Gomada tem "60mm" e "60mm" (uma delas
 * personalizada), e só o `value` (`60mm` vs `60mm-personalizada`) as distingue.
 * Aqui o `value` volta a virar o texto que o humano lê, com o sublabel junto
 * para o pedido não chegar ambíguo no WhatsApp do vendedor.
 */
function textoDoValor(grupo: VariationGroup, valor: string): string {
  if (grupo.tipo === 'opcoes') {
    const opcao = grupo.opcoes.find((o) => o.value === valor)
    if (!opcao) return valor
    return opcao.sublabel ? `${opcao.label} (${opcao.sublabel})` : opcao.label
  }
  return valor
}

/** Monta o resumo da escolha: "Tamanho: 60mm (PERSONALIZADA) | Cor: Pardo". */
export function montarResumo(variacoes: VariationGroup[], selecao: VariationSelection): string {
  return variacoes
    .map((grupo) => {
      const valor = selecao[grupo.titulo]
      return valor ? `${rotuloCurto(grupo.titulo)}: ${textoDoValor(grupo, valor)}` : null
    })
    .filter((linha): linha is string => Boolean(linha))
    .join(' | ')
}

/** As mesmas linhas do resumo, mas separadas — para o bloco de especificações. */
export function listarEspecificacoes(
  variacoes: VariationGroup[],
  selecao: VariationSelection,
): Array<{ rotulo: string; valor: string }> {
  return variacoes
    .filter((grupo) => selecao[grupo.titulo])
    .map((grupo) => ({
      rotulo: rotuloCurto(grupo.titulo),
      valor: textoDoValor(grupo, selecao[grupo.titulo]),
    }))
}

export function useVariationSelection(variacoes: VariationGroup[]) {
  const [selecao, setSelecao] = useState<VariationSelection>({})

  const setValor = (tipo: VariationGroup['tipo'], valor: string) => {
    const titulo = tituloPorTipo(variacoes, tipo)
    if (!titulo) return
    setSelecao((s) => ({ ...s, [titulo]: valor }))
  }

  const setOpcao = (valor: string) => setValor('opcoes', valor)
  const setSwatch = (valor: string) => setValor('swatch', valor)
  const setToggle = (valor: boolean) => setValor('toggle', valor ? 'Sim' : 'Não')
  const setTexto = (valor: string) => setValor('texto', valor)

  const resumo = montarResumo(variacoes, selecao)
  const especificacoes = listarEspecificacoes(variacoes, selecao)

  /** Enquanto faltar um grupo obrigatório, o produto não pode entrar no
   *  orçamento — senão o pedido chega no WhatsApp sem dizer o que é. */
  const faltando = variacoes
    .filter((grupo) => ehObrigatorio(grupo) && !selecao[grupo.titulo])
    .map((grupo) => grupo.titulo)

  const selecaoCompleta = faltando.length === 0

  return {
    selecao,
    setOpcao,
    setSwatch,
    setToggle,
    setTexto,
    resumo,
    especificacoes,
    selecaoCompleta,
    faltando,
  }
}
