import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

/** Domínio canônico do site. Usado para montar URLs absolutas em canonical,
 *  og:url e og:image — obrigatórias para o WhatsApp/Facebook conseguirem
 *  gerar preview de link (uma og:image relativa é ignorada por eles). */
const SITE_URL = 'https://fonpackembalagens.com.br'

type SeoProps = {
  /** Título da página. Já deve incluir o sufixo da marca quando fizer sentido. */
  titulo: string
  /** Descrição curta (~150-160 caracteres) usada em meta description e OG. */
  descricao: string
  /** Caminho (relativo ao domínio) de uma imagem representativa da página. */
  imagem?: string
  /** Quando true, pede para os buscadores não indexarem a página (ex.: 404). */
  semIndexacao?: boolean
}

export default function Seo({ titulo, descricao, imagem, semIndexacao }: SeoProps) {
  const { pathname } = useLocation()
  const url = `${SITE_URL}${pathname}`
  const imagemAbsoluta = imagem
    ? imagem.startsWith('http')
      ? imagem
      : `${SITE_URL}${imagem}`
    : undefined

  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />
      {semIndexacao && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:url" content={url} />
      {imagemAbsoluta && <meta property="og:image" content={imagemAbsoluta} />}

      <meta name="twitter:card" content={imagemAbsoluta ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descricao} />
      {imagemAbsoluta && <meta name="twitter:image" content={imagemAbsoluta} />}
    </Helmet>
  )
}
