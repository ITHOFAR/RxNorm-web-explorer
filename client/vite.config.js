import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  server: {
    proxy: 
    {
      "/api": {target: "http://linserv1.cims.nyu.edu:18565", changeOrigin: true, secure: false},
    },
    port: 18566,
    host: "linserv1.cims.nyu.edu"
  },
});
