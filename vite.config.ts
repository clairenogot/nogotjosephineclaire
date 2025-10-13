import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue if using Vue

export default defineConfig({
  base: './',  // use relative paths for hosting
  plugins: [react()]
})
