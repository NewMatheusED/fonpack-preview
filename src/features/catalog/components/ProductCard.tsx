import { Link } from 'react-router-dom'
import type { Produto } from '../typings'

type ProductCardProps = {
  produto: Produto
}

/**
 * O card é um bloco creme inteiro (imagem + rótulo) sobre o canvas branco da
 * página. Antes era o contrário — card branco com um tile creme só atrás da
 * imagem, tudo apoiado numa seção creme: o card se dissolvia no fundo e a foto
 * ficava pequena e solta no meio. Ver a regra das superfícies em
 * src/styles/tokens.css.
 */
export default function ProductCard({ produto }: ProductCardProps) {
  return (
    <Link
      to={`/catalogo/${produto.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-brand-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={produto.imagens[0]}
          alt={produto.nome}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-brand-accent/25 px-4 py-4">
        <h3 className="font-serif text-2xl font-bold leading-tight text-brand-primary">{produto.nome}</h3>
        <p className="mt-1 text-md text-brand-muted">{produto.badge}</p>
      </div>
    </Link>
  )
}
