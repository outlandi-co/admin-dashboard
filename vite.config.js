import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/admin/', // <-- crucial for correct asset URLs
  plugins: [react()],
});
