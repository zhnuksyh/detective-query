import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Fully static, client-side SPA. `base` is relative so the build works
// on GitHub Pages project sites, Netlify, and Vercel alike.
export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    // Pre-bundle the sql.js dist entry so Vite converts its CJS/UMD form into a
    // clean ESM module with a proper default export. Excluding it (the old
    // setup) left the default export unwired in dev, so initSqlJs was missing.
    include: ['sql.js/dist/sql-wasm.js'],
  },
})
