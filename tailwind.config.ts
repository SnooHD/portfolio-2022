import { Config } from 'tailwindcss'
import tailwindPlugin from 'tailwindcss/plugin'
import formkitTailwind from '@formkit/themes/tailwindcss'

export default <Config>{
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.ts',
    './formkit.config.ts'
  ],
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
    fontFamily: {
      'public-sans': ['Public Sans', 'sans-serif'],
      'atyp-display': ['Atyp Display', 'sans-serif'],
      'atyp-text': ['Atyp Text', 'sans-serif'],
      'heading-pro': ['Heading Pro', 'sans-serif'],
      manrope: ['Manrope', 'sans-serif']
    },
    extend: {
      colors: {
        blue: {
          light: '#79BFFF',
          DEFAULT: '#3884CA',
          dark: '#037D98'
        },
        gray: {
          light: '#424242',
          DEFAULT: '#CFCFCF'
        },
        anthracite: {
          DEFAULT: '2D2D2D',
          light: '#575757'
        },
        black: {
          DEFAULT: '#000',
          light: '#111'
        },
        white: {
          DEFAULT: '#fff',
          opaque: 'rgba(255,255,255,.1)'
        },
        mint: '#7ADEC9',
        orange: '#FE7000'
      },
      transitionDuration: {
        400: '400ms'
      },
      boxShadow: {
        'dark-long': '0 0 30px #4f5b66 inset',
        'dark-short': '0 0 1px 1px #4f5b66 inset',
        'key-button': '1px -1px 0 #1a1a1a, 1px -1px 0 0 #595959 inset',
        'key-bottom': '1px -1px 0 #1a1a1a'
      },
      keyframes: {
        'move-left': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(3px)' }
        },
        'move-right': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-3px)' }
        }
      },
      animation: {
        'move-left': 'move-left 1200ms linear infinite',
        'move-right': 'move-right 1200ms linear infinite'
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FFAA30 0%, #FE7000 35%, #FE7000 100%)',
        'gray-gradient': 'linear-gradient(135deg, #2D2D2D 30%, #121212 100%)'
      }
    }
  },
  plugins: [
    formkitTailwind,
    tailwindPlugin(({ matchUtilities }) => {
      matchUtilities({
        mask: (value: string) => ({
          maskImage: value
        }),
        'shape-margin': (value: string) => ({
          shapeMargin: value
        }),
        'text-fill-color': (value: string) => ({
          textFillColor: value,
          '-webkit-text-fill-color': value
        })
      })
    })
  ]
}
