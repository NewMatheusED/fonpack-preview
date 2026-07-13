import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'

// A home entra no bundle inicial (é onde quase todo mundo cai primeiro). As
// demais rotas são carregadas sob demanda — sem isso, quem abre a home no 4G
// baixa junto o catálogo inteiro, o carrossel das ondas e as páginas de guia.
const LojaPage = lazy(() => import('./pages/LojaPage'))
const ProdutoPage = lazy(() => import('./pages/ProdutoPage'))
const OrcamentoPage = lazy(() => import('./pages/OrcamentoPage'))
const SobrePage = lazy(() => import('./pages/SobrePage'))
const ContatoPage = lazy(() => import('./pages/ContatoPage'))
const GuiaMedidasPage = lazy(() => import('./pages/GuiaMedidasPage'))
const GuiaOndaPage = lazy(() => import('./pages/GuiaOndaPage'))
const GuiaMateriaisPage = lazy(() => import('./pages/GuiaMateriaisPage'))
const NaoEncontradaPage = lazy(() => import('./pages/NaoEncontradaPage'))

/** Reserva a altura da dobra enquanto o chunk da rota chega, para o header e o
 *  footer não colapsarem um contra o outro. */
function CarregandoRota() {
  return <div className="min-h-[60vh]" aria-busy="true" />
}

/** Rota-camada que só existe para dar um Suspense às páginas carregadas sob demanda. */
function RotasSobDemanda() {
  return (
    <Suspense fallback={<CarregandoRota />}>
      <Outlet />
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route element={<RotasSobDemanda />}>
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
            <Route path="*" element={<NaoEncontradaPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
