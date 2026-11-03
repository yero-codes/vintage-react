import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <FavoritesProvider>
           <CartProvider>
          <App />
          </CartProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)