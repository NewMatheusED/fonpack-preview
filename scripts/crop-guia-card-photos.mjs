// As imagens em public/home/bento-*.webp são exports do Framer com o texto do
// card já "queimado" no PNG (título + descrição renderizados na própria imagem).
// Isso é ruim pra acessibilidade/SEO, então o bento da home e o GuiaCard
// renderizam o texto em HTML de verdade — aqui a gente só recorta a FOTO limpa
// (sem nenhum texto) de dentro de cada bento-*.webp pra usar como imagem de
// canto/fundo do card.
//
// Uso: node scripts/crop-guia-card-photos.mjs

import sharp from 'sharp'

const RECORTES = [
  // mão medindo a caixa com trena — bento-medidas.webp tem um cartão de texto
  // flutuante colado no canto inferior esquerdo; mantém só a faixa de cima,
  // que é 100% foto.
  {
    origem: 'public/home/bento-medidas.webp',
    destino: 'public/guias/medidas-card.webp',
    extract: { left: 0, top: 0, width: 406, height: 335 },
  },
  // pilha de chapa ondulada — bento-onda.webp tem o texto em cima/à esquerda;
  // recorta a faixa de baixo à direita, onde só tem a foto (e já mostra bem
  // a textura da onda, que é o ponto da imagem).
  {
    origem: 'public/home/bento-onda.webp',
    destino: 'public/guias/onda-card.webp',
    extract: { left: 480, top: 390, width: 420, height: 172 },
  },
  // bobina de bolha + divisória + bobina kraft — bento-materiais.webp tem o
  // texto no topo; recorta só a faixa de baixo com as 3 fotos.
  {
    origem: 'public/home/bento-materiais.webp',
    destino: 'public/guias/materiais-card.webp',
    extract: { left: 0, top: 295, width: 900, height: 267 },
  },
]

for (const { origem, destino, extract } of RECORTES) {
  await sharp(origem).extract(extract).toFile(destino)
  console.log(`${origem} -> ${destino}`, extract)
}
