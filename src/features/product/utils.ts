// Hash simples e determinístico usado para compor o id de itens do orçamento
// (slug do produto + hash do resumo da variação escolhida).
export function hashResumo(resumo: string): string {
  let hash = 0
  for (let i = 0; i < resumo.length; i++) {
    hash = (hash << 5) - hash + resumo.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}
