import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'

/**
 * Rota curinga. Sem ela, o rewrite de SPA do .htaccess entrega o index.html
 * para qualquer URL — e um endereço errado renderizaria uma página em branco.
 */
export default function NaoEncontradaPage() {
  return (
    <>
      <Seo
        titulo="Página não encontrada | FonPack Embalagens"
        descricao="A página que você procurou não existe. Veja nosso catálogo de embalagens."
      />

      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <p className="font-script text-7xl leading-none text-brand-primary sm:text-8xl">404</p>

        <h1 className="mt-6 font-serif text-3xl text-brand-primary sm:text-4xl">
          Essa página não existe
        </h1>
        <p className="mt-3 max-w-md text-sm text-brand-muted sm:text-base">
          O endereço pode ter mudado ou sido digitado errado. Nossos produtos continuam todos aqui.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/loja"
            className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
          >
            Ver os produtos
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-surface"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    </>
  )
}
