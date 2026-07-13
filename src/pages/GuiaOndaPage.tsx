import Seo from '@/components/seo/Seo'
import { ondas } from '@/features/guias/data'
import ConfiraMais from '@/features/guias/components/ConfiraMais'
import OndaCarousel from '@/features/guias/components/OndaCarousel'

export default function GuiaOndaPage() {
  return (
    <div>
      <Seo
        titulo="Qual onda escolher? | FonPack Embalagens"
        descricao="Entenda as diferenças entre os tipos de onda do papelão (D, B, C, BB e BC) e escolha a melhor proteção para o seu produto."
        imagem="/guias/onda-hero.webp"
      />

      <div className="relative h-[280px] w-full sm:h-[380px] lg:h-[560px]">
        <img
          src="/guias/onda-hero.webp"
          alt="Operador manuseando caixas de papelão"
          className="h-full w-full object-cover"
        />
      </div>

      <section className="bg-brand-surface-2 pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-brand-primary sm:text-5xl">Qual onda escolher?</h1>
          <p className="mt-4 text-sm text-brand-muted sm:text-base">
            A espessura do papelão influencia diretamente na resistência da embalagem
          </p>
        </div>

        <div className="mt-12">
          <OndaCarousel ondas={ondas} />
        </div>
      </section>

      <ConfiraMais slugAtual="qual-onda-escolher" />
    </div>
  )
}
