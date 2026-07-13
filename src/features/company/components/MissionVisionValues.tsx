import { cn } from '@/lib/utils'

type ValorCard = {
  titulo: string
  texto: string
  destaque?: boolean
}

const cards: ValorCard[] = [
  {
    titulo: 'Missão',
    texto:
      'Oferecer embalagens resistentes e funcionais que garantam proteção, praticidade e eficiência para o transporte e armazenamento de produtos.',
  },
  {
    titulo: 'Visão',
    texto:
      'Crescer de forma sólida no mercado de embalagens, sendo reconhecida pela qualidade, agilidade e confiança nas entregas.',
    destaque: true,
  },
  {
    titulo: 'Valores',
    texto:
      'Qualidade em primeiro lugar, compromisso com prazos, respeito ao cliente, melhoria contínua e responsabilidade em cada processo.',
  },
]

export default function MissionVisionValues() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-brand-primary sm:text-4xl">
          Missão, visão e valores
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-brand-muted">
          Os pilares que guiam cada embalagem que produzimos e cada cliente que atendemos.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.titulo}
            className={cn(
              'rounded-2xl p-8',
              card.destaque
                ? 'bg-brand-primary text-brand-surface'
                : 'bg-brand-surface text-brand-primary',
            )}
          >
            <h3 className="font-serif text-2xl">{card.titulo}</h3>
            <p
              className={cn(
                'mt-3 text-sm',
                card.destaque ? 'text-brand-surface/85' : 'text-brand-muted',
              )}
            >
              {card.texto}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
