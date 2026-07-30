// Gera public/sitemap.xml a partir das rotas estáticas + dos slugs de produto e
// de guia. Roda antes do build (ver script "build" no package.json) para o
// sitemap nunca ficar desatualizado em relação ao catálogo.
//
// Lê os slugs via regex direto dos arquivos-fonte em vez de importar os módulos
// TS, pra não depender de suporte a TypeScript no Node do ambiente de build.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raiz = path.resolve(__dirname, '..')
const SITE_URL = 'https://fonpackembalagens.com.br'

function extrairSlugs(caminhoRelativo) {
  const conteudo = fs.readFileSync(path.join(raiz, caminhoRelativo), 'utf-8')
  return [...conteudo.matchAll(/slug["']?\s*:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
}

const produtoSlugs = extrairSlugs('src/features/catalog/data/produtos.ts')
const guiaSlugs = extrairSlugs('src/features/guias/data/guias.ts')

const rotasEstaticas = [
  { caminho: '/', prioridade: '1.0', frequencia: 'weekly' },
  { caminho: '/loja', prioridade: '0.9', frequencia: 'weekly' },
  { caminho: '/sobre-nos', prioridade: '0.5', frequencia: 'monthly' },
  { caminho: '/fale-conosco', prioridade: '0.5', frequencia: 'monthly' },
]

const rotasProdutos = produtoSlugs.map((slug) => ({
  caminho: `/catalogo/${slug}`,
  prioridade: '0.8',
  frequencia: 'monthly',
}))

const rotasGuias = guiaSlugs.map((slug) => ({
  caminho: `/guia/${slug}`,
  prioridade: '0.6',
  frequencia: 'monthly',
}))

const todasRotas = [...rotasEstaticas, ...rotasProdutos, ...rotasGuias]

const hoje = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${todasRotas
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.caminho}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>${r.frequencia}</changefreq>
    <priority>${r.prioridade}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(raiz, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml gerado com ${todasRotas.length} URLs (${produtoSlugs.length} produtos, ${guiaSlugs.length} guias).`)
