import { Link } from 'react-router-dom'
import { getVizinhos } from '@/features/catalog/data'

type PrevNextNavProps = {
  slug: string
}

export default function PrevNextNav({ slug }: PrevNextNavProps) {
  const { anterior, proximo } = getVizinhos(slug)

  return (
    <div className="flex items-center justify-between gap-4 text-sm font-medium text-brand-primary">
      {anterior ? (
        <Link to={`/catalogo/${anterior.slug}`} className="truncate hover:underline">
          ‹ {anterior.nome}
        </Link>
      ) : (
        <span />
      )}
      {proximo ? (
        <Link to={`/catalogo/${proximo.slug}`} className="truncate text-right hover:underline">
          {proximo.nome} ›
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
