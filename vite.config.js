import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/', // 👈 sets correct path for assets when deployed
  plugins: [react()],
})
