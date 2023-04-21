import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  server: {
    proxy: {
      "/api": {target: "http://localhost:3001", changeOrigin: true, secure: false},
      // "/api/result": {target: "http://localhost:3001", changeOrigin: true, secure: false},
      // "/api/search": {target: "http://localhost:3001", changeOrigin: true, secure: false},
      // "/api/search/update": {target: "http://localhost:3001", changeOrigin: true, secure: false},
      // "/api/search/add": {target: "http://localhost:3001", changeOrigin: true, secure: false},
    },
    port: 18566,
  },
});
