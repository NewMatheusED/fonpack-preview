import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { QTD_MAX, QTD_MIN, lerQtdDigitada, limitarQtd } from '../quantidade'

type QuantityFieldProps = {
  value: number
  onChange: (n: number) => void
  mostrarLimites?: boolean
}

/**
 * Quantidade: `−`, campo digitável e `+`.
 *
 * O texto digitado vive num estado próprio (`rascunho`) enquanto o campo está em
 * foco. Sem isso, apagar tudo para trocar "1" por "20" já normalizaria o vazio
 * de volta para 1 na primeira tecla, e o cliente não conseguiria digitar. No
 * blur o rascunho é resolvido: vazio vira o mínimo, e o resto é limitado.
 */
export default function QuantityField({ value, onChange, mostrarLimites = true }: QuantityFieldProps) {
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

  const botao =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-accent text-brand-primary transition-colors hover:bg-brand-base disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => passo(-1)}
        disabled={value <= QTD_MIN}
        className={botao}
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        aria-label="Quantidade"
        value={exibido}
        onChange={(e) => digitar(e.target.value)}
        onBlur={encerrar}
        className="h-11 w-20 rounded-xl border border-brand-accent bg-brand-base text-center text-sm font-semibold text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      />

      <button
        type="button"
        aria-label="Aumentar quantidade"
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
