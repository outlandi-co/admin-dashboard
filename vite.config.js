import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/', // 👈 sets correct path for all static assets when deployed to /admin
  plugins: [react()],
})
