import type { ComponentType } from 'react'
import { Recycle, ShieldCheck, Package, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DiferencialItem = {
  icon: ComponentType<{ className?: string }>
  titulo: string
  texto: string
}

export const diferenciaisPadrao: DiferencialItem[] = [
  {
    icon: Recycle,
    titulo: 'Sustentável',
    texto: 'Materiais recicláveis e compromisso com o futuro.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Resistência',
    texto: 'Embalagens desenvolvidas para proteger o que realmente importa.',
  },
  {
    icon: Package,
    titulo: 'Personalizados',
    texto: 'Soluções sob medida para o seu negócio.',
  },
  {
    icon: Truck,
    titulo: 'Entrega rápida',
    texto: 'Agilidade e eficiência em todo o Brasil.',
  },
]

type DiferenciaisBandProps = {
  variant?: 'verde' | 'creme'
  items?: DiferencialItem[]
}

export default function DiferenciaisBand({
  variant = 'verde',
  items = diferenciaisPadrao,
}: DiferenciaisBandProps) {
  const isVerde = variant === 'verde'

  return (
    <section className={cn('py-10', isVerde ? 'bg-brand-primary text-brand-surface-2' : 'bg-brand-surface-2 text-brand-primary')}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.titulo} className="flex items-start gap-3">
              <Icon className="h-6 w-6 shrink-0" />
              <div>
                <h3 className="font-sans text-sm font-semibold">{item.titulo}</h3>
                <p className={cn('mt-1 text-sm', isVerde ? 'text-brand-surface-2/80' : 'text-brand-primary/70')}>
                  {item.texto}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
