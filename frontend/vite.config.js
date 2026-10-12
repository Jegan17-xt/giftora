import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    // Set VITE_BASE (e.g. '/shop/') when the site is served from a sub-folder.
    base: env.VITE_BASE || '/',
    server: { port: 5180, strictPort: true },
    build: { outDir: 'dist' },
  }
})
