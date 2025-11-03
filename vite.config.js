import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icon-*.png'],
      manifest: {
        name: 'Alyabotic - Kodlama Macerası',
        short_name: 'Alyabotic',
        description: 'Çocuklar için eğlenceli kodlama öğrenme oyunu. 5 farklı tema ile kodlamayı öğren!',
        theme_color: '#8B5CF6',
        background_color: '#1a0033',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/Alyabotic/',
        scope: '/Alyabotic/',
        icons: [
          {
            src: '/Alyabotic/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/Alyabotic/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/Alyabotic/',
})
