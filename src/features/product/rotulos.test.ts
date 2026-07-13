import { it, expect } from 'vitest'
import { rotuloCurto } from './rotulos'

// Os 7 títulos que realmente existem em src/features/catalog/data/produtos.ts.
const CASOS: Array<[string, string]> = [
  ['Escolha a onda que deseja', 'Onda'],
  ['Escolha o tamanho que deseja', 'Tamanho'],
  ['Escolha a opção desejada', 'Opção'],
  ['Escolha a cor', 'Cor'],
  ['Selecione a Cor', 'Cor'],
  ['Dimensões customizadas', 'Dimensões'],
  ['Customização', 'Customização'],
]

it.each(CASOS)('%s -> %s', (titulo, esperado) => {
  expect(rotuloCurto(titulo)).toBe(esperado)
})

it('não devolve string vazia se o título for só a instrução', () => {
  expect(rotuloCurto('Escolha')).toBe('Escolha')
})
