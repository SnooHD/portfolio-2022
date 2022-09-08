/**
 * This hook detects webp support and preloads images so we can wait until they are ready
 */

export const useImages = () => {
  const { $img } = useNuxtApp()
  const hasWebpSupport = useState<boolean | null>('webp', () => null)

  if (process.client && hasWebpSupport.value === null) {
    ;(async () => {
      try {
        hasWebpSupport.value = await new Promise<boolean>((resolve, reject) => {
          // some small (2x1 px) test images for each feature
          const base64 =
            'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='

          const image = document.createElement('img')
          image.onload = () => {
            if (image.width === 2 && image.height === 1) {
              resolve(true)
            } else {
              reject('unable to load webp')
            }
          }
          image.onerror = () => {
            reject('unable to load webp')
          }
          image.src = base64
        })
      } catch (e) {
        hasWebpSupport.value = false
      }
    })()
  }

  const getImageFormat = (src: string) => {
    if (hasWebpSupport) {
      const srcWithoutFormat = src.split('.')[0]
      return srcWithoutFormat + '.webp'
    }

    return src
  }

  const getImageSrc = (src: string, width: number) => $img(getImageFormat(src), { width })
  const getImageSrcSet = (src: string, width: number) => {
    const imageFormat = getImageFormat(src)
    const x1 = getImageSrc(imageFormat, width)
    const x2 = getImageSrc(imageFormat, width * 2)

    return `${x1} 1x, ${x2} 2x`
  }

  const loadedImages = useState<string[]>('loaded-images', () => [])
  const setImageLoaded = (name: string) => {
    loadedImages.value = [...loadedImages.value, name.toLowerCase()]
  }
  const isImageLoaded = (name: string) => loadedImages.value.includes(name.toLowerCase())

  return {
    isImageLoaded,
    setImageLoaded,
    getImageSrcSet,
    getImageFormat,
    hasWebpSupport
  }
}
