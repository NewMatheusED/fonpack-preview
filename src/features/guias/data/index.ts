import type { Guia } from '../typings'
import { guias } from './guias'

export { ondas, materiais } from './guias'

export function getGuias(): Guia[] {
  return guias
}

export function getGuiaBySlug(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug)
}

export function getOutrosGuias(slug: string): Guia[] {
  return guias.filter((g) => g.slug !== slug)
}
