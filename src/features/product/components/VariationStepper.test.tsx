import { it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useCart } from '@/features/cart/store'
import type { Produto } from '@/features/catalog/typings'
import VariationStepper from './VariationStepper'

const produto: Produto = {
  slug: 'cantoneira-de-papelao',
  nome: 'Cantoneira de papelão',
  categoriaId: 'cantoneira',
  badge: 'Suas medidas',
  imagens: ['/produtos/cantoneira-de-papelao/0.webp'],
  descricao: [],
  variacoes: [
    {
      tipo: 'opcoes',
      titulo: 'Escolha a onda que deseja',
      opcoes: [
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
      ],
    },
  ],
}

beforeEach(() => useCart.getState().clear())

it('clicar no + de uma opção adiciona o item ao orçamento', () => {
  render(<VariationStepper produto={produto} />)

  fireEvent.click(screen.getByRole('button', { name: /adicionar b ao orçamento/i }))

  expect(useCart.getState().itens).toHaveLength(1)
  expect(useCart.getState().itens[0].nome).toBe('Cantoneira de papelão')
  expect(useCart.getState().itens[0].variacaoResumo).toBe('Escolha a onda que deseja: B')
})
