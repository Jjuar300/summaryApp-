import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => ({
  plugins: [react(),  ],
  server: { 
    proxy: {
      '/api' : {
        target: "https://noto-api.onrender.com",
        changeOrigin: true, 
      }
    }
  },
}))
