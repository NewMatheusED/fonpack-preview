import type { CartItem } from '@/features/cart/typings'
import { company } from './company'

const base = `https://wa.me/${company.whatsapp}?text=`

export function buildItemUrl(nome: string, resumo: string): string {
  const txt = `Olá! Gostaria de um orçamento:\n\n• ${nome}${resumo ? ` — ${resumo}` : ''}\n\nEnviado pela vitrine FonPack.`
  return base + encodeURIComponent(txt)
}

export function buildOrcamentoUrl(itens: CartItem[]): string {
  const linhas = itens.map(i => `• ${i.nome}${i.variacaoResumo ? ` — ${i.variacaoResumo}` : ''} — Qtd: ${i.quantidade}`)
  const txt = `Olá! Gostaria de um orçamento:\n\n${linhas.join('\n')}\n\nEnviado pela vitrine FonPack.`
  return base + encodeURIComponent(txt)
}
