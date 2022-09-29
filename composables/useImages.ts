/**
 * Image helpers functions, we can use this to read the loaded state of images between components
 */

export const useImages = () => {
  const { $img } = useNuxtApp()

  const getImageSrc = (src: string, width: number) => $img(src, { width })
  const getImageSrcSet = (src: string, width: number) => {
    const x1 = getImageSrc(src, width)
    const x2 = getImageSrc(src, width * 2)

    return `${x1} 1x, ${x2} 2x`
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
