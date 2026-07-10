import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

it('mostra o whatsapp da empresa', () => {
  render(<MemoryRouter><Footer /></MemoryRouter>)
  expect(screen.getByText(/94250-8424/)).toBeInTheDocument()
})
