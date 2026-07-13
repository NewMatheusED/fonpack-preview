import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from './store'

const item = { id: 'corte-vinco#b-pardo', produtoSlug: 'corte-vinco', nome: 'Caixa Corte vinco', variacaoResumo: 'Onda: B | Cor: Pardo', quantidade: 1 }

describe('useCart', () => {
  beforeEach(() => useCart.getState().clear())
  it('adiciona item novo', () => {
    useCart.getState().add(item)
    expect(useCart.getState().itens).toHaveLength(1)
  })
  it('mesma variação incrementa quantidade em vez de duplicar', () => {
    useCart.getState().add(item)
    useCart.getState().add(item)
    expect(useCart.getState().itens).toHaveLength(1)
    expect(useCart.getState().itens[0].quantidade).toBe(2)
  })
  it('remove e conta total', () => {
    useCart.getState().add(item)
    useCart.getState().add({ ...item, id: 'x', quantidade: 3 })
    expect(useCart.getState().totalItens()).toBe(4)
    useCart.getState().remove('x')
    expect(useCart.getState().totalItens()).toBe(1)
  })
})
