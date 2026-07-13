import { useState } from 'react'
import { cn } from '@/lib/utils'

type ProductGalleryProps = {
  imagens: string[]
  nome: string
}

export default function ProductGallery({ imagens, nome }: ProductGalleryProps) {
  const [index, setIndex] = useState(0)
  const principal = imagens[index] ?? imagens[0]

  return (
    <div>
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-brand-surface p-10">
        {principal && <img src={principal} alt={nome} className="h-full w-full object-contain" />}
      </div>

      {imagens.length > 1 && (
        <div className="mt-4 flex gap-2">
          {imagens.map((img, i) => (
            <button
              key={img}
              type="button"
              aria-label={`Ver imagem ${i + 1} de ${nome}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-brand-surface p-1',
                i === index ? 'border-brand-primary' : 'border-transparent',
              )}
            >
              <img src={img} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
