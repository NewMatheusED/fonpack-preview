import { useState } from 'react'
import type { VariationGroup } from '@/features/catalog/typings'

export type VariationSelection = Record<string, string>

function tituloPorTipo(variacoes: VariationGroup[], tipo: VariationGroup['tipo']): string | undefined {
  return variacoes.find((grupo) => grupo.tipo === tipo)?.titulo
}

/** Grupos que o cliente precisa escolher para o orçamento fazer sentido. O
 *  toggle tem default implícito ("Não") e o texto é livre, então são opcionais. */
function ehObrigatorio(grupo: VariationGroup): boolean {
  return grupo.tipo === 'opcoes' || grupo.tipo === 'swatch'
}

/** Monta o texto "titulo: valor | titulo: valor" na ordem dos grupos de variação. */
export function montarResumo(variacoes: VariationGroup[], selecao: VariationSelection): string {
  return variacoes
    .map((grupo) => {
      const valor = selecao[grupo.titulo]
      return valor ? `${grupo.titulo}: ${valor}` : null
    })
    .filter((linha): linha is string => Boolean(linha))
    .join(' | ')
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

  /** Enquanto faltar um grupo obrigatório, o produto não pode entrar no
   *  orçamento — senão o pedido chega no WhatsApp sem dizer o que é. */
  const faltando = variacoes
    .filter((grupo) => ehObrigatorio(grupo) && !selecao[grupo.titulo])
    .map((grupo) => grupo.titulo)

  const selecaoCompleta = faltando.length === 0

  return { selecao, setOpcao, setSwatch, setToggle, setTexto, resumo, selecaoCompleta, faltando }
}
