import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { company } from '@/lib/company'
import { buildItemUrl } from '@/lib/whatsapp'

const whatsappHref = buildItemUrl('Contato via site', '')

const linksRapidos = [
  { to: '/loja', label: 'Nossa Loja' },
  { to: '/sobre-nos', label: 'Sobre nós' },
  { to: '/fale-conosco', label: 'Fale conosco' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-accent/30 bg-brand-surface">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl text-brand-primary">Fale conosco</h3>
            <p className="mt-4 max-w-xs text-sm text-brand-muted">{company.endereco}</p>
            <p className="mt-2 text-sm text-brand-muted">Whatsapp: {company.whatsappLabel}</p>
            <p className="mt-1 text-sm text-brand-muted">E-mail: {company.email}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-primary px-5 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-brand-surface"
            >
              <MessageCircle className="h-4 w-4" />
              Fale conosco
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

          <div aria-hidden="true" className="hidden md:block" />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-12 select-none font-script text-[10rem] leading-none text-brand-primary sm:-bottom-16 sm:text-[14rem] lg:text-[16rem]"
      >
        F
      </span>
    </footer>
  )
}
