// Baixa os assets de marca e de conteúdo do modelo Framer (logo, fotos de hero,
// fotos dos guias) e converte para .webp em public/marca e public/guias.
//
// Uso: node scripts/baixar-assets.mjs

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const CDN = 'https://framerusercontent.com/images/'

const ALVOS = [
  // marca
  ['marca/monograma', 'RoaURLisuWuYe05Xbb9VW6twiDM.png', null],
  ['marca/wordmark', 'Gog64QYOsxKDGArTus0gWSGiwXw.png', null],
  // home
  ['home/hero', 'Cu8p3ZaOZio64kg0IF7lvVA6jNc.png', 1600],
  ['home/galpao', '2PLVTfT8X4ZC2r2GEAx8emBrM.png', 1200],
  // sobre
  ['sobre/institucional', 'DuRuJx96Ox6meZTIx0dVUoLkjeM.jpg', 1000],
  // guias — heros
  ['guias/medidas-hero', 'TRsdp31LmzvhmgZCy7EgYMdLpsI.png', 1600],
  ['guias/onda-hero', 'M0M6T4QZiJG1Vw7rxpEcJXrea2w.jpg', 1600],
  ['guias/materiais-hero', 'b6YPNIOSRRYPpPpH0M0yPvUu8.jpg', 1600],
  // guias — conteúdo
  ['guias/medidas-caixa', 'vW3h2s0im72C2a7ke4UklNdh70.png', 800],
  ['guias/medidas-card', 'EmXJUNrEAsjnFg9JEPiQDNCUeIE.png', 800],
  ['guias/materiais-bolha', 'lx49TLD7HOSCnzPZ3St1uozQqU.png', 800],
  ['guias/materiais-kraft', 'NeYlBbMyo5z06L9rX3xXZeHb1OQ.jpg', 800],
  // guias — ondas (cards do carrossel)
  ['guias/onda-d', 'z2IrqPmGDx0aR7i3vKqxJqX0Ew.png', 600],
  ['guias/onda-b', 'Aomu3Vfid7CTOJBPNhCTJc6WVQs.png', 600],
  ['guias/onda-c', 'toO6UvKC2gmKwgOHaRLJfN4wfU.png', 600],
  ['guias/onda-bb', 'cLVPx9akolCVkAMXBcofxMGmBU.png', 600],
  ['guias/onda-bc', 'WWu8k9GMHerFvZRbzDpWrdLp6U.png', 600],
]

for (const [destino, arquivo, largura] of ALVOS) {
  const url = CDN + arquivo
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`FALHOU ${destino}: ${res.status} ${url}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  const out = path.join('public', `${destino}.webp`)
  fs.mkdirSync(path.dirname(out), { recursive: true })

  let img = sharp(buf)
  if (largura) img = img.resize({ width: largura, withoutEnlargement: true })
  await img.webp({ quality: 82 }).toFile(out)

  const { size } = fs.statSync(out)
  console.log(`ok ${out} (${Math.round(size / 1024)} kB)`)
}
