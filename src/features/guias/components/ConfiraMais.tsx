import { getOutrosGuias } from '../data'
import GuiaCard from './GuiaCard'

type ConfiraMaisProps = {
  /** slug do guia atual — os outros dois são exibidos. */
  slugAtual: string
}

export default function ConfiraMais({ slugAtual }: ConfiraMaisProps) {
  const outros = getOutrosGuias(slugAtual)

  return (
    <section className="border-t border-brand-accent/30 bg-brand-surface-2 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-sans text-2xl font-semibold text-brand sm:text-3xl">
          Confira mais
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {outros.map((guia) => (
            <GuiaCard key={guia.slug} guia={guia} />
          ))}
        </div>
      </div>
    </section>
  )
}
