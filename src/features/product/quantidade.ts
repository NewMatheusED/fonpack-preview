/** Limites da quantidade pedida. É orçamento B2B: 5000 rolos é um pedido real,
 *  mas 999999999 é dedo escorregando no teclado. */
export const QTD_MIN = 1
export const QTD_MAX = 99999

/** Prende um número dentro dos limites. */
export function limitarQtd(n: number): number {
  if (!Number.isFinite(n)) return QTD_MIN
  return Math.min(QTD_MAX, Math.max(QTD_MIN, Math.trunc(n)))
}

/**
 * Interpreta o que foi digitado no campo. Aceita só dígitos — vírgula, ponto,
 * sinal e letra não são quantidade. Texto vazio devolve `null` para o campo
 * poder ficar vazio enquanto o cliente digita (só no blur ele vira QTD_MIN).
 */
export function lerQtdDigitada(texto: string): number | null {
  const digitos = texto.replace(/\D/g, '')
  if (!digitos) return null
  return limitarQtd(Number(digitos))
}
