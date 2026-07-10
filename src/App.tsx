import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LojaPage from './pages/LojaPage'
import ProdutoPage from './pages/ProdutoPage'
import SobrePage from './pages/SobrePage'
import ContatoPage from './pages/ContatoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="loja" element={<LojaPage />} />
          <Route path="catalogo/:slug" element={<ProdutoPage />} />
          <Route path="sobre-nos" element={<SobrePage />} />
          <Route path="fale-conosco" element={<ContatoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
