module.exports = {
  theme: {
    screens: {
      xs: '460px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'h-xs': { raw: '(min-height: 750px)' },
      'h-sm': { raw: '(min-height: 800px)' },
      'h-md': { raw: '(min-height: 850px)' },
      'h-lg': { raw: '(min-height: 900px)' },
      'h-xl': { raw: '(min-height: 950px)' }
    },
    colors: {
      blue: {
        light: '#79BFFF',
        DEFAULT: '#3884CA',
        dark: '#037D98'
      },
      gray: {
        DEFAULT: '#CFCFCF'
      },
      black: {
        DEFAULT: '#000',
        light: '#111'
      },
      white: {
        DEFAULT: '#fff',
        opaque: 'rgba(255,255,255,.1)'
      }
    },
    fontFamily: {
      merriweather: ['Merriweather Sans', 'sans-serif'],
      palanquin: ['Palanquin', 'sans-serif']
    },
    extend: {
      transitionDuration: {
        400: '400ms'
      },
      boxShadow: {
        'dark-long': '0 0 30px #4f5b66 inset',
        'dark-short': '0 0 1px 1px #4f5b66 inset',
        'key-button': '1px -1px 0 #1a1a1a, 1px -1px 0 0 #595959 inset',
        'key-bottom': '1px -1px 0 #1a1a1a'
      },
      backgroundImage: {
        'basic-fit': `image-set(
            url("/assets/images/basic-fit/work-at-basic-fit.webp") 1x,
            url("/assets/images/basic-fit/work-at-basic-fit.png") 1x
          )`,
        stijlbreuk: `image-set(
            url("/assets/images/stijlbreuk/stijlbreuk.webp") 1x,
            url("/assets/images/stijlbreuk/stijlbreuk.png") 1x
          )`,
        freelance: `image-set(
            url("/assets/images/freelance/freelance.webp") 1x,
            url("/assets/images/freelance/freelance.png") 1x
          )`
      }
    }
  },
  plugins: [
    require('tailwindcss/plugin')(function ({ matchUtilities }) {
      matchUtilities({
        mask: (value) => ({
          maskImage: value
        }),
        'shape-margin': (value) => ({
          shapeMargin: value
        }),
        backface: (value) => ({
          backfaceVisibility: value
        })
      })
    })
  ]
}
