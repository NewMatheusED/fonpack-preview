import Fuse from 'fuse.js'
import type { Produto } from './typings'

export function filtrarPorCategoria(produtos: Produto[], catId: string): Produto[] {
  if (catId === 'tudo') return produtos
  return produtos.filter(p => p.categoriaId === catId)
}

export function buscarProdutos(produtos: Produto[], termo: string): Produto[] {
  if (!termo.trim()) return produtos
  const fuse = new Fuse(produtos, { keys: ['nome'], threshold: 0.4 })
  return fuse.search(termo).map(r => r.item)
}
