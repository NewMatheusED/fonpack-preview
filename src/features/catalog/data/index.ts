import type { Produto } from '../typings'
import { produtos } from './produtos'

export function getProdutos(): Produto[] { return produtos }
export function getProdutoBySlug(slug: string): Produto | undefined {
  return produtos.find(p => p.slug === slug)
}
export function getVizinhos(slug: string): { anterior?: Produto; proximo?: Produto } {
  const i = produtos.findIndex(p => p.slug === slug)
  if (i === -1) return {}
  return { anterior: produtos[i - 1], proximo: produtos[i + 1] }
}
