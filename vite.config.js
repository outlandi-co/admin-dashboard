import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/',  // IMPORTANT: tells Vite to prefix asset URLs with /admin/
  plugins: [react()],
})
