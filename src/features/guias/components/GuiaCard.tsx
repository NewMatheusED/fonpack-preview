import { Link } from 'react-router-dom'
import { Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Guia } from '../typings'

export type GuiaCardProps = {
  guia: Guia
  className?: string
}

/**
 * Card reutilizável dos guias. Usado no bento "Tem alguma dúvida?" da home e
 * na seção `ConfiraMais` de cada página de guia — mesmo componente nos dois
 * lugares, só muda o tamanho da célula do grid ao redor.
 *
 * Temas:
 * - "verde" / "creme": fundo chapado, texto no topo, imagem no canto
 *   inferior direito (a imagem fica no seu próprio bloco, sempre abaixo do
 *   texto no fluxo — nunca sobrepõe).
 * - "foto": a imagem preenche o card inteiro; um cartão flutuante com ícone
 *   fica no canto inferior esquerdo (usado só pelo guia "como tirar medidas").
 */
export default function GuiaCard({ guia, className }: GuiaCardProps) {
  if (guia.tema === 'foto') {
    return (
      <Link
        to={`/guia/${guia.slug}`}
        className={cn(
          'group relative flex h-full min-h-[280px] overflow-hidden rounded-3xl',
          className,
        )}
      >
        <img
          src={guia.cardImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="relative z-10 mt-auto max-w-[75%] rounded-2xl bg-brand-surface p-5 shadow-sm sm:max-w-[70%]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-soft text-brand-primary">
            <Ruler className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="mt-3 font-serif text-xl leading-snug text-brand-primary sm:text-2xl">
            {guia.chamada}
          </h3>
          <p className="mt-1.5 text-xs text-brand-muted sm:text-sm">{guia.subtitulo}</p>
        </div>
      </Link>
    )
  }

  const isVerde = guia.tema === 'verde'

  return (
    <Link
      to={`/guia/${guia.slug}`}
      className={cn(
        'group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1',
        isVerde ? 'bg-brand-primary' : 'bg-brand-surface shadow-sm hover:shadow-md',
        className,
      )}
    >
      <div className="relative z-10 max-w-[85%] p-8 pb-4">
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

      <div className="relative mt-auto h-32 w-full sm:h-40">
        <img
          src={guia.cardImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute bottom-0 right-0 h-full w-[55%] rounded-tl-3xl object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  )
}
