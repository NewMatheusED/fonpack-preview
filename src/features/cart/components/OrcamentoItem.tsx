import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { getProdutoBySlug } from '@/features/catalog/data'
import { useCart } from '../store'
import type { CartItem } from '../typings'

type OrcamentoItemProps = {
  item: CartItem
}

export default function OrcamentoItem({ item }: OrcamentoItemProps) {
  const setQtd = useCart((s) => s.setQtd)
  const remove = useCart((s) => s.remove)
  const produto = getProdutoBySlug(item.produtoSlug)
  const imagem = produto?.imagens[0]
  const href = `/catalogo/${item.produtoSlug}`

  return (
    <li className="flex flex-wrap items-center gap-4 rounded-md bg-brand-surface p-4 sm:p-5">
      <Link
        to={href}
        className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-brand-base sm:h-20 sm:w-20"
      >
        {imagem && (
          <img src={imagem} alt={item.nome} className="h-full w-full object-contain p-2" />
        )}
      </Link>

      <div className="min-w-[10rem] flex-1">
        <Link to={href} className="font-serif text-base text-brand-primary hover:underline">
          {item.nome}
        </Link>
        {item.variacaoResumo && (
          <p className="mt-0.5 text-sm text-brand-muted">{item.variacaoResumo}</p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Diminuir quantidade"
          onClick={() => setQtd(item.id, item.quantidade - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent text-brand-primary transition-colors hover:bg-brand-base"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm text-brand">{item.quantidade}</span>
        <button
          type="button"
          aria-label="Aumentar quantidade"
          onClick={() => setQtd(item.id, item.quantidade + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent text-brand-primary transition-colors hover:bg-brand-base"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        aria-label={`Remover ${item.nome} do orçamento`}
        onClick={() => remove(item.id)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-base hover:text-brand-primary"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}
