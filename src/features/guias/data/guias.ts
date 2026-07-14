import type { Guia, Material, Onda } from '../typings'

export const guias: Guia[] = [
  {
    slug: 'como-tirar-medidas',
    titulo: 'Como tirar as medidas da sua embalagem',
    subtitulo: 'Aprenda a medir corretamente para encontrar a embalagem ideal',
    chamada: 'Como tirar medidas?',
    heroImg: '/guias/medidas-hero.webp',
    // recortada (scripts/crop-guia-card-photos.mjs) de public/home/bento-medidas.webp,
    // que veio do Framer com o texto do card queimado no PNG — aqui fica só a foto.
    cardImg: '/guias/medidas-card.webp',
    tema: 'foto',
  },
  {
    slug: 'qual-onda-escolher',
    titulo: 'Qual onda escolher?',
    subtitulo: 'Entenda as diferenças entre os tipos de onda e escolha a melhor proteção.',
    chamada: 'Qual onda devo escolher?',
    heroImg: '/guias/onda-hero.webp',
    // recortada de public/home/bento-onda.webp (mesmo motivo do medidas-card acima).
    cardImg: '/guias/onda-card.webp',
    tema: 'verde',
  },
  {
    slug: 'plastico-bolha-divisorias-ou-papel-kraft',
    titulo: 'Plástico bolha, divisórias ou papel kraft?',
    subtitulo: 'Compare os materiais e descubra qual é o mais adequado para o seu produto',
    chamada: 'Plástico bolha, Papel kraft ou divisórias?',
    heroImg: '/guias/materiais-hero.webp',
    // recortada de public/home/bento-materiais.webp (mesmo motivo do medidas-card acima).
    cardImg: '/guias/materiais-card.webp',
    tema: 'creme',
  },
]

export const ondas: Onda[] = [
  {
    nome: 'Onda D',
    label: 'Ultrafina',
    espessura: '≈ 2,2mm',
    bullets: ['Produtos leves', 'Embalagens para brindes', 'Cosméticos e acessórios'],
    diferencasVisuais: 'Ondas baixas e menos espaçadas',
    imagem: '/guias/onda-d.webp',
    ondaImg: '/ondas/D.png',
  },
  {
    nome: 'Onda B',
    label: 'Fina',
    espessura: '≈ 3mm',
    bullets: ['Caixas de e-commerce', 'Alimentos', 'Caixas para uso geral.'],
    diferencasVisuais: 'ondulações pequenas e próximas',
    imagem: '/guias/onda-b.webp',
    ondaImg: '/ondas/B.png',
  },
  {
    nome: 'Onda C',
    label: 'Média',
    espessura: '≈ 3,8mm',
    bullets: ['Vidros e cerâmicas leves', 'Produtos frágeis', 'Eletrônicos leves'],
    diferencasVisuais: 'ondas mais altas e mais espaçadas',
    imagem: '/guias/onda-c.webp',
    ondaImg: '/ondas/C.png',
  },
  {
    nome: 'Onda BB',
    label: 'Reforçada',
    espessura: '≈ 3,8mm',
    bullets: ['Transporte pesado', 'Empilhamento', 'Produtos industriais'],
    diferencasVisuais: 'Duas camadas de onda B empilhadas',
    imagem: '/guias/onda-bb.webp',
    ondaImg: '/ondas/BB.png',
  },
  {
    nome: 'Onda BC',
    label: 'Reforçada',
    espessura: '≈ 6mm',
    bullets: ['Eletrodomésticos', 'Mudanças', 'Produtos pesados e frágeis.'],
    diferencasVisuais: 'Duas camadas de onda, uma B e outra C',
    imagem: '/guias/onda-bc.webp',
    ondaImg: '/ondas/BC.png',
  },
]

export const materiais: Material[] = [
  {
    titulo: 'Plástico bolha',
    bullets: ['Produtos frágeis', 'Vidros', 'Eletrônicos', 'Cerâmicas'],
    beneficios: ['Absorve impactos', 'Protege contra riscos'],
    // materiais-bolha.webp veio com o conteúdo errado (foto de divisórias) —
    // reaproveita a foto de plástico-bolha do hero da própria página.
    imagem: '/guias/materiais-hero.webp',
  },
  {
    titulo: 'Divisórias',
    bullets: ['Garrafas', 'Frascos', 'Copos', 'Delicados'],
    beneficios: ['Evitam atritos durante o transporte'],
    imagem: '/guias/divisorias.png',
  },
  {
    titulo: 'Papel kraft',
    bullets: ['Preenchimento de espaços', 'Proteção superficial'],
    beneficios: ['Econômico', 'Reciclável', 'Versátil'],
    imagem: '/guias/materiais-kraft.webp',
  },
]
