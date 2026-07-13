import { Link } from 'react-router-dom'
import type { Produto } from '../typings'

type ProductCardProps = {
  produto: Produto
}

export default function ProductCard({ produto }: ProductCardProps) {
  return (
    <Link
      to={`/catalogo/${produto.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-brand-surface-2 transition-shadow hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-brand-surface">
        <img
          src={produto.imagens[0]}
          alt={produto.nome}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-4 pb-5 pt-1">
        <h3 className="font-serif text-lg text-brand-primary">{produto.nome}</h3>
        <p className="mt-1 text-sm text-brand-muted">{produto.badge}</p>
      </div>
    </Link>
  )
}
