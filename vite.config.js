import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.tsx'],
      buildDirectory: 'build',
    }),
    react({ fastRefresh: false }),
  ],
  build: {
    manifest: true,
    outDir: 'public/build',
  },
  server: {
    host: true,
    port: 5173,
  },
  base: '/build/', // important for production
});

