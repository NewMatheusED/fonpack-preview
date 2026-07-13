import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Guia } from '../typings'

export type GuiaCardProps = {
  guia: Guia
  className?: string
}

/**
 * Card reutilizável dos guias (verde ou creme): título serif, descrição e uma
 * imagem no canto inferior direito. Usado no bento "Tem alguma dúvida?" da
 * home e na seção `ConfiraMais` de cada página de guia.
 */
export default function GuiaCard({ guia, className }: GuiaCardProps) {
  const isVerde = guia.tema === 'verde'

  return (
    <Link
      to={`/guia/${guia.slug}`}
      className={cn(
        'group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1',
        isVerde ? 'bg-brand-primary' : 'bg-brand-surface-2',
        className,
      )}
    >
      <div className="relative z-10 max-w-[62%]">
        <h3
          className={cn(
            'font-serif text-2xl leading-snug sm:text-3xl',
            isVerde ? 'text-brand-surface' : 'text-brand-primary',
          )}
        >
          {guia.chamada}
        </h3>
        <p className={cn('mt-3 text-sm sm:text-base', isVerde ? 'text-brand-surface/85' : 'text-brand-muted')}>
          {guia.subtitulo}
        </p>
      </div>

      <img
        src={guia.cardImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 right-0 h-[62%] w-[55%] rounded-tl-3xl object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  )
}
