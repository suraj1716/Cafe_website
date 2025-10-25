import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

// for production
// export default defineConfig({
//   plugins: [
//     laravel({
//       input: ['resources/js/app.tsx'],
//       buildDirectory: 'build',
//        refresh: true,
//     }),
//     react({ fastRefresh: false }),
//   ],
//   build: {
//     manifest: true,
//     outDir: 'public/build',
//   },
//   server: {
//     host: true,
//     port: 5173,
//   },
//   base: '/build/', // important for production
// });


// for local development
export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.tsx'],
      buildDirectory: 'build',
       refresh: true,
    }),
    react({ fastRefresh: false }),
  ],
  build: {
    manifest: true,
    outDir: 'public/build',
  },
  server: {
    host: 'localhost',
    port: 5173,
       hmr: {
      host: 'localhost',
    },
  },
  base: '/build/', // important for production
});
