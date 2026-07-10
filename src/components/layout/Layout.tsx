import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
