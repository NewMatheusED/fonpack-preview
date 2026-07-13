// Deixa transparente o fundo chapado das fotos de produto vindas do Framer.
//
// Por quê: as fotos vieram com um creme queimado (#f5f1e7) que não é o creme da
// paleta (#f5efdd). Sobre o card, isso desenha um retângulo mais claro atrás de
// cada produto. Com fundo transparente a foto assenta em qualquer superfície e
// o asset para de amarrar a paleta.
//
// Como: flood-fill a partir das bordas — só o fundo CONECTADO à borda vira
// transparente. Um match global de cor abriria buracos dentro de produtos claros
// (bobina de plástico bolha, filme stretch, fita acrílica).
//
// Uso: node scripts/tirar-fundo-produtos.mjs

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAIZ = 'public/produtos'
const TOLERANCIA = 26 // distância euclidiana RGB até a cor do canto
const SUAVIZAR = 14 // faixa de meio-tom nas bordas do objeto (antisserrilhado)

function distancia(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

async function processar(arquivo) {
  // Lê para a memória antes: no Windows o sharp mantém o arquivo aberto e
  // sobrescrevê-lo (ou renomear por cima) dá EPERM.
  const original = fs.readFileSync(arquivo)
  const { data, info } = await sharp(original).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info

  const idx = (x, y) => (y * w + x) * c
  const fundo = [data[0], data[1], data[2]] // canto superior esquerdo

  const visitado = new Uint8Array(w * h)
  const fila = []

  // semeia a fila com todos os pixels de borda que parecem fundo
  const semear = (x, y) => {
    const i = idx(x, y)
    const d = distancia(data[i], data[i + 1], data[i + 2], ...fundo)
    if (d <= TOLERANCIA + SUAVIZAR) {
      visitado[y * w + x] = 1
      fila.push([x, y])
    }
  }
  for (let x = 0; x < w; x++) {
    semear(x, 0)
    semear(x, h - 1)
  }
  for (let y = 0; y < h; y++) {
    semear(0, y)
    semear(w - 1, y)
  }

  let transparentes = 0
  while (fila.length) {
    const [x, y] = fila.pop()
    const i = idx(x, y)
    const d = distancia(data[i], data[i + 1], data[i + 2], ...fundo)

    // dentro da tolerância: fundo puro. Na faixa de suavização: meio-tom, para a
    // borda do objeto não ficar serrilhada.
    if (d <= TOLERANCIA) {
      data[i + 3] = 0
      transparentes++
    } else if (d <= TOLERANCIA + SUAVIZAR) {
      data[i + 3] = Math.round(((d - TOLERANCIA) / SUAVIZAR) * 255)
    } else {
      continue // é objeto: para de propagar por aqui
    }

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
      if (visitado[ny * w + nx]) continue
      visitado[ny * w + nx] = 1
      fila.push([nx, ny])
    }
  }

  const saida = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 90, alphaQuality: 100 })
    .toBuffer()
  fs.writeFileSync(arquivo, saida)

  return Math.round((transparentes / (w * h)) * 100)
}

const pastas = fs.readdirSync(RAIZ).filter((d) => fs.statSync(path.join(RAIZ, d)).isDirectory())
let ok = 0
const suspeitos = []

for (const pasta of pastas) {
  const arquivo = path.join(RAIZ, pasta, '0.webp')
  if (!fs.existsSync(arquivo)) continue

  const pct = await processar(arquivo)
  ok++

  // Um fundo saudável ocupa a maior parte da imagem. Muito pouco = não achou o
  // fundo; quase tudo = comeu o produto. Os dois casos merecem olho humano.
  if (pct < 25 || pct > 92) suspeitos.push(`${pasta} (${pct}% transparente)`)
}

console.log(`${ok} fotos processadas`)
if (suspeitos.length) {
  console.log('\nCONFERIR À MÃO:')
  suspeitos.forEach((s) => console.log('  ' + s))
} else {
  console.log('nenhuma suspeita — todas ficaram entre 25% e 92% de fundo')
}
