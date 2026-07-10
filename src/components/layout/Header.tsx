import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu } from 'lucide-react'
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

function LogoMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-primary text-brand-surface">
      <Leaf className="h-5 w-5" />
    </span>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-accent/30 bg-brand-surface">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-2xl text-brand-primary">FonPack</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted">
              Embalagens
            </span>
          </span>
        </Link>

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
          <CartButton />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-serif text-brand-primary">FonPack</SheetTitle>
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
    </header>
  )
}
