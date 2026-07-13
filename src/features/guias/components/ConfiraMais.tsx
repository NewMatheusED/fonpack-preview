import { getOutrosGuias } from '../data'
import GuiaCard from './GuiaCard'

type ConfiraMaisProps = {
  /** slug do guia atual — os outros dois são exibidos. */
  slugAtual: string
}

export default function ConfiraMais({ slugAtual }: ConfiraMaisProps) {
  const outros = getOutrosGuias(slugAtual)

  return (
    <section className="border-t border-brand-accent/30 bg-brand-base py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-sans text-2xl font-semibold text-brand sm:text-3xl">
          Confira mais
        </h2>

        {/* Mesma largura do bento da home (~896px). Num grid de largura total os
            cards passam de 800px, a foto do card "foto" cresce junto (ela é
            flex-1) e o card ao lado ganha um buraco enorme entre o texto e a
            imagem. As fotos vêm de assets pequenos: card largo = foto esticada. */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {outros.map((guia) => (
            <GuiaCard key={guia.slug} guia={guia} />
          ))}
        </div>
      </div>
    </section>
  )
}
