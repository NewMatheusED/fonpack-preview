import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LojaPage from './pages/LojaPage'
import ProdutoPage from './pages/ProdutoPage'
import OrcamentoPage from './pages/OrcamentoPage'
import SobrePage from './pages/SobrePage'
import ContatoPage from './pages/ContatoPage'
import GuiaMedidasPage from './pages/GuiaMedidasPage'
import GuiaOndaPage from './pages/GuiaOndaPage'
import GuiaMateriaisPage from './pages/GuiaMateriaisPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="loja" element={<LojaPage />} />
          <Route path="catalogo/:slug" element={<ProdutoPage />} />
          <Route path="orcamento" element={<OrcamentoPage />} />
          <Route path="sobre-nos" element={<SobrePage />} />
          <Route path="fale-conosco" element={<ContatoPage />} />
          <Route path="guia/como-tirar-medidas" element={<GuiaMedidasPage />} />
          <Route path="guia/qual-onda-escolher" element={<GuiaOndaPage />} />
          <Route
            path="guia/plastico-bolha-divisorias-ou-papel-kraft"
            element={<GuiaMateriaisPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
