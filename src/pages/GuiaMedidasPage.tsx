import Seo from '@/components/seo/Seo'
import ConfiraMais from '@/features/guias/components/ConfiraMais'

export default function GuiaMedidasPage() {
  return (
    <div>
      <Seo
        titulo="Como tirar as medidas da sua embalagem | FonPack Embalagens"
        descricao="Aprenda a medir corretamente para encontrar a embalagem ideal: comprimento, largura e altura, sem erros."
        imagem="/guias/medidas-hero.webp"
      />

      {/* A foto sangra pela largura toda e o texto fica por cima da parte vazia
          dela — o creme da esquerda é o fundo da própria foto, não um painel
          pintado. Quando era um painel `bg-brand-surface`, ele saía exatamente
          na mesma cor do header logo acima e os dois viravam um bloco só. */}
      <section className="relative isolate overflow-hidden bg-brand-surface">
        <img
          src="/guias/medidas-hero.webp"
          alt="Caixinhas de papelão kraft organizadas em grade"
          fetchPriority="high"
          className="absolute inset-0 hidden h-full w-full object-cover object-right lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-brand-surface via-brand-surface/70 to-transparent lg:block"
        />

        <div className="relative h-[260px] w-full sm:h-[320px] lg:hidden">
          <img
            src="/guias/medidas-hero.webp"
            alt="Caixinhas de papelão kraft organizadas em grade"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[480px] lg:px-8 lg:py-24">
          <h1 className="max-w-xl font-serif text-4xl leading-tight text-brand-primary sm:text-5xl">
            Como tirar as medidas da sua embalagem
          </h1>
          <p className="mt-5 max-w-md text-base font-medium text-brand-primary sm:text-lg">
            Aprenda a medir corretamente para encontrar a embalagem ideal
          </p>
          <p className="mt-4 max-w-md text-sm text-brand-muted">
            Um guia simples para medir seu produto corretamente
          </p>
        </div>
      </section>

      <section className="bg-brand-base pb-20 pt-4 lg:pb-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/guias/medidas-caixa.webp"
              alt="Caixa de papelão aberta sobre uma mesa de madeira"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-serif text-3xl text-brand-primary sm:text-4xl">
              Meça da forma correta, evite erros
            </h2>

            <p className="mt-5 text-sm text-brand sm:text-base">
              É importante informar as medidas na ordem correta:
            </p>
            <p className="mt-1 font-semibold text-brand-primary sm:text-lg">
              Comprimento × Largura × Altura (C × L × A)
            </p>

            <ul className="mt-4 space-y-1.5 text-sm text-brand sm:text-base">
              <li className="list-inside list-disc">Comprimento: lado maior da base</li>
              <li className="list-inside list-disc">Largura: lado menor da base</li>
              <li className="list-inside list-disc">Altura: distância da base até a tampa</li>
            </ul>

            <p className="mt-4 text-sm text-brand sm:text-base">
              As caixas de papelão são medidas pela parte interna, considerando o espaço útil
              disponível para acomodar o produto
            </p>

            <div className="mt-6 rounded-2xl bg-brand-green-soft px-6 py-5">
              <p className="text-sm text-brand sm:text-base">
                Ainda não tem a caixa? Meça o produto e adicione uma pequena folga para
                acomodação e, se necessário, para materiais de proteção como plástico-bolha,
                papel kraft ou divisórias.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ConfiraMais slugAtual="como-tirar-medidas" />
    </div>
  )
}
