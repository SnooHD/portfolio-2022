export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  modules: ['@nuxt/image-edge', '@formkit/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/fonts.css'],
  tailwindcss: { cssPath: '~/assets/css/tailwind.css' },
  image: {
    screens: {
      xxs: 320,
      xs: 460,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
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
