import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProdutos } from '@/features/catalog/data'
import { categorias } from '@/features/catalog/data/categorias'
import { buscarProdutos, filtrarPorCategoria } from '@/features/catalog/hooks'
import CategoryTabs from '@/features/catalog/components/CategoryTabs'
import SearchBar from '@/features/catalog/components/SearchBar'
import ProductGrid from '@/features/catalog/components/ProductGrid'
import Seo from '@/components/seo/Seo'

const produtos = getProdutos()

/**
 * O filtro de categoria vive na URL (`?categoria=`), não só em estado local:
 * é o que permite o breadcrumb da página de produto linkar de volta pra loja
 * já filtrada na categoria daquele produto.
 */
export default function LojaPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaParam = searchParams.get('categoria') ?? 'tudo'
  const categoria =
    categoriaParam === 'tudo' || categorias.some((c) => c.id === categoriaParam)
      ? categoriaParam
      : 'tudo'
  const [termo, setTermo] = useState('')

  function selecionarCategoria(nova: string) {
    setSearchParams(
      (prev) => {
        const proximos = new URLSearchParams(prev)
        if (nova === 'tudo') proximos.delete('categoria')
        else proximos.set('categoria', nova)
        return proximos
      },
      { replace: true },
    )
  }

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
          <CategoryTabs value={categoria} onValueChange={selecionarCategoria} />
          <SearchBar value={termo} onChange={setTermo} />
        </div>

        <div className="py-8">
          <ProductGrid produtos={produtosFiltrados} />
        </div>
      </div>
    </div>
  )
}
