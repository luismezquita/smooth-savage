import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        id: '/',
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
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/fotosmoothie.png',
            sizes: '1080x2052',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/fotofresh.png',
            sizes: '1047x2036',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,woff2,woff,svg,png,jpg,jpeg,webp,webmanifest}'],
        globIgnores: ['screenshots/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/images/') || url.pathname.startsWith('/screenshots/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
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
