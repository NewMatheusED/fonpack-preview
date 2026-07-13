import { describe, it, expect } from 'vitest'
import { categorias } from './categorias'
import { getProdutos, getProdutoBySlug, getVizinhos } from './index'

describe('dados do catálogo', () => {
  it('tem 5 categorias na ordem da loja', () => {
    expect(categorias.map(c => c.slugPlural)).toEqual(
      ['cantoneiras', 'bobinas', 'acessorios', 'caixas', 'fitas'],
    )
  })
  it('tem os 35 produtos extraídos do modelo Framer', () => {
    expect(getProdutos()).toHaveLength(35)
  })
  it('acha produto por slug', () => {
    expect(getProdutoBySlug('corte-vinco')?.nome).toBe('Caixa Corte vinco')
  })
  it('retorna vizinhos para prev/next', () => {
    const v = getVizinhos('corte-vinco')
    expect(v.anterior).toBeDefined()
    expect(v.proximo).toBeDefined()
  })
})
