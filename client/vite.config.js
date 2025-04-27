import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/v1/upload': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        base: './',
      },
    },
  },
})
