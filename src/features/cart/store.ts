import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { limitarQtd } from '@/features/product/quantidade'
import type { CartItem } from './typings'

type CartState = {
  itens: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  setQtd: (id: string, n: number) => void
  clear: () => void
  totalItens: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      itens: [],
      // A quantidade é limitada aqui, e não só na UI: é o store que decide o que
      // vai para o localStorage e, no fim, para a mensagem do WhatsApp.
      add: (item) => set((s) => {
        const ex = s.itens.find((i) => i.id === item.id)
        if (ex) return { itens: s.itens.map((i) => i.id === item.id ? { ...i, quantidade: limitarQtd(i.quantidade + item.quantidade) } : i) }
        return { itens: [...s.itens, { ...item, quantidade: limitarQtd(item.quantidade) }] }
      }),
      remove: (id) => set((s) => ({ itens: s.itens.filter((i) => i.id !== id) })),
      setQtd: (id, n) => set((s) => ({ itens: s.itens.map((i) => i.id === id ? { ...i, quantidade: limitarQtd(n) } : i) })),
      clear: () => set({ itens: [] }),
      totalItens: () => get().itens.reduce((acc, i) => acc + i.quantidade, 0),
    }),
    { name: 'fonpack-orcamento' },
  ),
)
