import { Helmet } from 'react-helmet-async'

type SeoProps = {
  /** Título da página. Já deve incluir o sufixo da marca quando fizer sentido. */
  titulo: string
  /** Descrição curta (~150-160 caracteres) usada em meta description e OG. */
  descricao: string
  /** URL (absoluta ou relativa ao domínio) de uma imagem representativa da página. */
  imagem?: string
}

export default function Seo({ titulo, descricao, imagem }: SeoProps) {
  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description" content={descricao} />

      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      {imagem && <meta property="og:image" content={imagem} />}

      <meta name="twitter:card" content={imagem ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descricao} />
      {imagem && <meta name="twitter:image" content={imagem} />}
    </Helmet>
  )
}
