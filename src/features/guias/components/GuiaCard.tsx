import { Link } from 'react-router-dom'
import { Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Guia } from '../typings'

export type GuiaCardProps = {
  guia: Guia
  className?: string
  /**
   * Faz a foto do card "foto" esticar para preencher a altura da célula.
   * Só o bento da home usa: lá esse card ocupa duas linhas do grid e precisa
   * acompanhar a altura dos dois cards ao lado. No "Confira mais" as células
   * têm altura livre, então a foto fica na proporção nativa (mais nítida).
   */
  preencherAltura?: boolean
}

/**
 * Card reutilizável dos guias — usado no bento "Tem alguma dúvida?" da home e na
 * seção `ConfiraMais` de cada página de guia.
 *
 * Cada tema tem um tratamento de imagem próprio, e isso NÃO é decoração: as
 * fotos vêm dos cards do Framer (que foram exportados como imagens chapadas com
 * o texto queimado) e cada uma tem um enquadramento diferente. Jogar as três
 * numa mesma caixa cortava objetos — a bobina de papel kraft sumia inteira do
 * card de materiais, e a foto da trena era esticada 2x.
 *
 * - `foto`   → foto no topo e o texto numa faixa que atravessa a base. No modelo
 *              o rótulo flutua SOBRE a foto, mas para isso a foto teria que ser
 *              o fundo do card inteiro — e o asset tem só 406x335 nativos (não
 *              existe maior no CDN do Framer), o que exigiria esticá-lo ~1,8x.
 * - `verde`  → a pilha de papelão encosta no canto inferior direito. O recorte
 *              já traz o verde do card ao redor, então `object-contain` funde.
 * - `creme`  → os três materiais formam uma faixa que atravessa a base inteira
 *              do card, na proporção nativa do recorte (1175x354).
 */
export default function GuiaCard({ guia, className, preencherAltura = false }: GuiaCardProps) {
  const href = `/guia/${guia.slug}`
  // `h-full` só quando o card precisa esticar (bento da home): com ele sempre
  // ligado, o card assume a altura da linha do grid mesmo com `items-start`, e
  // o card mais baixo ganhava um buraco entre o texto e a imagem.
  const base = cn(
    'group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1',
    preencherAltura && 'h-full',
  )

  if (guia.tema === 'foto') {
    const rotulo = (
      <>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-soft text-brand-primary">
          <Ruler className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="mt-3 font-serif text-xl leading-snug text-brand-primary sm:text-2xl">
          {guia.chamada}
        </h3>
        <p className="mt-1.5 text-xs text-brand-muted sm:text-sm">{guia.subtitulo}</p>
      </>
    )

    // Altura livre (ConfiraMais): o card assume a proporção NATIVA da foto, então
    // ela preenche o card inteiro sem esticar (1,07x) e o rótulo volta a flutuar
    // por cima, como no modelo. De quebra o card fica baixo, na mesma altura dos
    // cards ao lado — antes ele crescia e abria um buraco no card vizinho.
    if (!preencherAltura) {
      return (
        <Link
          to={href}
          className={cn(base, 'aspect-[406/335] bg-brand-surface shadow-sm hover:shadow-md', className)}
        >
          <img
            src={guia.cardImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="relative z-10 mt-auto m-4 max-w-[78%] rounded-2xl bg-brand-surface p-5 shadow-sm">
            {rotulo}
          </div>
        </Link>
      )
    }

    // Bento da home: a célula é alta (o card ocupa duas linhas), então a foto não
    // tem como preencher sozinha sem esticar demais. Aqui ela fica no topo e o
    // texto vira uma faixa na base. `min-h-0` porque item de flex não encolhe
    // abaixo do conteúdo.
    return (
      <Link to={href} className={cn(base, 'bg-brand-surface shadow-sm hover:shadow-md', className)}>
        <img
          src={guia.cardImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="min-h-0 w-full flex-1 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="relative z-10 bg-brand-surface p-6">{rotulo}</div>
      </Link>
    )
  }

  const isVerde = guia.tema === 'verde'

  return (
    <Link
      to={href}
      className={cn(
        base,
        isVerde ? 'bg-brand-primary' : 'bg-brand-surface shadow-sm hover:shadow-md',
        className,
      )}
    >
      {/* Padding e tipografia enxutos de propósito: a altura destes dois cards
          define a altura do card da esquerda (row-span-2). Quanto mais altos
          eles ficam, mais a foto de lá precisa ser esticada. */}
      <div className="relative z-10 p-6 pb-3">
        <h3
          className={cn(
            'font-serif text-2xl leading-snug',
            isVerde ? 'text-brand-surface' : 'text-brand-primary',
          )}
        >
          {guia.chamada}
        </h3>
        <p
          className={cn(
            'mt-2 max-w-[85%] text-sm',
            isVerde ? 'text-brand-surface/85' : 'text-brand-muted',
          )}
        >
          {guia.subtitulo}
        </p>
      </div>

      {isVerde ? (
        <img
          src={guia.cardImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none mt-auto ml-auto w-[55%] object-contain object-right-bottom transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <img
          src={guia.cardImg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none mt-auto aspect-[1175/354] w-full object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </Link>
  )
}
