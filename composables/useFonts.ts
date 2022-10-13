/**
 * This hook preloads fonts
 */

import FontFaceObserver from 'fontfaceobserver'

export type fontWeightTypes = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
interface FontTypeProps {
  name: string
  weight?: fontWeightTypes
  style?: 'italic' | 'normal'
}

export const useFonts = () => {
  const fonts = useState<string[]>('fonts', () => [])

  const getFontName = ({ name, weight, style }: FontTypeProps) =>
    `${name.toLowerCase().replace(/ /g, '-')}-${weight}-${style}`

  const isFontLoaded = (name: string, options: Omit<FontTypeProps, 'name'> = {}) => {
    const { weight = 400, style = 'normal' } = options
    const fontName = getFontName({ name, weight, style })
    return fonts.value.includes(fontName)
  }

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

    const fontName = getFontName({ name, weight, style })
    fonts.value = [...fonts.value, fontName]
  }

  return { loadFont, isFontLoaded }
}
