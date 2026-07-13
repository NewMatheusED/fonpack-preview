import type { Produto } from '../typings'
import ProductCard from './ProductCard'

type ProductGridProps = {
  produtos: Produto[]
}

export default function ProductGrid({ produtos }: ProductGridProps) {
  if (produtos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-brand-muted">
        Nenhum produto encontrado.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {produtos.map((produto) => (
        <ProductCard key={produto.slug} produto={produto} />
      ))}
    </div>
  )
}
