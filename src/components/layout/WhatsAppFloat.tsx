import { MessageCircle } from 'lucide-react'
import { company } from '@/lib/company'
import { buildItemUrl } from '@/lib/whatsapp'

const href = buildItemUrl('Contato via site', '')

export default function WhatsAppFloat() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Falar no WhatsApp com ${company.nome}`}
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-3 text-sm font-medium text-brand-surface shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Fale no WhatsApp</span>
    </a>
  )
}
