import { Link } from 'react-router-dom'
import { company } from '@/lib/company'
import { buildItemUrl } from '@/lib/whatsapp'

const whatsappHref = buildItemUrl('Contato via site', '')

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  )
}

const linksRapidos = [
  { to: '/loja', label: 'Nossa Loja' },
  { to: '/sobre-nos', label: 'Sobre nós' },
  { to: '/fale-conosco', label: 'Fale conosco' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-accent/30 bg-brand-surface">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl text-brand-primary">Fale conosco</h3>
            <p className="mt-4 max-w-xs text-sm text-brand-muted">{company.endereco}</p>
            <p className="mt-2 text-sm text-brand-muted">Whatsapp: {company.whatsappLabel}</p>
            <p className="mt-1 text-sm text-brand-muted">E-mail: {company.email}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-surface-2 px-5 py-3 text-sm font-bold text-brand-primary shadow-sm transition-transform hover:scale-105"
            >
              <WhatsAppGlyph className="h-5 w-5 shrink-0" />
              WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-serif text-xl text-brand-primary">Links rápidos</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              {linksRapidos.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-brand-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Terceira coluna: é ela que a marca d'água ocupa no desktop. Antes
              era uma div vazia e o "F" ficava espremido fora dela, deixando um
              vão enorme à direita. */}
          <div aria-hidden="true" className="relative hidden md:block">
            <span className="pointer-events-none absolute -top-6 right-0 select-none font-script text-[15rem] leading-[0.75] text-brand-primary/25 lg:text-[17rem]">
              F
            </span>
          </div>
        </div>

        {/* No mobile não existe terceira coluna: a marca fica atrás do conteúdo,
            à direita, grande mas discreta. O botão flutuante do WhatsApp é fixo
            no canto inferior direito da viewport e pousa por cima — em opacidade
            baixa isso lê como textura, não como sobreposição quebrada. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 select-none font-script text-[9rem] leading-[0.75] text-brand-primary/15 md:hidden"
        >
          F
        </span>
      </div>
    </footer>
  )
}
