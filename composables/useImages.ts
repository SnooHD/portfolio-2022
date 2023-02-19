/**
 * Image helpers functions, we can use this to read the loaded state of images between components
 */

export const useImages = () => {
  const { $img } = useNuxtApp()

  const getImageSrc = (src: string, width: number) => $img(src, { width }, { preset: 'image' })
  const getImageSrcSet = (src: string, dimensions: { width: number; screenSize?: number }[]) => {
    const stringified = dimensions.map(({ width, screenSize }) => {
      const src1x = getImageSrc(src, width)
      const src2x = getImageSrc(src, width * 2)
      const screen = screenSize ? ` ${screenSize}w` : ''

      return `${src1x}${screen} 1x, ${src2x}${screen} 2x`
    })

    return stringified.join(', ')
  }

  return {
    getImageSrcSet
  }
}
