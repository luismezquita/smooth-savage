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
        id: '/',
        name: 'Smooth Savage',
        short_name: 'Smooth Savage',
        description: 'Fresh foods, superfoods and smoothie recipes',
        theme_color: '#2E1065',
        background_color: '#2E1065',
        display: 'standalone',
        orientation: 'portrait',
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
            src: '/images/screenshots/fotosmoothie.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/images/screenshots/fotofresh.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,woff2,svg}'],
        globIgnores: ['**/images/**'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/images\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 300,
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
