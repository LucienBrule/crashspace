import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import tailwindcssVite from '@tailwindcss/vite' // Renamed to avoid confusion with postcss plugin
import autoprefixer from 'autoprefixer'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcssVite()],
  css:{
    postcss:{
      plugins:[
          autoprefixer()
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
