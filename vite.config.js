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
            src: '/icons/icon-76.png',
            sizes: '76x76',
            type: 'image/png'
          },
          {
            src: '/icons/icon-120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          {
            src: '/icons/icon-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-1024.png',
            sizes: '1024x1024',
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
