export type GuiaTema = 'verde' | 'creme'

export type Guia = {
  slug: string
  /** h1 usado na própria página do guia. */
  titulo: string
  /** subtítulo da página; também reaproveitado como descrição do card. */
  subtitulo: string
  /** título curto usado no card (bento da home e "Confira mais"). */
  chamada: string
  /** imagem full-bleed do hero da página do guia. */
  heroImg: string
  /** imagem exibida no canto do card. */
  cardImg: string
  tema: GuiaTema
}

export type Onda = {
  nome: string
  label: string
  espessura: string
  /** classe Tailwind (ex.: "stroke-onda-d") — nunca hex cru no componente. */
  corClass: string
  bullets: string[]
  diferencasVisuais: string
  imagem: string
  amplitude: number
  frequencia: number
  /** 2 para ondas duplas (BB/BC), omitido (1) para as demais. */
  camadas?: number
}

export type Material = {
  titulo: string
  bullets: string[]
  beneficios: string[]
  imagem: string
}
