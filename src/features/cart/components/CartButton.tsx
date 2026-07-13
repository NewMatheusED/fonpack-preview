import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../store'

export default function CartButton() {
  const totalItens = useCart((s) => s.totalItens())

  return (
    <Link
      to="/orcamento"
      aria-label="Ver orçamento"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-primary transition-colors hover:bg-brand-base"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItens > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-medium leading-none text-brand-surface">
          {totalItens}
        </span>
      )}
    </Link>
  )
}
