import { describe, it, expect } from 'vitest'
import { filtrarPorCategoria, buscarProdutos } from './hooks'
import { getProdutos } from './data'

describe('catálogo', () => {
  it("'tudo' retorna todos", () => {
    expect(filtrarPorCategoria(getProdutos(), 'tudo')).toHaveLength(getProdutos().length)
  })
  it('filtra por categoria', () => {
    const caixas = filtrarPorCategoria(getProdutos(), 'caixa')
    expect(caixas.every(p => p.categoriaId === 'caixa')).toBe(true)
  })
  it('busca fuzzy acha por nome parcial', () => {
    const r = buscarProdutos(getProdutos(), 'corte')
    expect(r.some(p => p.slug === 'corte-vinco')).toBe(true)
  })
})
