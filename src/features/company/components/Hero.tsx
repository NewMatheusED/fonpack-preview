import { Link } from 'react-router-dom'

/**
 * Hero da home. A foto do modelo já traz a parede creme do lado esquerdo, então
 * ela é o fundo inteiro da seção (não um painel recortado à direita) — é assim
 * que a composição caixa + bobina + chapa aparece completa, como no Framer.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-surface">
      <img
        src="/home/hero.webp"
        alt="Caixa de papelão, bobina de papel kraft e chapa ondulada FonPack"
        fetchPriority="high"
        className="absolute inset-0 hidden h-full w-full object-cover object-right lg:block"
      />

      {/* Reforça a legibilidade do texto sobre a parte clara da foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-brand-surface via-brand-surface/70 to-transparent lg:block"
      />

      {/* No mobile a foto vai acima do texto, sangrando na largura toda. */}
      <div className="relative h-[300px] w-full sm:h-[380px] lg:hidden">
        <img
          src="/home/hero.webp"
          alt="Caixa de papelão, bobina de papel kraft e chapa ondulada FonPack"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-4rem)] lg:px-8 lg:py-20">
        <h1 className="max-w-md font-serif text-4xl leading-tight text-brand-primary sm:text-5xl">
          Protegendo o que é
          <br />
          importante para você
        </h1>
        <p className="mt-4 max-w-sm text-sm text-brand-muted sm:text-base">
          Soluções completas para proteger, armazenar e transportar seus produtos com segurança.
        </p>
        <Link
          to="/loja"
          className="mt-8 inline-flex w-fit items-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
        >
          Conheça nossos produtos
        </Link>
      </div>
    </section>
  )
}
