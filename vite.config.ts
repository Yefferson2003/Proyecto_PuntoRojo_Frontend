import { defineConfig } from 'vite'
import { fileURLToPath, URL} from 'node:url'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // Puedes usar 'brotli' también, dependiendo de la compatibilidad
      threshold: 10240,   // Umbral para compresión, en bytes (10KB en este caso)
    }),
  ],
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'esbuild', 
    rollupOptions: {
      treeshake: true, 
    },
  },
})




