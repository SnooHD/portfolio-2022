import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  modules: ['@nuxt/image-edge', '@formkit/nuxt', '@nuxtjs/tailwindcss'],
  buildModules: ['@nuxt/image-edge'],
  mail: {
    message: {
      to: 'snoohd@gmail.com'
    },
    smtp: {
      service: 'gmail',
      auth: {
        user: 'snoohd@gmail.com',
        pass: 'ceafurqyqraksuax'
      }
    }
  },
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
