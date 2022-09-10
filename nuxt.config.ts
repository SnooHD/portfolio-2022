import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  ssr: false,
  modules: ['@nuxt/image-edge', '@formkit/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
    exposeConfig: true,
    viewer: true
  },
  image: {
    presets: {
      image: {
        modifiers: {
          format: 'webp',
          quality: 80
        }
      }
    }
  }
})
