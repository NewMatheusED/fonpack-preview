import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Numa SPA o router troca o conteúdo mas não mexe no scroll — a página nova
 * nasce na mesma altura em que a anterior estava. Este componente corrige isso:
 *
 * - navegação nova (clique num link): sobe suave até o topo;
 * - link com âncora (#secao): rola até o elemento, não até o topo;
 * - voltar/avançar do navegador (POP): não faz nada — o próprio navegador
 *   restaura a altura anterior, que é o que o usuário espera;
 * - respeita `prefers-reduced-motion`.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = prefereMenosMovimento ? 'auto' : 'smooth'

    if (hash) {
      const alvo = document.querySelector(hash)
      if (alvo) {
        alvo.scrollIntoView({ behavior, block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior })
  }, [pathname, hash, navigationType])

  return null
}
