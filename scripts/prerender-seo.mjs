// Roda depois do `vite build`. O app é uma SPA 100% client-side: o <head>
// certo de cada página (title, description, canonical, OG, Twitter Card) só
// existe depois do react-helmet-async rodar no navegador. Bots que não
// executam JS — WhatsApp, Facebook, Bing — só veem o dist/index.html cru, que
// é sempre o da home.
//
// Aqui a gente gera uma cópia de dist/index.html por rota, com o <head>
// corrigido, em dist/<rota>/index.html. Como arquivo estático tem prioridade
// sobre rewrite no Vercel (ver vercel.json), essas cópias são servidas no
// lugar do index.html genérico — e o React assume normalmente a partir daí,
// então a navegação client-side continua igual.
//
// Extrai os dados via regex/JSON.parse direto dos arquivos-fonte (mesmo
// padrão do gerar-sitemap.mjs), sem importar os módulos TS.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, '..')
const SITE_URL = 'https://fonpackembalagens.com.br'

function extrairSeoDePagina(caminhoRelativo) {
  const conteudo = fs.readFileSync(path.join(raiz, caminhoRelativo), 'utf-8')
  return {
    titulo: conteudo.match(/titulo="([^"]+)"/)?.[1],
    descricao: conteudo.match(/descricao="([^"]+)"/)?.[1],
    imagem: conteudo.match(/imagem="([^"]+)"/)?.[1],
  }
}

function extrairProdutos() {
  const conteudo = fs.readFileSync(path.join(raiz, 'src/features/catalog/data/produtos.ts'), 'utf-8')
  const inicio = conteudo.indexOf('= [') + 2
  const json = conteudo.slice(inicio, conteudo.lastIndexOf(']') + 1)
  return JSON.parse(json)
}

const rotas = [
  { caminho: '/loja', ...extrairSeoDePagina('src/pages/LojaPage.tsx') },
  { caminho: '/sobre-nos', ...extrairSeoDePagina('src/pages/SobrePage.tsx') },
  { caminho: '/fale-conosco', ...extrairSeoDePagina('src/pages/ContatoPage.tsx') },
  { caminho: '/guia/como-tirar-medidas', ...extrairSeoDePagina('src/pages/GuiaMedidasPage.tsx') },
  { caminho: '/guia/qual-onda-escolher', ...extrairSeoDePagina('src/pages/GuiaOndaPage.tsx') },
  {
    caminho: '/guia/plastico-bolha-divisorias-ou-papel-kraft',
    ...extrairSeoDePagina('src/pages/GuiaMateriaisPage.tsx'),
  },
  ...extrairProdutos().map((p) => ({
    caminho: `/catalogo/${p.slug}`,
    titulo: `${p.nome} | FonPack Embalagens`,
    descricao: p.descricao[0],
    imagem: p.imagens[0],
  })),
]

function escaparHtml(texto) {
  return texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const template = fs.readFileSync(path.join(raiz, 'dist/index.html'), 'utf-8')

let gerados = 0
for (const { caminho, titulo, descricao, imagem } of rotas) {
  if (!titulo || !descricao) {
    console.warn(`[prerender-seo] pulando ${caminho}: título ou descrição não encontrados`)
    continue
  }

  const url = `${SITE_URL}${caminho}`
  const tituloEsc = escaparHtml(titulo)
  const descricaoEsc = escaparHtml(descricao)
  const imagemAbsoluta = imagem ? (imagem.startsWith('http') ? imagem : `${SITE_URL}${imagem}`) : undefined

  const tagsOg = `
    <meta property="og:title" content="${tituloEsc}" />
    <meta property="og:description" content="${descricaoEsc}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="${url}" />
    ${imagemAbsoluta ? `<meta property="og:image" content="${imagemAbsoluta}" />` : ''}
    <meta name="twitter:card" content="${imagemAbsoluta ? 'summary_large_image' : 'summary'}" />
    <meta name="twitter:title" content="${tituloEsc}" />
    <meta name="twitter:description" content="${descricaoEsc}" />
    ${imagemAbsoluta ? `<meta name="twitter:image" content="${imagemAbsoluta}" />` : ''}
  </head>`

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${tituloEsc}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${descricaoEsc}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<\/head>/, tagsOg)

  const destino = path.join(raiz, 'dist', ...caminho.split('/').filter(Boolean), 'index.html')
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  fs.writeFileSync(destino, html)
  gerados++
}

console.log(`prerender-seo: ${gerados} páginas com <head> próprio geradas em dist/.`)
