import { useMemo, useState } from 'react'
import { getProdutos } from '@/features/catalog/data'
import { buscarProdutos, filtrarPorCategoria } from '@/features/catalog/hooks'
import CategoryTabs from '@/features/catalog/components/CategoryTabs'
import SearchBar from '@/features/catalog/components/SearchBar'
import ProductGrid from '@/features/catalog/components/ProductGrid'
import Seo from '@/components/seo/Seo'

const produtos = getProdutos()

export default function LojaPage() {
  const [categoria, setCategoria] = useState('tudo')
  const [termo, setTermo] = useState('')

  const produtosFiltrados = useMemo(() => {
    const porCategoria = filtrarPorCategoria(produtos, categoria)
    return buscarProdutos(porCategoria, termo)
  }, [categoria, termo])

  return (
    <div>
      <Seo
        titulo="Nossa Loja | FonPack Embalagens"
        descricao="Explore nosso catálogo completo de caixas, fitas, bobinas, cantoneiras e acessórios de embalagem. Filtre por categoria e peça seu orçamento."
        imagem="/produtos/corte-vinco/0.webp"
      />
      <section className="bg-brand-primary">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl text-brand-surface sm:text-4xl">Nossa Loja</h1>
          <p className="mt-2 text-sm text-brand-surface/80">
            Embalagens e materiais para o seu negócio, sob medida.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-brand-accent/30 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <CategoryTabs value={categoria} onValueChange={setCategoria} />
          <SearchBar value={termo} onChange={setTermo} />
        </div>

        <div className="py-8">
          <ProductGrid produtos={produtosFiltrados} />
        </div>
      </div>
    </div>
  )
}
