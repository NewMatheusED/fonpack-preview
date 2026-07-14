import type { ComponentType } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { company } from '@/lib/company'
import { buildItemUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

type ContactCard = {
  icon: ComponentType<{ className?: string }>
  label: string
  href: string
  external?: boolean
  accent: string
}

const cards: ContactCard[] = [
  {
    icon: MessageCircle,
    label: 'Whatsapp',
    href: buildItemUrl('Contato via site', ''),
    external: true,
    accent: 'bg-brand-primary',
  },
  {
    icon: Mail,
    label: 'Enviar e-mail',
    href: `mailto:${company.email}`,
    accent: 'bg-brand-primary-2',
  },
  {
    icon: Phone,
    label: company.whatsappLabel,
    href: `tel:+${company.whatsapp}`,
    accent: 'bg-brand-primary',
  },
]

export default function ContactCards() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="flex flex-col items-center overflow-hidden rounded-2xl bg-brand-surface p-8 text-center"
          >
            <span
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full text-brand-surface',
                card.accent,
              )}
            >
              <Icon className="h-7 w-7" />
            </span>
            <p className="mt-5 text-sm text-brand-muted">Tire suas dúvidas</p>
            <a
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noreferrer' : undefined}
              className={cn(
                'mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-brand-surface transition-opacity hover:opacity-90',
                card.accent,
              )}
            >
              <Icon className="h-4 w-4" />
              {card.label}
            </a>
            <p className="mt-4 text-xs text-brand-muted">Retornamos rapidamente</p>
          </div>
        )
      })}
    </div>
  )
}
