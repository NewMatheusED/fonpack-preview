import { cn } from '@/lib/utils'
import type { Material } from '../typings'

type MaterialCardProps = {
  material: Material
  image_pos: string[]
}

/** Card de material: topo verde com bullets, foto embaixo com os "✔ benefícios". */
export default function MaterialCard({ material, image_pos }: MaterialCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-brand-surface">
      <div className="bg-brand-primary px-6 py-6">
        <h2 className="font-serif text-2xl text-brand-surface underline decoration-brand-surface/50 underline-offset-4">
          {material.titulo}
        </h2>
        <ul
          className={cn(
            'mt-4 grid gap-x-6 gap-y-1.5 text-sm text-brand-surface',
            material.bullets.length > 2 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {material.bullets.map((bullet) => (
            <li key={bullet} className="list-inside list-disc marker:text-brand-surface/60">
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-55 flex-1">
        <img
          src={material.imagem}
          alt={material.titulo}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: `center ${image_pos[0]}` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/60 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
          {material.beneficios.map((beneficio) => (
            <p key={beneficio} className="text-sm font-semibold text-brand-surface">
              ✔ {beneficio}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
