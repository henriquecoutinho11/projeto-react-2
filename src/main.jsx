import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * CONCEITO 11: REACT ROUTER
 * O BrowserRouter encapsula toda a aplicação, habilitando o roteamento SPA (Single Page Application)
 * sem recarregar a página no navegador.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
