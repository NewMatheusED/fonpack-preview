import { it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useCart } from '../store'
import CartSheet from './CartSheet'

const item = {
  id: 'corte-vinco#b-pardo',
  produtoSlug: 'corte-vinco',
  nome: 'Caixa Corte vinco',
  variacaoResumo: 'Onda: B | Cor: Pardo',
  quantidade: 1,
}

beforeEach(() => useCart.getState().clear())

it('mostra o nome do item e um link de whatsapp para o orçamento', () => {
  useCart.getState().add(item)
  render(<CartSheet open onOpenChange={() => {}} />)

  expect(screen.getByText('Caixa Corte vinco')).toBeInTheDocument()

  const link = screen.getByRole('link', { name: /whatsapp/i })
  expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5511942508424/)
})
