import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QTD_MAX, QTD_MIN, lerQtdDigitada, limitarQtd } from '../quantidade'

type QuantityFieldProps = {
  value: number
  onChange: (n: number) => void
  mostrarLimites?: boolean
  ariaLabel?: string
  /** Versão menor, usada dentro dos cards de opção única (ver `MultiSelectOptionCard`). */
  compact?: boolean
}

/**
 * Quantidade: `−`, campo digitável e `+`.
 *
 * O texto digitado vive num estado próprio (`rascunho`) enquanto o campo está em
 * foco. Sem isso, apagar tudo para trocar "1" por "20" já normalizaria o vazio
 * de volta para 1 na primeira tecla, e o cliente não conseguiria digitar. No
 * blur o rascunho é resolvido: vazio vira o mínimo, e o resto é limitado.
 */
export default function QuantityField({
  value,
  onChange,
  mostrarLimites = false,
  ariaLabel = 'Quantidade',
  compact = false,
}: QuantityFieldProps) {
  const [rascunho, setRascunho] = useState<string | null>(null)
  const exibido = rascunho ?? String(value)

  function digitar(texto: string) {
    setRascunho(texto.replace(/\D/g, ''))
    const n = lerQtdDigitada(texto)
    if (n !== null) onChange(n)
  }

  function encerrar() {
    setRascunho(null)
    onChange(limitarQtd(value))
  }

  const passo = (delta: number) => onChange(limitarQtd(value + delta))

  const botao = cn(
    'flex shrink-0 items-center justify-center rounded-full border border-brand-accent bg-brand-base text-brand-primary transition-colors hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-base',
    compact ? 'h-9 w-9' : 'h-11 w-11',
  )

  return (
    <div className={cn('flex items-center', compact ? 'gap-2' : 'gap-3')}>
      <button
        type="button"
        aria-label={`Diminuir ${ariaLabel.toLowerCase()}`}
        onClick={() => passo(-1)}
        disabled={value <= QTD_MIN}
        className={botao}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={exibido}
        onChange={(e) => digitar(e.target.value)}
        onBlur={encerrar}
        className={cn(
          'rounded-xl border border-brand-accent bg-brand-base text-center text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
          compact ? 'h-9 w-14' : 'h-11 w-20',
        )}
      />

      <button
        type="button"
        aria-label={`Aumentar ${ariaLabel.toLowerCase()}`}
        onClick={() => passo(1)}
        disabled={value >= QTD_MAX}
        className={botao}
      >
        <Plus className="h-4 w-4" />
      </button>

      {mostrarLimites && (
        <span className="text-xs text-brand-muted">
          mín. {QTD_MIN} · máx. {QTD_MAX.toLocaleString('pt-BR')}
        </span>
      )}
    </div>
  )
}
