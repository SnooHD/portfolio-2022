/**
 * This hook detects webp support and preloads images so we can wait until they are ready
 */

import { NuxtPicture } from '~~/.nuxt/components'

export const useImages = () => {
  const { $img } = useNuxtApp()

  const getImageSrc = (src: string, width: number) => $img(src, { width })
  const getImageSrcSet = (src: string, width: number) => {
    // const imageFormat = getImageFormat(src)
    const x1 = getImageSrc(src, width)
    const x2 = getImageSrc(src, width * 2)

    return `${x1} 1x, ${x2} 2x`
  }

  const loadedImages = useState<string[]>('loaded-images', () => [])
  const setImageLoaded = (name: string) => {
    loadedImages.value = [...loadedImages.value, name.toLowerCase()]
  }
  const isImageLoaded = (name: string) => loadedImages.value.includes(name.toLowerCase())
  const pictureRef = ref<typeof NuxtPicture>(null)

  // Regex grouping used to return only what we need
  // https://regex101.com/r/fNXstO/2
  const getImageName = (src) => src.replace(/.*\/(.*)\..*$/, '$1')

  const onLoad = () => {
    const { src } = pictureRef.value
    const name = getImageName(src)
    setImageLoaded(name)
  }

  watch(pictureRef, (imageRefValue) => {
    const image = imageRefValue.$el.querySelector('img')
    if (image && image.complete) {
      onLoad()
    }
  })

  return {
    isImageLoaded,
    setImageLoaded,
    getImageSrcSet,
    pictureRef,
    onLoad
  }
}
