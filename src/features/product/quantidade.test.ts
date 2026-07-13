import { it, expect } from 'vitest'
import { QTD_MAX, QTD_MIN, lerQtdDigitada, limitarQtd } from './quantidade'

it.each([
  [0, QTD_MIN],
  [-5, QTD_MIN],
  [1, 1],
  [4200, 4200],
  [9999, 9999],
  [10000, QTD_MAX],
  [999999999, QTD_MAX],
  [3.7, 3],
  // Valor não-finito é lixo, não é "quantidade infinita": cai no mínimo, que é
  // o fallback seguro. Cair no máximo mandaria 9999 unidades para o vendedor.
  [NaN, QTD_MIN],
  [Infinity, QTD_MIN],
  [-Infinity, QTD_MIN],
])('limitarQtd(%s) = %s', (entrada, esperado) => {
  expect(limitarQtd(entrada)).toBe(esperado)
})

it('campo vazio devolve null — o cliente precisa poder apagar para redigitar', () => {
  expect(lerQtdDigitada('')).toBeNull()
  expect(lerQtdDigitada('abc')).toBeNull()
})

it('descarta o que não é dígito em vez de virar NaN', () => {
  expect(lerQtdDigitada('12')).toBe(12)
  expect(lerQtdDigitada('1,5')).toBe(15)
  expect(lerQtdDigitada('-3')).toBe(3)
  expect(lerQtdDigitada('12abc')).toBe(12)
})

it('digitar um número absurdo trava no máximo', () => {
  expect(lerQtdDigitada('999999999')).toBe(QTD_MAX)
})
