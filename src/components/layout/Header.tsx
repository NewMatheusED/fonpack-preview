import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import CartButton from '@/features/cart/components/CartButton'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/loja', label: 'Loja' },
  { to: '/fale-conosco', label: 'Contatos' },
  { to: '/sobre-nos', label: 'Sobre nós' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-accent/30 bg-brand-surface">
      {/* O wordmark é posicionado no centro absoluto do container, não numa
          coluna de grid: o monograma (~44px) e o bloco da direita (~300px) têm
          larguras diferentes, então uma coluna `1fr` entre os dois centralizaria
          a marca entre eles — visivelmente torta em relação à tela. */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center"
          aria-label="FonPack — início"
        >
          <img src="/marca/monograma.webp" alt="FonPack" className="h-8 w-8" />
        </Link>

        <Link
          to="/"
          aria-label="FonPack Embalagens — início"
          className="absolute left-1/2 flex min-h-11 -translate-x-1/2 flex-col items-center justify-center text-center leading-none"
        >
          <span className="font-sans text-xl text-brand-primary">FonPack</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-primary">
            Embalagens
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-brand-primary',
                    isActive ? 'text-brand-primary' : 'text-brand',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <CartButton />

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="h-11 w-11" />}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="font-sans text-brand-primary">FonPack</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 pb-4">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.to}
                      render={<Link to={link.to} />}
                      className="rounded-md px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-surface-2 hover:text-brand-primary"
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
