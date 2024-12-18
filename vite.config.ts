import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
