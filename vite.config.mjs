// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Let Netlify serve from the site root; default base is fine:
  // base: '/',
  build: {
    outDir: 'dist', // <-- match Netlify's publish directory
  },
})
