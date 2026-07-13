import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Onda } from '../typings'
import OndaWave from './OndaWave'

type OndaCarouselProps = {
  ondas: Onda[]
}

/** Carrossel horizontal (scroll-snap) dos 5 cards de onda — setas no desktop, swipe no mobile. */
export default function OndaCarousel({ ondas }: OndaCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-onda-card]')
    const amount = (card?.offsetWidth ?? 280) + 24
    scroller.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Onda anterior"
        className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-brand-surface p-2 text-brand-primary shadow-md transition-transform hover:scale-110 sm:flex lg:-left-4"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ondas.map((onda) => (
          <article
            key={onda.nome}
            data-onda-card
            className="flex w-[260px] shrink-0 snap-start flex-col rounded-3xl bg-brand-surface-2 p-6 sm:w-[280px]"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif text-2xl text-brand">{onda.nome}</h3>
              <span className="mt-1.5 shrink-0 text-xs font-medium text-brand-primary underline underline-offset-2">
                {onda.label}
              </span>
            </div>

            <ul className="mt-3 space-y-1 text-sm text-brand-muted">
              {onda.bullets.map((bullet) => (
                <li key={bullet} className="list-inside list-disc">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
              <img
                src={onda.imagem}
                alt={`Corte transversal da ${onda.nome}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-brand">Diferenças visuais:</p>
            <p className="text-sm text-brand-muted">{onda.diferencasVisuais}</p>

            <div className="mt-4 flex items-center gap-3">
              <OndaWave
                colorClass={onda.corClass}
                amplitude={onda.amplitude}
                frequencia={onda.frequencia}
                camadas={onda.camadas}
                className="flex-1"
              />
              <span className="shrink-0 text-xs text-brand-muted">{onda.espessura}</span>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Próxima onda"
        className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-brand-surface p-2 text-brand-primary shadow-md transition-transform hover:scale-110 sm:flex lg:-right-4"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
