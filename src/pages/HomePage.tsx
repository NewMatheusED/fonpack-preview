import { Link } from 'react-router-dom'
import { getProdutos } from '@/features/catalog/data'
import ProductCard from '@/features/catalog/components/ProductCard'
import DiferenciaisBand from '@/components/layout/DiferenciaisBand'
import Hero from '@/features/company/components/Hero'
import InstitutionalSplit from '@/features/company/components/InstitutionalSplit'

const destaques = getProdutos().filter((p) => p.destaque)

export default function HomePage() {
  return (
    <div>
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

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-brand-primary sm:text-4xl">
          Tem alguma dúvida?
        </h2>
        <p className="mt-3 max-w-md text-sm text-brand-muted sm:text-base">
          Tudo o que você precisa saber para receber a embalagem ideal para o seu produto.
        </p>
        <Link
          to="/fale-conosco"
          className="mt-6 inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
        >
          Fale conosco
        </Link>
      </section>
    </div>
  )
}
