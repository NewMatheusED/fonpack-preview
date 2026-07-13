import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
      add: (item) => set((s) => {
        const ex = s.itens.find((i) => i.id === item.id)
        if (ex) return { itens: s.itens.map((i) => i.id === item.id ? { ...i, quantidade: i.quantidade + item.quantidade } : i) }
        return { itens: [...s.itens, item] }
      }),
      remove: (id) => set((s) => ({ itens: s.itens.filter((i) => i.id !== id) })),
      setQtd: (id, n) => set((s) => ({ itens: s.itens.map((i) => i.id === id ? { ...i, quantidade: Math.max(1, n) } : i) })),
      clear: () => set({ itens: [] }),
      totalItens: () => get().itens.reduce((acc, i) => acc + i.quantidade, 0),
    }),
    { name: 'fonpack-orcamento' },
  ),
)
