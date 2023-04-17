import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  server: {
    proxy: {
      "/api": {target: "http://127.0.0.1:3001", changeOrigin: true, secure: false},
      "/api/result/": {target: "http://127.0.0.1:3001", changeOrigin: true, secure: false},
      "/api/search": {target: "http://127.0.0.1:3001", changeOrigin: true, secure: false},
      "/api/search/update": {target: "http://127.0.0.1:3001", changeOrigin: true, secure: false},
      "/api/search/add/default": {target: "http://127.0.0.1:3001", changeOrigin: true, secure: false},
    },
    port: 18566,
  },
});
