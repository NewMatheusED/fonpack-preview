import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../store'
import type { CartItem as CartItemType } from '../typings'

type CartItemProps = {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const setQtd = useCart((s) => s.setQtd)
  const remove = useCart((s) => s.remove)

  return (
    <li className="flex items-start justify-between gap-3 border-b border-brand-accent/30 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-base text-brand-primary">{item.nome}</p>
        {item.variacaoResumo && (
          <p className="mt-0.5 text-sm text-brand-muted">{item.variacaoResumo}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label="Diminuir quantidade"
            onClick={() => setQtd(item.id, item.quantidade - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-accent text-brand-primary transition-colors hover:bg-brand-surface-2"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm text-brand">{item.quantidade}</span>
          <button
            type="button"
            aria-label="Aumentar quantidade"
            onClick={() => setQtd(item.id, item.quantidade + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-accent text-brand-primary transition-colors hover:bg-brand-surface-2"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Remover ${item.nome} do orçamento`}
        onClick={() => remove(item.id)}
        className="shrink-0 rounded-full p-1.5 text-brand-muted transition-colors hover:bg-brand-surface-2 hover:text-brand-primary"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}
