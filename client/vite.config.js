import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => ({
  plugins: [react(),  ],
  server: { 
    proxy: {
      '/api' : {
        target: mode === "development" ?  "http://localhost:3004" : import.meta.env.VITE_PRODUCTION_API_URL,
        changeOrigin: true, 
      }
    }
  },
}))
