// Recorta as fotos dos cards de guia a partir dos PNGs NATIVOS do bento do
// Framer (docs/reference/audit/bento/*.png).
//
// Por que existe: o Framer exportou cada card do bento como uma imagem chapada
// com o texto queimado dentro. Nós renderizamos o texto em HTML (acessível e
// indexável), então precisamos só da parte da foto. As versões anteriores foram
// recortadas de .webp já comprimidos e re-encodadas — compressão sobre
// compressão, daí o borrão — e com recortes apertados que cortavam objetos ao
// meio (a bobina de kraft sumia inteira do card de materiais).
//
// Uso: node scripts/recortar-cards.mjs

import sharp from 'sharp'
import fs from 'node:fs'

const ORIGEM = 'docs/reference/audit/bento'
const DESTINO = 'public/guias'

const RECORTES = [
  {
    nome: 'medidas-card',
    arquivo: 'medidas.png', // 406x487 — é o tamanho nativo, não existe maior
    // Só a foto: o rótulo creme está queimado no canto inferior esquerdo
    // (a partir de y≈340) e é reconstruído em HTML pelo GuiaCard.
    recorte: { left: 0, top: 0, width: 406, height: 335 },
  },
  {
    nome: 'onda-card',
    arquivo: 'onda.png', // 1175x734
    // A pilha de papelão ondulado no canto inferior direito, com a folga verde
    // ao redor (o verde do PNG é o mesmo brand-primary do card, então funde).
    recorte: { left: 690, top: 300, width: 485, height: 340 },
  },
  {
    nome: 'materiais-card',
    arquivo: 'materiais.png', // 1175x734
    // A faixa inteira com os TRÊS objetos: bobina de plástico bolha, divisória
    // e bobina de papel kraft. O recorte antigo parava antes do kraft.
    recorte: { left: 0, top: 380, width: 1175, height: 354 },
  },
]

for (const { nome, arquivo, recorte } of RECORTES) {
  const origem = `${ORIGEM}/${arquivo}`
  const destino = `${DESTINO}/${nome}.webp`

  const { width, height } = await sharp(origem).metadata()
  const cabe =
    recorte.left + recorte.width <= width && recorte.top + recorte.height <= height
  if (!cabe) {
    throw new Error(`recorte de ${nome} estoura ${arquivo} (${width}x${height})`)
  }

  await sharp(origem).extract(recorte).webp({ quality: 88 }).toFile(destino)

  const kb = Math.round(fs.statSync(destino).size / 1024)
  console.log(`${nome.padEnd(16)} ${recorte.width}x${recorte.height}  ${kb} kB`)
}
