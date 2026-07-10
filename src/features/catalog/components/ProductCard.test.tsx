import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const p = { slug: 'corte-vinco', nome: 'Caixa Corte vinco', categoriaId: 'caixa', badge: 'Suas medidas', imagens: ['/produtos/corte-vinco/0.webp'], descricao: [], variacoes: [] }

it('mostra nome, selo e link para o produto', () => {
  render(<MemoryRouter><ProductCard produto={p} /></MemoryRouter>)
  expect(screen.getByText('Caixa Corte vinco')).toBeInTheDocument()
  expect(screen.getByText('Suas medidas')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/catalogo/corte-vinco')
})
