import { useState } from 'nuxt/app'
import FontFaceObserver from 'fontfaceobserver'

export type fontWeightTypes = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
interface FontTypeProps {
  name: string
  weight?: fontWeightTypes
  style?: 'italic' | 'normal'
}

export const useFonts = () => {
  const fonts = useState<string[]>('fonts', () => [])
  const isFontLoaded = (name, options = { weight: 400, style: 'normal' }) =>
    fonts.value.includes(
      `${name.toLowerCase().replace(' ', '-')}-${options.weight}-${options.style}`
    )
  const loadFont = async ({ name, weight = 400, style = 'normal' }: FontTypeProps) => {
    const font = new FontFaceObserver(name, {
      weight,
      style
    })

    try {
      await font.load()
    } catch (e) {
      throw new Error(`Font ${name} ${weight} ${style} can not be preloaded`)
    }

    fonts.value = [...fonts.value, `${name.toLowerCase().replace(' ', '-')}-${weight}-${style}`]
  }

  return { loadFont, isFontLoaded }
}
