import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import ScrollToTop from './ScrollToTop'

/**
 * O wrapper é o canvas branco (`brand-base`). O que precisa se levantar dele —
 * hero, painéis, cards, footer — pede o creme explicitamente. Ver a regra das
 * superfícies em src/styles/tokens.css.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-base">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
