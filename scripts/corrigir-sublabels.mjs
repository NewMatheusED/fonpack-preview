// Recupera os sublabels das opções de variação que o extrator original perdeu.
//
// Por quê: três produtos (gomada, bobina-stretch, fita-acrilica-personalizada)
// têm opções com o MESMO label — "60mm" aparece duas vezes, uma normal e outra
// personalizada. No Framer elas se distinguem por um sublabel abaixo do nome
// ("PERSONALIZADA", "FUNDO BRANCO", "SEM TUBO"). Sem ele, o cliente vê duas
// linhas idênticas e não sabe qual escolher — e o pedido chega ambíguo no
// WhatsApp.
//
// Uso: node scripts/corrigir-sublabels.mjs

import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'https://enlivened-pomegranate-317762-1e9fffd39.framer.app'
const ARQUIVO = 'src/features/catalog/data/produtos.ts'

const fonte = fs.readFileSync(ARQUIVO, 'utf8')
const marcador = fonte.match(/(export const produtos[^=]*=\s*)(\[[\s\S]*\])(\s*;?\s*)$/m)
const produtos = JSON.parse(marcador[2])
// Tudo que vem ANTES do `export const` (o `import type { Produto }` e os
// comentários do topo) precisa voltar no arquivo — reescrever só a partir do
// match deixaria o arquivo sem o import e o build quebraria.
const cabecalho = fonte.slice(0, marcador.index)

// Nossos slugs são sem acento ("acrilica"); os do Framer têm ("acrílica"). Sem
// este mapa as páginas 404am e o scraper acha zero opção.
const semAcento = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
const sitemap = await fetch(`${BASE}/sitemap_pt-BR.xml`).then((r) => r.text())
const rotaFramer = new Map(
  [...sitemap.matchAll(/<loc>[^<]*\/catalogo\/([^<]+)<\/loc>/g)]
    .map((m) => decodeURIComponent(m[1]))
    .map((slug) => [semAcento(slug), slug]),
)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
})

let alterados = 0

for (const produto of produtos) {
  const grupos = produto.variacoes.filter((v) => v.tipo === 'opcoes')
  if (!grupos.length) continue

  const slugFramer = rotaFramer.get(produto.slug)
  if (!slugFramer) {
    console.log(`⚠ ${produto.slug}: sem rota correspondente no sitemap do Framer`)
    continue
  }

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000 })
  await page.goto(`${BASE}/catalogo/${encodeURIComponent(slugFramer)}`, {
    waitUntil: 'networkidle0',
    timeout: 90000,
  })
  await new Promise((r) => setTimeout(r, 2500))

  // O Framer não usa <p> nas linhas de opção — o texto vive em divs soltas. A
  // linha é `.card-row-top` (o ancestral do botão "+"), e o innerText dela vem
  // como "LABEL\nSUBLABEL\n+".
  const linhas = await page.evaluate(() => {
    const botoes = [...document.querySelectorAll('button')].filter(
      (b) => b.innerText.trim() === '+',
    )
    return botoes.map((botao) => {
      const linha = botao.closest('.card-row-top') ?? botao.parentElement?.parentElement
      const textos = (linha?.innerText ?? '')
        .split('\n')
        .map((t) => t.trim())
        .filter((t) => t && t !== '+')
      return { label: textos[0] ?? null, sublabel: textos[1] ?? null }
    })
  })

  const opcoes = grupos.flatMap((g) => g.opcoes)
  if (linhas.length !== opcoes.length) {
    console.log(
      `⚠ ${produto.slug}: ${linhas.length} linhas no Framer vs ${opcoes.length} opções no dado — pulando`,
    )
    await page.close()
    continue
  }

  opcoes.forEach((opcao, i) => {
    const { sublabel } = linhas[i]
    if (sublabel && sublabel !== opcao.sublabel) {
      opcao.sublabel = sublabel
      alterados++
      console.log(`  ${produto.slug}: "${opcao.label}" → sublabel "${sublabel}"`)
    }
  })

  await page.close()
}

await browser.close()

const corpo = JSON.stringify(produtos, null, 2)
fs.writeFileSync(ARQUIVO, cabecalho + marcador[1] + corpo + marcador[3])
console.log(`\n${alterados} sublabel(s) recuperado(s)`)
