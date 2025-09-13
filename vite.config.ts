import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js alone is ~900 kB; it lives in its own lazily loaded Scene chunk behind the loading screen.
    chunkSizeWarningLimit: 1000,
  },
})
