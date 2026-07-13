import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { VariationGroup } from '@/features/catalog/typings'
import { useVariationSelection } from './hooks'

const variacoes: VariationGroup[] = [
  {
    tipo: 'swatch',
    titulo: 'Cor',
    opcoes: [
      { label: 'Pardo', cor: '#e3b991' },
      { label: 'Branco', cor: '#eeeeee' },
    ],
  },
  {
    tipo: 'toggle',
    titulo: 'Impressão',
    label: 'Necessita de Impressão?',
    ajuda: 'Sim, com personalização de marca',
  },
]

describe('useVariationSelection', () => {
  it('monta o resumo a partir da cor e do toggle escolhidos', () => {
    const { result } = renderHook(() => useVariationSelection(variacoes))

    act(() => {
      result.current.setSwatch('Pardo')
      result.current.setToggle(true)
    })

    expect(result.current.resumo).toContain('Cor: Pardo')
    expect(result.current.resumo).toContain('Impressão: Sim')
  })

  it('toggle desmarcado vira "Não" no resumo', () => {
    const { result } = renderHook(() => useVariationSelection(variacoes))

    act(() => {
      result.current.setToggle(false)
    })

    expect(result.current.resumo).toContain('Impressão: Não')
  })
})
