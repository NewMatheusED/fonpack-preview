// Extrai os 35 produtos + imagens do site de referência Framer e gera
// src/features/catalog/data/produtos.ts. Script de build-time (não é publicado).
//
// Uso: node scripts/extract-framer.mjs
//
// Como funciona:
// 1. Lê docs/reference/data/searchindex.json para obter as 35 rotas /catalogo/<slug>
//    e o breadcrumb h6 (usado para o nome + categoria de cada produto).
// 2. Renderiza /loja uma vez (headless Chrome) para capturar o "badge" (subtítulo do
//    card) de cada produto — os cards são <a href="./catalogo/...">, cada um com dois
//    <p> (nome, badge) dentro de um RichTextContainer.
// 3. Para cada rota, renderiza a página do produto e faz parsing estrutural do DOM
//    (classes fp-right-area, fp-stepper-*, card-interactive, color-gallery,
//    switch-container, custom-input-text, fp-desc-area, fp-image-area) — descoberto
//    inspecionando o HTML renderizado ao vivo, não apenas o texto de render-report.json.
// 4. Baixa a imagem principal do produto (fp-image-area) e converte para .webp via sharp.
// 5. Para grupos "swatch" (cor), baixa a imagem do swatch e calcula a cor média (1x1)
//    como aproximação do hex — o site não expõe o valor de cor cru no DOM.
// 6. Escreve src/features/catalog/data/produtos.ts com os 35 produtos.

import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'https://enlivened-pomegranate-317762-1e9fffd39.framer.app'

/** Mapa nome da categoria (breadcrumb h6[2]) -> categoriaId (src/features/catalog/data/categorias.ts) */
const CAT = {
  Acessório: 'acessorio',
  Bobina: 'bobina',
  Caixa: 'caixa',
  Cantoneira: 'cantoneira',
  Fita: 'fita',
}

/** Os 5 produtos que aparecem na home (seção "Nossos produtos") */
const DESTAQUE_SLUGS = new Set(['acrilica', 'plastico-bolha', 'corte-vinco', 'maleta-30', 'divisoria'])

/** Cores conhecidas (fallback caso o download/sample da imagem do swatch falhe) */
const KNOWN_COLOR_HEX = { pardo: '#c9a66b', branco: '#ffffff', preto: '#111111' }

function toSlug(raw) {
  return raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/["']/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

function slugifyValue(label) {
  return toSlug(label)
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function stripStepNumber(titulo) {
  return titulo ? titulo.replace(/^\d+[°º]?:\s*/, '').trim() : titulo
}

function fallbackTitulo(grupo) {
  if (grupo.tipo === 'opcoes') {
    const ondaSet = ['B', 'C', 'D', 'BB', 'BC']
    const labels = grupo.opcoes.map(o => o.label)
    if (labels.length && labels.every(l => ondaSet.includes(l))) return 'Escolha a onda que deseja'
    return 'Escolha a opção desejada'
  }
  if (grupo.tipo === 'swatch') return 'Selecione a Cor'
  if (grupo.tipo === 'texto') return 'Dimensões customizadas'
  if (grupo.tipo === 'toggle') return grupo.label || 'Personalização'
  return 'Variação'
}

async function avgColorHex(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const { data } = await sharp(buf).resize(1, 1).raw().toBuffer({ resolveWithObject: true })
  const [r, g, b] = data
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

async function swatchColor(label, src) {
  try {
    return await avgColorHex(src)
  } catch {
    const key = toSlug(label).replace(/-/g, '')
    return KNOWN_COLOR_HEX[key] || '#cccccc'
  }
}

// ---------------------------------------------------------------------------

const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/reference/data/searchindex.json'), 'utf-8'))
const rotas = Object.keys(idx).filter(u => u.startsWith('/catalogo/'))

console.log(`Encontradas ${rotas.length} rotas de produto em searchindex.json`)

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })

// --- 1) badges + nome + imagem de fallback via /loja ------------------------
console.log('Renderizando /loja para capturar badges...')
const lojaPage = await browser.newPage()
await lojaPage.goto(BASE + '/loja', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise(r => setTimeout(r, 2500))
const lojaCards = await lojaPage.evaluate(() => {
  return Array.from(document.querySelectorAll('a[href*="catalogo/"]')).map(a => {
    const paras = Array.from(a.querySelectorAll('p'))
    const img = a.querySelector('img')
    return {
      href: a.getAttribute('href').replace(/^\.\//, '/'),
      nome: paras[0]?.textContent?.trim() || '',
      badge: paras[1]?.textContent?.trim() || '',
      imagem: img?.src || '',
    }
  })
})
await lojaPage.close()
console.log(`  -> ${lojaCards.length} cards capturados na /loja`)
const badgeByRoute = new Map(lojaCards.map(c => [c.href, c]))

// --- 2) cada página de produto ----------------------------------------------
const produtos = []
const avisos = []

for (const rota of rotas) {
  const meta = idx[rota] ?? {}
  const nomeIdx = meta.h1?.[0] || (meta.title || '').replace(' - FonPack', '')
  const categoriaNome = meta.h6?.[2] || ''
  const categoriaId = CAT[categoriaNome] || ''
  if (!categoriaId) avisos.push(`${rota}: categoria "${categoriaNome}" não mapeada`)
  const slug = toSlug(decodeURIComponent(rota.replace('/catalogo/', '')))

  const page = await browser.newPage()
  let dados = { nome: '', stepperLabels: [], descricao: [], imagens: [], grupos: [] }
  try {
    await page.goto(BASE + encodeURI(rota), { waitUntil: 'networkidle2', timeout: 60000 })
    await new Promise(r => setTimeout(r, 2500))
    dados = await page.evaluate(() => {
      const right = document.querySelector('.fp-right-area')
      const nome = right?.querySelector('h1')?.textContent?.trim() || document.querySelector('h1')?.textContent?.trim() || ''
      const stepperLabels = Array.from(document.querySelectorAll('.fp-stepper-labels .fp-step-label-text')).map(s => s.textContent.trim())
      const descricao = Array.from(document.querySelectorAll('.fp-desc-area li')).map(li => li.textContent.trim()).filter(Boolean)
      const imagens = Array.from(document.querySelectorAll('.fp-image-area img')).map(img => img.src).filter(Boolean)

      const grupos = []
      if (right) {
        for (const child of Array.from(right.children)) {
          const labelEl = child.querySelector(':scope > label')
          const labelText = labelEl?.textContent?.trim()

          if (child.querySelector('.card-interactive')) {
            const opcoes = Array.from(child.querySelectorAll('.card-interactive')).map(card => {
              const span = card.querySelector('span')
              const label = span?.textContent?.trim() || ''
              const col = span?.closest('div')?.parentElement
              let sublabel
              if (col && col.children.length > 1) sublabel = col.children[1]?.textContent?.trim() || undefined
              return { label, sublabel }
            })
            grupos.push({ tipo: 'opcoes', titulo: labelText, opcoes })
          } else if (child.querySelector('.color-gallery')) {
            const opcoes = Array.from(child.querySelectorAll('.color-img-btn img')).map((img, i) => ({
              label: img.alt || `Opção ${i + 1}`,
              src: img.src,
            }))
            grupos.push({ tipo: 'swatch', titulo: labelText, opcoes })
          } else if (child.querySelector('.switch-container')) {
            const sw = child.querySelector('.switch-container')
            const spans = sw.querySelectorAll('span')
            const label = spans[0]?.textContent?.trim() || ''
            const helperDiv = sw.querySelector(':scope > div > div')
            const ajuda = helperDiv?.textContent?.trim() || undefined
            grupos.push({ tipo: 'toggle', titulo: labelText, label, ajuda })
          } else if (child.querySelector('input.custom-input-text')) {
            const input = child.querySelector('input.custom-input-text')
            grupos.push({ tipo: 'texto', titulo: labelText, placeholder: input.placeholder || '' })
          }
        }
      }
      return { nome, stepperLabels, descricao, imagens, grupos }
    })
  } catch (e) {
    console.error(`  ERRO ao renderizar ${rota}: ${e}`)
    avisos.push(`${slug}: falha ao renderizar (${String(e).slice(0, 150)})`)
  }
  await page.close()

  // --- monta variacoes[] no formato final (Produto/VariationGroup) ---
  const variacoes = []
  for (const g of dados.grupos) {
    const titulo = stripStepNumber(g.titulo) || fallbackTitulo(g)
    if (g.tipo === 'opcoes') {
      variacoes.push({
        tipo: 'opcoes',
        titulo,
        // value inclui o sublabel: alguns produtos repetem o mesmo label com
        // sublabels diferentes (ex.: "COM TUBO" / "SEM TUBO"), e o value precisa
        // ser único para servir de identificador da opção.
        opcoes: g.opcoes.map(o => ({
          label: o.label,
          sublabel: o.sublabel,
          value: slugifyValue(o.sublabel ? `${o.label}-${o.sublabel}` : o.label),
        })),
      })
    } else if (g.tipo === 'swatch') {
      const opcoes = []
      for (const o of g.opcoes) opcoes.push({ label: o.label, cor: await swatchColor(o.label, o.src) })
      variacoes.push({ tipo: 'swatch', titulo, opcoes })
    } else if (g.tipo === 'toggle') {
      variacoes.push({ tipo: 'toggle', titulo, label: g.label, ajuda: g.ajuda })
    } else if (g.tipo === 'texto') {
      variacoes.push({ tipo: 'texto', titulo, placeholder: g.placeholder || 'Ex: 48x50x50' })
    }
  }
  if (variacoes.length === 0) avisos.push(`${slug}: nenhum grupo de variação detectado`)
  for (const g of variacoes) {
    if (g.tipo !== 'opcoes') continue
    const values = g.opcoes.map(o => o.value)
    const dupes = values.filter((v, i) => values.indexOf(v) !== i)
    if (dupes.length) avisos.push(`${slug}: values duplicados no grupo "${g.titulo}": ${[...new Set(dupes)].join(', ')}`)
  }

  // --- imagens: preferir as da própria página; fallback para o card da /loja ---
  const cardLoja = badgeByRoute.get(rota)
  let imageUrls = dados.imagens
  if (imageUrls.length === 0 && cardLoja?.imagem) imageUrls = [cardLoja.imagem]

  const dir = path.join(ROOT, 'public/produtos', slug)
  fs.mkdirSync(dir, { recursive: true })
  const imagensLocais = []
  for (const [i, url] of imageUrls.entries()) {
    try {
      const cleanUrl = url.split('?')[0]
      const res = await fetch(cleanUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      const dest = path.join(dir, `${i}.webp`)
      await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest)
      imagensLocais.push(`/produtos/${slug}/${i}.webp`)
    } catch (e) {
      console.error(`  ERRO ao baixar imagem de ${slug}: ${e}`)
    }
  }
  if (imagensLocais.length === 0) avisos.push(`${slug}: nenhuma imagem baixada`)

  const badge = cardLoja?.badge || ''
  if (!badge) avisos.push(`${slug}: badge vazio (produto não encontrado na /loja)`)
  const nome = dados.nome || cardLoja?.nome || nomeIdx

  produtos.push({
    slug,
    nome,
    categoriaId,
    badge,
    imagens: imagensLocais,
    descricao: dados.descricao,
    destaque: DESTAQUE_SLUGS.has(slug) || undefined,
    stepper: variacoes.length > 1 ? dados.stepperLabels : undefined,
    variacoes,
  })

  console.log(
    `[${produtos.length}/${rotas.length}] ${slug} — ${variacoes.length} grupo(s) de variação, ${imagensLocais.length} imagem(ns)`,
  )
}

await browser.close()

// --- 3) escreve produtos.ts --------------------------------------------------
const header = `import type { Produto } from '../typings'\n\n// Gerado por scripts/extract-framer.mjs a partir do site de referência Framer.\n// Revisar manualmente contra docs/reference/screenshots/*.png antes de confiar\n// cegamente nos grupos de variação — ver task-6-report.md para a lista de\n// produtos com dados incertos.\nexport const produtos: Produto[] = `
const body = JSON.stringify(produtos, null, 2)
fs.writeFileSync(path.join(ROOT, 'src/features/catalog/data/produtos.ts'), `${header}${body}\n`)

console.log(`\nGerados ${produtos.length} produtos`)
if (avisos.length) {
  console.log(`\n${avisos.length} aviso(s):`)
  for (const a of avisos) console.log(`  - ${a}`)
} else {
  console.log('Nenhum aviso.')
}
