import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/analytics'],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore', 'recharts', 'framer-motion']
  }
});