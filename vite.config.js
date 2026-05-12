import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png', 'images/**/*'],
      manifest: {
        name: 'Smooth Savage',
        short_name: 'Smooth Savage',
        description: 'Fresh foods, superfoods and smoothie recipes',
        theme_color: '#2E1065',
        background_color: '#2E1065',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/rayo-hoja-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/rayo-hoja-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,woff2,svg}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//]
      }
    })
  ],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
})
