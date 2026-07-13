import { describe, it, expect } from 'vitest'
import { buildOrcamentoUrl, buildItemUrl } from './whatsapp'

describe('whatsapp', () => {
  it('gera url wa.me com o número da empresa', () => {
    const url = buildItemUrl('Caixa Corte vinco', 'Onda: B')
    expect(url.startsWith('https://wa.me/5511942508424?text=')).toBe(true)
  })
  it('inclui todos os itens do orçamento', () => {
    const url = buildOrcamentoUrl([
      { id: '1', produtoSlug: 'a', nome: 'Caixa Corte vinco', variacaoResumo: 'Onda: B', quantidade: 2 },
      { id: '2', produtoSlug: 'b', nome: 'Bobina Kraft', variacaoResumo: 'Tamanho: 60cm', quantidade: 1 },
    ])
    const txt = decodeURIComponent(url.split('text=')[1])
    expect(txt).toContain('Caixa Corte vinco')
    expect(txt).toContain('Onda: B')
    expect(txt).toContain('Qtd: 2')
    expect(txt).toContain('Bobina Kraft')
  })
})
