import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.tsx'],
      refresh: true,
    }),
    react({
      fastRefresh: false, // no eval usage
    }),
  ],
  build: {
    manifest: true,
    outDir: 'public/build',
  },
  server: {
    host: 'localhost',
    port: 5173,
  },
});
