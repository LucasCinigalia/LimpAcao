import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Em desenvolvimento, encaminha chamadas /api para o backend local.
    // Em produção (Railway), o Express serve o frontend e a API na mesma origem.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
