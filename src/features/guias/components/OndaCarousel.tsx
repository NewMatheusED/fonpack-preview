import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Onda } from '../typings'

type OndaCarouselProps = {
  ondas: Onda[]
}

/**
 * As cinco ondas. No desktop cabem todas lado a lado, então viram um grid — um
 * "carrossel" que não rola só deixa setas mortas boiando e um vão à direita.
 * Abaixo disso, rola na horizontal com scroll-snap (swipe no celular, setas no
 * tablet), e as setas só aparecem quando há mesmo para onde rolar.
 *
 * Cada card é uma coluna flex: a imagem fica na proporção fixa e a linha da onda
 * é ancorada na base (`mt-auto`). Sem isso, o texto "Diferenças visuais" — que
 * tem uma ou duas linhas dependendo da onda — empurrava a onda para alturas
 * diferentes em cada card, e a fileira saía toda torta.
 */
export default function OndaCarousel({ ondas }: OndaCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [rolavel, setRolavel] = useState(false)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const conferir = () => setRolavel(scroller.scrollWidth > scroller.clientWidth + 4)
    conferir()

    const observer = new ResizeObserver(conferir)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  function rolar(direcao: 1 | -1) {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-onda-card]')
    scroller.scrollBy({ left: ((card?.offsetWidth ?? 280) + 24) * direcao, behavior: 'smooth' })
  }

  const seta =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-surface text-brand-primary shadow-md transition-transform hover:scale-110 sm:flex lg:hidden'

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {rolavel && (
        <button type="button" onClick={() => rolar(-1)} aria-label="Onda anterior" className={`${seta} left-6`}>
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* No desktop os cards herdam as faixas do grid pai (`subgrid`): título,
          bullets, imagem, descrição e onda ficam alinhados entre os cinco sem
          altura chumbada. Sem isso, "Embalagens para brindes" quebrando em duas
          linhas na Onda D empurrava a imagem dela para baixo das outras. */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 lg:grid lg:grid-cols-5 lg:grid-rows-[auto_auto_auto_1fr_auto] lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ondas.map((onda) => (
          <article
            key={onda.nome}
            data-onda-card
            className="flex w-[260px] shrink-0 snap-start flex-col gap-4 rounded-3xl bg-brand-surface p-6 sm:w-[280px] lg:row-span-5 lg:grid lg:w-auto lg:grid-rows-subgrid"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif text-2xl text-brand">{onda.nome}</h3>
              <span className="mt-1.5 shrink-0 text-xs font-medium text-brand-primary underline underline-offset-2">
                {onda.label}
              </span>
            </div>

            <ul className="space-y-1 text-sm text-brand-muted">
              {onda.bullets.map((bullet) => (
                <li key={bullet} className="list-inside list-disc">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
              <img
                src={onda.imagem}
                alt={`Corte transversal da ${onda.nome}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-brand">Diferenças visuais:</p>
              <p className="text-sm text-brand-muted">{onda.diferencasVisuais}</p>
            </div>

            {/* mt-auto vale no mobile (coluna flex); no desktop a faixa `1fr` da
                descrição já empurra a onda para a base. */}
            <div className="mt-auto flex flex-col items-end gap-3">
              <img
                src={onda.ondaImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full flex-1 object-contain object-left"
              />
              <span className="shrink-0 text-xs text-brand-muted">{onda.espessura}</span>
            </div>
          </article>
        ))}
      </div>

      {rolavel && (
        <button type="button" onClick={() => rolar(1)} aria-label="Próxima onda" className={`${seta} right-6`}>
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
