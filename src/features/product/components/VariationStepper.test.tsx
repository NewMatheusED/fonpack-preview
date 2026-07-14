import { it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useCart } from '@/features/cart/store'
import type { Produto } from '@/features/catalog/typings'
import VariationStepper from './VariationStepper'

/**
 * Produto com um grupo SÓ de variação ("Tamanho"): entra no modo de seleção
 * múltipla — cada tamanho marcado ganha o próprio escolhedor de quantidade e
 * vira uma linha separada no orçamento.
 */
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

/** Reproduz a Caixa Corte vinco: vários grupos, então continua no fluxo antigo
 *  (seleção única por grupo + quantidade única no fim). */
const corteVinco: Produto = {
  ...produto,
  slug: 'corte-vinco',
  nome: 'Caixa Corte vinco',
  categoriaId: 'caixa',
  variacoes: [
    {
      tipo: 'opcoes',
      titulo: 'Escolha a onda que deseja',
      opcoes: [
        { label: 'B', value: 'b' },
        { label: 'C', value: 'c' },
      ],
    },
    {
      tipo: 'swatch',
      titulo: 'Escolha a cor',
      opcoes: [
        { label: 'Pardo', cor: '#e3b991' },
        { label: 'Branco', cor: '#eeeeee' },
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

const botaoAdicionar = () => screen.getByRole('button', { name: /adicionar ao orçamento/i })

beforeEach(() => useCart.getState().clear())

// ---------------------------------------------------------------------------
// Modo de seleção múltipla (produto com um grupo `opcoes` só)
// ---------------------------------------------------------------------------

const cards = () => screen.getAllByRole('checkbox')

it('produto com um grupo só usa cards de seleção múltipla, não rádio', () => {
  montar()
  expect(cards()).toHaveLength(2)
  expect(screen.queryAllByRole('radio')).toHaveLength(0)
})

it('dá pra marcar mais de uma opção ao mesmo tempo', () => {
  montar()
  fireEvent.click(cards()[0])
  fireEvent.click(cards()[1])

  expect(cards()[0]).toHaveAttribute('aria-checked', 'true')
  expect(cards()[1]).toHaveAttribute('aria-checked', 'true')
})

it('marcar uma opção mostra o escolhedor de quantidade dela, com o mínimo 1', () => {
  montar()
  fireEvent.click(cards()[0])

  expect(screen.getByLabelText('Quantidade de B')).toHaveValue('1')
})

it('os atalhos de quantidade (+10, +500, +1000) somam à quantidade atual', () => {
  montar()
  fireEvent.click(cards()[0])
  fireEvent.click(screen.getByRole('button', { name: '+10' }))
  fireEvent.click(screen.getByRole('button', { name: '+500' }))

  expect(screen.getByLabelText('Quantidade de B')).toHaveValue('511')
})

it('o botão de remover desmarca a opção', () => {
  montar()
  fireEvent.click(cards()[0])
  expect(cards()[0]).toHaveAttribute('aria-checked', 'true')

  fireEvent.click(screen.getByRole('button', { name: 'Remover B' }))
  expect(cards()[0]).toHaveAttribute('aria-checked', 'false')
})

it('duas opções com o MESMO label não acendem juntas', () => {
  montar(gomada)
  const opcoes = () => screen.getAllByRole('checkbox')

  fireEvent.click(opcoes()[0])

  expect(opcoes()[0]).toHaveAttribute('aria-checked', 'true')
  expect(opcoes()[1]).toHaveAttribute('aria-checked', 'false')
})

it('não dá para adicionar ao orçamento sem marcar nenhuma opção', () => {
  montar()

  expect(botaoAdicionar()).toBeDisabled()
  fireEvent.click(botaoAdicionar())
  expect(useCart.getState().itens).toHaveLength(0)
})

it('adiciona uma linha do orçamento para cada opção marcada, cada uma com a própria quantidade', () => {
  montar()

  fireEvent.click(cards()[0]) // B
  fireEvent.click(cards()[1]) // C
  fireEvent.click(screen.getAllByRole('button', { name: '+10' })[1]) // soma 10 à quantidade de C
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(2)
  expect(itens.map((i) => i.variacaoResumo)).toEqual(['Onda: B', 'Onda: C'])
  expect(itens.find((i) => i.variacaoResumo === 'Onda: B')?.quantidade).toBe(1)
  expect(itens.find((i) => i.variacaoResumo === 'Onda: C')?.quantidade).toBe(11)
})

it('o resumo carrega o sublabel, senão o pedido chega ambíguo no WhatsApp', () => {
  montar(gomada)
  const opcoes = () => screen.getAllByRole('checkbox')

  fireEvent.click(opcoes()[1]) // a "60mm PERSONALIZADA"
  fireEvent.click(botaoAdicionar())

  expect(useCart.getState().itens[0].variacaoResumo).toBe('Tamanho: 60mm (PERSONALIZADA)')
})

it('adicionar de novo com a mesma opção marcada SOMA a quantidade', () => {
  montar()

  fireEvent.click(cards()[0])
  fireEvent.click(botaoAdicionar())
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].quantidade).toBe(2)
})

// ---------------------------------------------------------------------------
// Fluxo antigo (produto com MAIS de um grupo de variação)
// ---------------------------------------------------------------------------

const opcoesRadio = () => screen.getAllByRole('radio')
const campoQtd = () => screen.getByLabelText('Quantidade')

it('produto com vários grupos continua no fluxo de seleção única + quantidade no fim', () => {
  montar(corteVinco)

  expect(opcoesRadio()).toHaveLength(2)
  expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  expect(campoQtd()).toBeInTheDocument()
})

it('escolher uma opção apenas seleciona — não coloca nada no orçamento', () => {
  montar(corteVinco)
  fireEvent.click(opcoesRadio()[0])

  expect(useCart.getState().itens).toHaveLength(0)
  expect(opcoesRadio()[0]).toHaveAttribute('aria-checked', 'true')
  expect(opcoesRadio()[1]).toHaveAttribute('aria-checked', 'false')
})

it('não dá para adicionar ao orçamento sem escolher todos os grupos', () => {
  montar(corteVinco)

  expect(botaoAdicionar()).toBeDisabled()
  fireEvent.click(botaoAdicionar())
  expect(useCart.getState().itens).toHaveLength(0)
})

it('adiciona o item com a quantidade digitada', () => {
  montar(corteVinco)

  fireEvent.click(opcoesRadio()[0])
  fireEvent.click(screen.getAllByRole('button', { name: /pardo/i })[0])
  fireEvent.change(campoQtd(), { target: { value: '25' } })
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(1)
  expect(itens[0].quantidade).toBe(25)
  expect(itens[0].variacaoResumo).toBe('Onda: B | Cor: Pardo')
})

it('configurações diferentes viram LINHAS diferentes do orçamento', () => {
  montar(corteVinco)

  fireEvent.click(opcoesRadio()[0])
  fireEvent.click(screen.getAllByRole('button', { name: /pardo/i })[0])
  fireEvent.click(botaoAdicionar())

  fireEvent.click(opcoesRadio()[1])
  fireEvent.click(botaoAdicionar())

  const { itens } = useCart.getState()
  expect(itens).toHaveLength(2)
})
