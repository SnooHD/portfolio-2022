export interface PictureRefProps {
  $el: HTMLPictureElement
  src: string
}

export const useImagePreloader = () => {
  const pictureRef = ref<PictureRefProps>()

  const loadedImages = useState<string[]>('loaded-images', () => [])
  const setImageLoaded = (name: string) => {
    loadedImages.value = [...loadedImages.value, name.toLowerCase()]
  }
  const isImageLoaded = (name: string) => loadedImages.value.includes(name.toLowerCase())

  // Regex grouping used to parse the image name
  // https://regex101.com/r/fNXstO/2
  const getImageName = (src: string) => src.replace(/.*\/(.*)\..*$/, '$1')

  const onImageLoad = () => {
    const { src, $el } = pictureRef.value as PictureRefProps
    const image = $el.querySelector('img')
    if (!image || !image.complete) {
      return
    }

    const name = getImageName(src)
    setImageLoaded(name)
  }

  onMounted(() => {
    pictureRef.value && onImageLoad()
  })

  return {
    pictureRef,
    onImageLoad,
    isImageLoaded,
    loadedImages
  }
}
