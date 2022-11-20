export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  modules: ['@nuxt/image-edge', '@formkit/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
    exposeConfig: true,
    viewer: true
  },
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
