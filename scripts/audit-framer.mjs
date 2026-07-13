// Auditoria de fidelidade: renderiza as páginas do modelo Framer que faltaram,
// tira screenshots (desktop + mobile), dumpa o DOM e cataloga todas as imagens/SVGs.
//
// Uso: node scripts/audit-framer.mjs
// Saída: docs/reference/audit/{shots,dom,assets.json}

import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'https://enlivened-pomegranate-317762-1e9fffd39.framer.app'

const OUT = path.join(ROOT, 'docs/reference/audit')
const SHOTS = path.join(OUT, 'shots')
const DOM = path.join(OUT, 'dom')
for (const d of [OUT, SHOTS, DOM]) fs.mkdirSync(d, { recursive: true })

const ROTAS = [
  ['home', '/'],
  ['loja', '/loja'],
  ['orcamento', '/orcamento'],
  ['entrega', '/entrega'],
  ['guia-medidas', '/guia/como-tirar-medidas'],
  ['guia-onda', '/guia/qual-onda-escolher'],
  ['guia-materiais', '/guia/pl%C3%A1stico-bolha-divis%C3%B3rias-ou-papel-kraft'],
  ['sobre', '/sobre-n%C3%B3s'],
  ['contato', '/fale-conosco'],
  ['produto', '/catalogo/bobina-kraft'],
]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
})

const assets = {}

for (const [nome, rota] of ROTAS) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(BASE + rota, { waitUntil: 'networkidle0', timeout: 90000 })
  await new Promise((r) => setTimeout(r, 2500))

  // remove os banners "Buy licence" / "Made in Framer" que poluem o screenshot
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('body > div, body > a')) {
      const t = el.textContent || ''
      if (/BUY LICENCE|Made in Framer|Framer Commerce|FRAMESHIP/i.test(t) && el.id !== 'main') {
        el.remove()
      }
    }
  })

  await page.screenshot({ path: path.join(SHOTS, `${nome}-desktop.png`), fullPage: true })

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: path.join(SHOTS, `${nome}-mobile.png`), fullPage: true })

  await page.setViewport({ width: 1440, height: 900 })
  await new Promise((r) => setTimeout(r, 800))

  // texto estruturado + imagens
  const info = await page.evaluate(() => {
    const txt = []
    const walk = (el, d) => {
      for (const c of el.children) {
        const tag = c.tagName.toLowerCase()
        if (/^(h1|h2|h3|h4|h5|h6|p|a|button|li)$/.test(tag)) {
          const t = (c.innerText || '').trim().replace(/\s+/g, ' ')
          if (t && t.length < 300) txt.push(`${'  '.repeat(d)}<${tag}> ${t}`)
        }
        if (d < 14) walk(c, d + 1)
      }
    }
    walk(document.body, 0)

    const imgs = [...document.querySelectorAll('img')]
      .map((i) => ({
        src: i.currentSrc || i.src,
        alt: i.alt,
        w: i.naturalWidth,
        h: i.naturalHeight,
        cls: i.className,
      }))
      .filter((i) => i.src && !i.src.startsWith('data:'))

    const svgs = [...document.querySelectorAll('svg')]
      .slice(0, 40)
      .map((s) => s.outerHTML)
      .filter((s) => s.length < 4000)

    return { txt: [...new Set(txt)].join('\n'), imgs, svgs }
  })

  fs.writeFileSync(path.join(DOM, `${nome}.txt`), info.txt)
  fs.writeFileSync(path.join(DOM, `${nome}.svgs.html`), info.svgs.join('\n\n'))
  assets[nome] = info.imgs
  console.log(`ok ${nome}: ${info.imgs.length} imgs, ${info.svgs.length} svgs`)
  await page.close()
}

fs.writeFileSync(path.join(OUT, 'assets.json'), JSON.stringify(assets, null, 2))
await browser.close()
console.log('done ->', OUT)
