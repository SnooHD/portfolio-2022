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

  const loadedImages = useState<string[]>('loaded-images', () => [])
  const setImageLoaded = (name: string) => {
    loadedImages.value = [...loadedImages.value, name.toLowerCase()]
  }
  const isImageLoaded = (name: string) => loadedImages.value.includes(name.toLowerCase())

  // Regex grouping used to parse the image name
  // https://regex101.com/r/fNXstO/2
  const getImageName = (src: string) => src.replace(/.*\/(.*)\..*$/, '$1')

  return {
    isImageLoaded,
    setImageLoaded,
    getImageSrcSet,
    getImageName
  }
}
