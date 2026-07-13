import { cn } from '@/lib/utils'

type OndaWaveProps = {
  /** classe Tailwind de stroke (ex.: "stroke-onda-d") — cor definida em tokens.css. */
  colorClass: string
  amplitude?: number
  frequencia?: number
  /** 2 desenha duas linhas sobrepostas (ondas duplas: BB/BC). */
  camadas?: number
  className?: string
}

const WIDTH = 240
const HEIGHT = 32
const STEPS = 60

function buildWavePath(amplitude: number, frequencia: number, offset: number): string {
  const points: string[] = []
  for (let i = 0; i <= STEPS; i++) {
    const x = (WIDTH / STEPS) * i
    const y = HEIGHT / 2 + offset + amplitude * Math.sin((frequencia * Math.PI * 2 * i) / STEPS)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

/** Linha de onda decorativa em SVG — amplitude/frequência variam por tipo de onda. */
export default function OndaWave({
  colorClass,
  amplitude = 6,
  frequencia = 6,
  camadas = 1,
  className,
}: OndaWaveProps) {
  const offsets = camadas > 1 ? [-4, 4] : [0]

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('h-8 w-full', className)}
    >
      {offsets.map((offset) => (
        <path
          key={offset}
          d={buildWavePath(amplitude, frequencia, offset)}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colorClass}
        />
      ))}
    </svg>
  )
}
