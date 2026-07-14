import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { getProdutoBySlug } from '@/features/catalog/data'
import QuantityField from '@/features/product/components/QuantityField'
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
    <li className="px-5 py-5 sm:px-6">
      <div className="flex items-start gap-4">
        <Link
          to={href}
          className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-brand-accent/40 bg-brand-base"
        >
          {imagem && (
            <img src={imagem} alt={item.nome} className="h-full w-full object-contain p-2" />
          )}
        </Link>

        <div className="min-w-[10rem] flex-1">
          <Link to={href} className="font-sans text-base font-bold text-brand hover:underline">
            {item.nome}
          </Link>
          {item.variacaoResumo && (
            <p className="mt-1 text-sm text-brand-muted">{item.variacaoResumo}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center">
          <QuantityField
            value={item.quantidade}
            onChange={(n) => setQtd(item.id, n)}
            mostrarLimites={false}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-brand-accent/30 pt-4">
        <p className="text-sm text-brand-muted">Produto fabricado conforme as especificações informadas.</p>
        <button
          type="button"
          aria-label={`Remover ${item.nome} do orçamento`}
          onClick={() => remove(item.id)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-base hover:text-brand-primary"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  )
}
