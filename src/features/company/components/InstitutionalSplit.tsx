import { Link } from 'react-router-dom'

export default function InstitutionalSplit() {
  return (
    <section className="bg-brand-primary">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="font-serif text-3xl leading-tight text-brand-surface sm:text-4xl">
            Embalamos
            <br />
            mais que produtos,
            <br />
            embalamos confiança.
          </h2>
          <p className="mt-5 max-w-md text-sm text-brand-surface/85 sm:text-base">
            Na FonPack, entendemos que cada produto merece uma proteção eficiente. Por isso,
            oferecemos uma linha completa de embalagens e acessórios, atendendo empresas de
            diversos segmentos com produtos resistentes, atendimento ágil e soluções sob
            medida.
          </p>
          <Link
            to="/sobre-nos"
            className="mt-8 inline-flex w-fit items-center rounded-full bg-brand-surface px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-surface-2"
          >
            Nos conheça
          </Link>
        </div>

        <div className="relative min-h-[280px] lg:min-h-0">
          <img
            src="/home/galpao.webp"
            alt="Galpão da FonPack com estantes de paletes de embalagens"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
