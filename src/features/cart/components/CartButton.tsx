import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../store'
import CartSheet from './CartSheet'

export default function CartButton() {
  const [open, setOpen] = useState(false)
  const totalItens = useCart((s) => s.totalItens())

  return (
    <>
      <button
        type="button"
        aria-label="Abrir carrinho de orçamento"
        onClick={() => setOpen(true)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-primary transition-colors hover:bg-brand-surface-2"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItens > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-medium leading-none text-brand-surface">
            {totalItens}
          </span>
        )}
      </button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  )
}
