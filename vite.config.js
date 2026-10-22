import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Если мы собираем проект для GitHub Pages, используем /vintage-react/, иначе корень
  base: process.env.NODE_ENV === 'production' ? '/vintage-react/' : '/',
})