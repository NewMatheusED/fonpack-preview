export type Categoria = { id: string; nome: string; slugPlural: string; ordem: number }

export type VariationOption = { label: string; sublabel?: string; value: string }

export type VariationGroup =
  | { titulo: string; tipo: 'opcoes'; instrucao?: string; opcoes: VariationOption[] }
  | { titulo: string; tipo: 'swatch'; instrucao?: string; opcoes: { label: string; cor: string }[] }
  | { titulo: string; tipo: 'toggle'; instrucao?: string; label: string; ajuda?: string }
  | { titulo: string; tipo: 'texto'; instrucao?: string; placeholder: string }

export type Produto = {
  slug: string
  nome: string
  categoriaId: string
  badge: string
  imagens: string[]
  descricao: string[]
  destaque?: boolean
  stepper?: string[]
  variacoes: VariationGroup[]
}
