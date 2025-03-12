import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true
        },
        protocolImports: true,
        include: ['crypto', 'stream', 'buffer', 'events', 'util']
      })
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      },
      cors: true
    },
    define: {
      'process.env': env // Define process.env with current environment variables
    }
  };
});
