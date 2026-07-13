import { Link } from 'react-router-dom'
import { getProdutos } from '@/features/catalog/data'
import ProductCard from '@/features/catalog/components/ProductCard'
import DiferenciaisBand from '@/components/layout/DiferenciaisBand'
import Hero from '@/features/company/components/Hero'
import InstitutionalSplit from '@/features/company/components/InstitutionalSplit'
import Seo from '@/components/seo/Seo'
import { getGuias } from '@/features/guias/data'
import GuiaCard from '@/features/guias/components/GuiaCard'

const destaques = getProdutos().filter((p) => p.destaque)
const [guiaMedidas, guiaOnda, guiaMateriais] = getGuias()

export default function HomePage() {
  return (
    <div>
      <Seo
        titulo="FonPack Embalagens | Embalagens sob medida para o seu negócio"
        descricao="Caixas, fitas, bobinas e acessórios de embalagem sob medida. Peça seu orçamento pelo WhatsApp com a FonPack Embalagens."
        imagem="/produtos/corte-vinco/0.webp"
      />
      <Hero />

      <DiferenciaisBand variant="verde" />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-brand-primary sm:text-4xl">
            Nossos produtos
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Soluções versáteis para diferentes necessidades
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {destaques.map((produto) => (
            <ProductCard key={produto.slug} produto={produto} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/loja"
            className="inline-flex items-center rounded-full border border-brand-primary px-6 py-2.5 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-surface"
          >
            Ver todos os produtos
          </Link>
        </div>
      </section>

      <InstitutionalSplit />

      <section className="bg-brand-surface py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-brand-primary sm:text-4xl">
              Tem alguma dúvida?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted sm:text-base">
              Tudo o que você precisa saber para receber a embalagem ideal para o seu produto.
            </p>
          </div>

          <div className="mx-auto mt-10 grid grid-cols-1 gap-5 sm:mt-14 lg:grid-cols-2 lg:grid-rows-2 lg:gap-6">
            <GuiaCard guia={guiaMedidas} className="lg:row-span-2" preencherAltura />
            <GuiaCard guia={guiaOnda} />
            <GuiaCard guia={guiaMateriais} />
          </div>
        </div>
      </section>
    </div>
  )
}
