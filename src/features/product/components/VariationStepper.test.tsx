import { it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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

/** Reproduz a Fita Gomada: dois labels "60mm", distinguidos só pelo sublabel. */
const gomada: Produto = {
  ...produto,
  slug: 'gomada',
  nome: 'Fita Gomada',
  variacoes: [
    {
      tipo: 'opcoes',
      titulo: 'Escolha o tamanho que deseja',
      opcoes: [
        { label: '60mm', value: '60mm' },
        { label: '60mm', value: '60mm-personalizada', sublabel: 'PERSONALIZADA' },
      ],
    },
  ],
}

const montar = (p: Produto = produto) =>
  render(
    <MemoryRouter>
      <VariationStepper produto={p} />
    </MemoryRouter>,
  )

const opcoes = () => screen.getAllByRole('radio')
const botaoAdicionar = () => screen.getByRole('button', { name: /adicionar ao orçamento/i })
const campoQtd = () => screen.getByLabelText('Quantidade')

beforeEach(() => useCart.getState().clear())

it('escolher uma opção apenas seleciona — não coloca nada no orçamento', () => {
  montar()
  fireEvent.click(opcoes()[0])

  expect(useCart.getState().itens).toHaveLength(0)
  expect(opcoes()[0]).toHaveAttribute('aria-checked', 'true')
  expect(opcoes()[1]).toHaveAttribute('aria-checked', 'false')
})

it('duas opções com o MESMO label não acendem juntas', () => {
  montar(gomada)

  // as duas linhas se chamam "60mm"; só o sublabel as separa
  fireEvent.click(opcoes()[0])

  expect(opcoes()[0]).toHaveAttribute('aria-checked', 'true')
  expect(opcoes()[1]).toHaveAttribute('aria-checked', 'false')
})

it('o resumo carrega o sublabel, senão o pedido chega ambíguo no WhatsApp', () => {
  montar(gomada)

  fireEvent.click(opcoes()[1]) // a "60mm PERSONALIZADA"
  fireEvent.click(botaoAdicionar())

  expect(useCart.getState().itens[0].variacaoResumo).toBe('Tamanho: 60mm (PERSONALIZADA)')
})

it('não dá para adicionar ao orçamento sem escolher a variação', () => {
  montar()

  expect(botaoAdicionar()).toBeDisabled()
  fireEvent.click(botaoAdicionar())
  expect(useCart.getState().itens).toHaveLength(0)
})

it('adiciona o item com a quantidade digitada', () => {
  montar()

  fireEvent.click(opcoes()[0])
  fireEvent.change(campoQtd(), { target: { value: '25' } })
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].quantidade).toBe(25)
  expect(itens[0].variacaoResumo).toBe('Onda: B')
})

it('quantidade digitada acima do teto trava em 9999', () => {
  montar()

  fireEvent.click(opcoes()[0])
  fireEvent.change(campoQtd(), { target: { value: '999999' } })
  fireEvent.click(botaoAdicionar())

  expect(useCart.getState().itens[0].quantidade).toBe(9999)
})

it('os botões − e + andam de um em um e respeitam o mínimo', () => {
  montar()
  fireEvent.click(opcoes()[0])

  const menos = screen.getByRole('button', { name: /diminuir quantidade/i })
  const mais = screen.getByRole('button', { name: /aumentar quantidade/i })

  expect(menos).toBeDisabled() // já está em 1
  fireEvent.click(mais)
  fireEvent.click(mais)
  expect(campoQtd()).toHaveValue('3')

  fireEvent.click(menos)
  expect(campoQtd()).toHaveValue('2')
})

it('a mesma configuração adicionada duas vezes SOMA a quantidade', () => {
  montar()

  fireEvent.click(opcoes()[0])
  fireEvent.change(campoQtd(), { target: { value: '10' } })
  fireEvent.click(botaoAdicionar())
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].quantidade).toBe(20)
})

it('configurações diferentes viram LINHAS diferentes do orçamento', () => {
  montar()

  fireEvent.click(opcoes()[0])
  fireEvent.click(botaoAdicionar())

  fireEvent.click(opcoes()[1])
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(2)
  expect(itens.map((i) => i.variacaoResumo)).toEqual(['Onda: B', 'Onda: C'])
})
