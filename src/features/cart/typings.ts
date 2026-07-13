export type CartItem = {
  id: string          // slug + hash da variação
  produtoSlug: string
  nome: string
  variacaoResumo: string   // "Onda: B | Cor: Pardo"
  quantidade: number
}
