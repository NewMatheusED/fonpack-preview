import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { getProdutoBySlug } from '@/features/catalog/data'
import { categorias } from '@/features/catalog/data/categorias'
import DiferenciaisBand from '@/components/layout/DiferenciaisBand'
import ProductGallery from '@/features/product/components/ProductGallery'
import DescriptionList from '@/features/product/components/DescriptionList'
import VariationStepper from '@/features/product/components/VariationStepper'
import PrevNextNav from '@/features/product/components/PrevNextNav'

export default function ProdutoPage() {
  const { slug = '' } = useParams()
  const produto = getProdutoBySlug(slug)

  if (!produto) return <Navigate to="/loja" replace />

  const categoria = categorias.find((c) => c.id === produto.categoriaId)

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted">
          <Link to="/" className="hover:text-brand-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/loja" className="hover:text-brand-primary">
            Loja
          </Link>
          {categoria && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{categoria.nome}</span>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand-primary">{produto.nome}</span>
        </nav>

        <div className="mt-6">
          <PrevNextNav slug={produto.slug} />
        </div>

        <div className="mt-6 rounded-3xl bg-brand-surface-2 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
            <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
              <ProductGallery imagens={produto.imagens} nome={produto.nome} />
            </div>

            <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <h1 className="font-serif text-3xl text-brand-primary sm:text-4xl">{produto.nome}</h1>
              <p className="mt-2 text-sm text-brand-muted">
                Vendido e entregue por{' '}
                <span className="font-semibold text-brand-primary">FonPack Embalagens</span>
              </p>
              <div className="mt-8">
                <VariationStepper produto={produto} />
              </div>
            </div>

            <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
              <hr className="mb-8 border-brand-accent/30" />
              <DescriptionList descricao={produto.descricao} />
            </div>
          </div>
        </div>
      </div>

      <DiferenciaisBand variant="creme" />
    </div>
  )
}
