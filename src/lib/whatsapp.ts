import type { CartItem } from '@/features/cart/typings'
import { company } from './company'

const base = `https://wa.me/${company.whatsapp}?text=`

const ABERTURA = 'Olá! Gostaria de um orçamento:'
const ASSINATURA = 'Enviado pela vitrine FonPack.'

/**
 * Uma linha de item da mensagem. O resumo e a quantidade ficam numa linha
 * própria, indentada — o vendedor lê a lista de cima a baixo sem caçar o que é
 * nome do produto e o que é variação.
 */
function linhaItem(nome: string, resumo: string, quantidade?: number): string {
  const detalhes = [resumo, quantidade ? `Qtd: ${quantidade}` : null]
    .filter(Boolean)
    .join(' — ')

  return detalhes ? `• ${nome}\n  ${detalhes}` : `• ${nome}`
}

function montarUrl(corpo: string): string {
  return base + encodeURIComponent(`${ABERTURA}\n\n${corpo}\n\n${ASSINATURA}`)
}

/** "Comprar agora" / "Falar com um especialista" a partir da página do produto. */
export function buildItemUrl(nome: string, resumo: string): string {
  return montarUrl(linhaItem(nome, resumo))
}

/** Fechamento do orçamento inteiro a partir da página /orcamento. */
export function buildOrcamentoUrl(itens: CartItem[]): string {
  const corpo = itens
    .map((item) => linhaItem(item.nome, item.variacaoResumo, item.quantidade))
    .join('\n\n')

  return montarUrl(corpo)
}
