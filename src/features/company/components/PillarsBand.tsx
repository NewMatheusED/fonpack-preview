import { BadgeCheck, Cog, ShieldCheck, Sparkles } from 'lucide-react'
import DiferenciaisBand, { type DiferencialItem } from '@/components/layout/DiferenciaisBand'

const pilares: DiferencialItem[] = [
  {
    icon: ShieldCheck,
    titulo: 'Segurança',
    texto: 'Proteção completa para seus produtos em todas as etapas, do transporte ao armazenamento.',
  },
  {
    icon: Sparkles,
    titulo: 'Praticidade',
    texto: 'Soluções que simplificam o dia a dia e otimizam sua operação.',
  },
  {
    icon: Cog,
    titulo: 'Eficiência',
    texto: 'Produtos desenvolvidos para oferecer desempenho e facilitar seus processos logísticos.',
  },
  {
    icon: BadgeCheck,
    titulo: 'Qualidade',
    texto: 'Materiais resistentes e confiáveis para garantir a melhor performance em cada embalagem.',
  },
]

export default function PillarsBand() {
  return <DiferenciaisBand variant="verde" items={pilares} />
}
