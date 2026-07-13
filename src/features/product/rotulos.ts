/**
 * Os títulos dos grupos de variação vêm do catálogo em forma de instrução para
 * o usuário ("Escolha a onda que deseja"). Isso funciona na tela, mas fica
 * péssimo dentro do pedido que chega no WhatsApp do vendedor:
 *
 *   • Caixa Palete — Escolha a onda que deseja: BC | Escolha a cor: Pardo
 *
 * Aqui a instrução vira o nome do atributo, que é o que o vendedor quer ler:
 *
 *   • Caixa Palete — Onda: BC | Cor: Pardo
 */

const PREFIXO = /^(escolha|selecione)\s+(a|o|as|os)?\s*/i
const SUFIXO = /\s+(que\s+deseja|desejada?|customizad[ao]s?)$/i

export function rotuloCurto(titulo: string): string {
  const limpo = titulo.replace(PREFIXO, '').replace(SUFIXO, '').trim()
  if (!limpo) return titulo
  return limpo.charAt(0).toUpperCase() + limpo.slice(1)
}
