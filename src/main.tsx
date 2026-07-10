import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import '@fontsource/alata/400.css'
import '@fontsource/italianno/400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
