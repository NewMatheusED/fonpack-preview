import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-brand-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-brand-primary sm:text-5xl">
            Protegendo o que é importante para você
          </h1>
          <p className="mt-4 max-w-md text-sm text-brand-muted sm:text-base">
            Soluções completas para proteger, armazenar e transportar seus produtos com
            segurança.
          </p>
          <Link
            to="/loja"
            className="mt-8 inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
          >
            Conheça nossos produtos
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-surface">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand-green-soft/40 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-brand-accent/30 blur-2xl"
          />
          <img
            src="/produtos/bobina-kraft/0.webp"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-2/3 object-contain drop-shadow-lg"
          />
          <img
            src="/produtos/corte-vinco/0.webp"
            alt="Caixa de papelão e bobina kraft FonPack"
            className="absolute right-0 top-4 w-3/5 object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}
