import PillarsBand from '@/features/company/components/PillarsBand'
import MissionVisionValues from '@/features/company/components/MissionVisionValues'
import Seo from '@/components/seo/Seo'

export default function SobrePage() {
  return (
    <div>
      <Seo
        titulo="Sobre nós | FonPack Embalagens"
        descricao="Conheça a história, a missão, a visão e os valores da FonPack Embalagens, parceira em soluções de embalagem para o crescimento do seu negócio."
        imagem="/produtos/arquivo-morto/0.webp"
      />
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Quem somos
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-brand-primary sm:text-4xl lg:text-[2.75rem]">
            Seu parceiro em soluções que acompanham o crescimento do seu negócio.
          </h1>
          <p className="mt-6 max-w-lg text-sm text-brand-muted sm:text-base">
            A FonPack Embalagens nasceu com o propósito de oferecer soluções completas em
            embalagens para empresas de diferentes segmentos. Com foco na qualidade,
            confiabilidade e bom atendimento, fornecemos produtos que garantem mais
            segurança, praticidade e eficiência.
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-surface">
          <div
            aria-hidden="true"
            className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-brand-accent/30 blur-2xl"
          />
          <img
            src="/produtos/arquivo-morto/0.webp"
            alt="Caixa de arquivo morto FonPack"
            className="absolute inset-0 h-full w-full object-contain p-10"
          />
        </div>
      </section>

      <PillarsBand />

      <section className="mx-auto grid items-center max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <h2 className="font-serif text-3xl leading-tight text-brand-primary sm:text-4xl">
          Qualidade que acompanha cada envio com segurança e confiança.
        </h2>
        <div className="flex flex-col gap-4 text-sm text-brand-muted sm:text-base">
          <p>
            A FonPack Embalagens oferece soluções completas para proteger, armazenar e
            transportar produtos com segurança. Trabalhamos com caixas de papelão, fitas,
            bobinas, materiais de proteção e diversos itens para atender empresas de
            diferentes segmentos.
          </p>
          <p>
            Nosso compromisso é fornecer produtos de qualidade, atendimento personalizado e
            soluções que agreguem eficiência, segurança e praticidade à operação de cada
            cliente.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl border-t border-brand-accent/30" />

      <MissionVisionValues />
    </div>
  )
}
