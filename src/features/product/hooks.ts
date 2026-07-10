import { useState } from 'react'
import type { VariationGroup } from '@/features/catalog/typings'

export type VariationSelection = Record<string, string>

function tituloPorTipo(variacoes: VariationGroup[], tipo: VariationGroup['tipo']): string | undefined {
  return variacoes.find((grupo) => grupo.tipo === tipo)?.titulo
}

/**
 * Monta o texto "titulo: valor | titulo: valor" na ordem dos grupos de variação.
 * `override` permite calcular o resumo como se um grupo específico (pelo `tipo`)
 * tivesse um valor diferente do que está em `selecao` — usado pelo botão "+" de
 * cada opção, que adiciona ao orçamento sem esperar o próximo render.
 */
export function montarResumo(
  variacoes: VariationGroup[],
  selecao: VariationSelection,
  override?: { tipo: VariationGroup['tipo']; valor: string },
): string {
  const tituloOverride = override ? tituloPorTipo(variacoes, override.tipo) : undefined

  return variacoes
    .map((grupo) => {
      const valor = grupo.titulo === tituloOverride ? override!.valor : selecao[grupo.titulo]
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

  return { selecao, setOpcao, setSwatch, setToggle, setTexto, resumo }
}
