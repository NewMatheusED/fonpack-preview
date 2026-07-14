import { Package } from 'lucide-react'
import ContactCards from '@/features/contact/components/ContactCards'
import Seo from '@/components/seo/Seo'

export default function ContatoPage() {
  return (
    <div>
      <Seo
        titulo="Fale conosco | FonPack Embalagens"
        descricao="Entre em contato com a FonPack Embalagens pelo WhatsApp, e-mail ou telefone e peça seu orçamento personalizado, sem compromisso."
      />
      <section className="relative h-56 overflow-hidden bg-brand-primary sm:h-72 lg:h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-2" />
        <Package
          aria-hidden="true"
          className="absolute -bottom-10 -right-6 h-56 w-56 text-brand-surface/10 sm:h-72 sm:w-72"
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl text-brand-surface sm:text-4xl">
            Fale com a gente
          </h1>
          <p className="mt-2 max-w-md text-sm text-brand-surface/85 sm:text-base">
            Estamos prontos para ajudar a encontrar a embalagem ideal para o seu negócio.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <ContactCards />
      </section>
    </div>
  )
}
