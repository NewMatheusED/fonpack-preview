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

const opcao = (label: string) => screen.getByRole('radio', { name: new RegExp(`^${label}$`) })
const botaoAdicionar = () => screen.getByRole('button', { name: /adicionar ao orçamento/i })

beforeEach(() => useCart.getState().clear())

it('escolher uma opção apenas seleciona — não coloca nada no orçamento', () => {
  render(<VariationStepper produto={produto} />)

  fireEvent.click(opcao('B'))

  expect(useCart.getState().itens).toHaveLength(0)
  expect(opcao('B')).toHaveAttribute('aria-checked', 'true')
  expect(opcao('C')).toHaveAttribute('aria-checked', 'false')
})

it('trocar de opção substitui a escolha em vez de acumular', () => {
  render(<VariationStepper produto={produto} />)

  fireEvent.click(opcao('B'))
  fireEvent.click(opcao('C'))
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].variacaoResumo).toBe('Escolha a onda que deseja: C')
})

it('não dá para adicionar ao orçamento sem escolher a variação', () => {
  render(<VariationStepper produto={produto} />)

  expect(botaoAdicionar()).toBeDisabled()

  fireEvent.click(botaoAdicionar())
  expect(useCart.getState().itens).toHaveLength(0)
})

it('com a variação escolhida, o botão adiciona o item com o resumo certo', () => {
  render(<VariationStepper produto={produto} />)

  fireEvent.click(opcao('B'))
  expect(botaoAdicionar()).toBeEnabled()

  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].nome).toBe('Cantoneira de papelão')
  expect(itens[0].variacaoResumo).toBe('Escolha a onda que deseja: B')
})
