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
        speaker: 'radial-gradient(#4f5b66 33%, transparent 35%)',
        'space-gray': 'linear-gradient(135deg, #69696c 0%, #a7adba 50%, #a7adba 51%, #69696c 100%)',
        apple:
          "url('https://9to5mac.com/wp-content/uploads/sites/6/2021/10/Monterey-Graphic-2-dragged.jpeg?quality=82&strip=all&w=1000')"
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
        })
      })
    })
  ]
}
