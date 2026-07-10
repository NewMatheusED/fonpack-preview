import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { buildOrcamentoUrl } from '@/lib/whatsapp'
import { useCart } from '../store'
import CartItem from './CartItem'

type CartSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function useIsMobile(breakpointPx = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpointPx])

  return isMobile
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const itens = useCart((s) => s.itens)
  const isMobile = useIsMobile()
  const side = isMobile ? 'bottom' : 'right'
  const vazio = itens.length === 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn('flex w-full flex-col sm:max-w-md', side === 'bottom' && 'h-[85vh]')}
      >
        <SheetHeader>
          <SheetTitle className="font-serif text-lg text-brand-primary">
            Seu orçamento
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {vazio ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-center text-brand-muted">
              <ShoppingBag className="h-8 w-8" />
              <p className="text-sm">Seu orçamento está vazio.</p>
              <p className="text-xs">Adicione produtos na loja para pedir um orçamento.</p>
            </div>
          ) : (
            <ul>
              {itens.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        <SheetFooter>
          <a
            href={buildOrcamentoUrl(itens)}
            target="_blank"
            rel="noreferrer"
            aria-disabled={vazio}
            tabIndex={vazio ? -1 : undefined}
            className={cn(
              'inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-medium text-brand-surface transition-colors hover:bg-brand-primary-2',
              vazio && 'pointer-events-none opacity-50',
            )}
          >
            Enviar orçamento pelo WhatsApp
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
