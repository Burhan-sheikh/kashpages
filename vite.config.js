import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild (built-in, faster) instead of terser
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    }
  },
  preview: {
    port: 4173
  }
})
