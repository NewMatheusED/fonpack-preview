import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** O hash vem da URL e pode estar mal formado (`#%`), o que faz o
 *  `decodeURIComponent` estourar. Aqui um hash inválido só não casa com nada. */
function idDoHash(hash: string): string {
  const cru = hash.slice(1)
  try {
    return decodeURIComponent(cru)
  } catch {
    return cru
  }
}

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
      // getElementById e não querySelector: o hash vem da URL, e passá-lo como
      // seletor CSS deixaria um estranho escolher o seletor (um `#a:has(...)`
      // aninhado trava o navegador, e um id numérico como `#123` nem é seletor
      // válido — estoura SyntaxError). Aqui ele é tratado como id literal.
      const alvo = document.getElementById(idDoHash(hash))
      if (alvo) {
        alvo.scrollIntoView({ behavior, block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior })
  }, [pathname, hash, navigationType])

  return null
}
