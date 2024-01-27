import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      manifest: {
        name: 'Home Garden',
        short_name: 'Home Garden',
        theme_color: 'ion-background-color',
        display: "standalone",
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Écoute sur toutes les interfaces réseau
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
