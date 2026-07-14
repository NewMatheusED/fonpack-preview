import Seo from '@/components/seo/Seo'
import { materiais } from '@/features/guias/data'
import ConfiraMais from '@/features/guias/components/ConfiraMais'
import MaterialCard from '@/features/guias/components/MaterialCard'

export default function GuiaMateriaisPage() {
  return (
    <div>
      <Seo
        titulo="Plástico bolha, divisórias ou papel kraft? | FonPack Embalagens"
        descricao="Compare plástico bolha, divisórias e papel kraft e descubra qual material de proteção é o mais adequado para o seu produto."
        imagem="/guias/materiais-hero.webp"
      />

      <div className="relative h-70 w-full sm:h-95 lg:h-140">
        <img
          src="/guias/materiais-hero.webp"
          alt="Mãos manuseando plástico bolha"
          className="h-full w-full object-cover object-[center_80%]"

        />
      </div>

      <section className="bg-brand-base pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-brand-primary sm:text-5xl">
            Plástico bolha, divisórias ou papel kraft?
          </h1>
          <p className="mt-4 text-sm text-brand-muted sm:text-base">
            Cada material possui uma função diferente.
            <br className="hidden sm:block" /> Escolher o correto evita danos e reduz custos.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {materiais.map((material) => (
            <MaterialCard key={material.titulo} material={material} />
          ))}
        </div>
      </section>

      <ConfiraMais slugAtual="plastico-bolha-divisorias-ou-papel-kraft" />
    </div>
  )
}
