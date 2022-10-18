<script lang="ts" setup>
const { isImageLoaded, getImageName, setImageLoaded } = useImages()

const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    property: 'maxWidth',
    fromValue: 820,
    toValue: 580,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'scale',
    fromValue: 1.4,
    toValue: 1,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'opacity',
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.1,
    scrollEnd: 1.5
  }
])

/**
 * Using `url(#image)` for shapeOutside does not work.
 * We want to make sure that the `shapeOutside` and the image `src` are using the same format
 * else we are loading an extra image.
 */
interface PictureRefProps {
  $el: HTMLPictureElement
  src: string
}

const pictureRef = ref<PictureRefProps>(null)
const shapeOutsideSrc = useState<string>('shape-outside-src', () => null)

const onImageLoad = () => {
  const { src, $el } = pictureRef.value
  const image = $el.querySelector('img')
  if (!image || !image.complete) {
    return
  }

  shapeOutsideSrc.value = image.currentSrc
  const name = getImageName(src)
  setImageLoaded(name)
}

onMounted(() => {
  onImageLoad()
})

const getCssMatchMedia = (value: number): number | false => {
  const query = window.matchMedia('(min-width: 1280px)')
  return query.matches ? value : false
}
</script>

<template>
  <VisibilityWrapper :hidden="1.5">
    <NuxtPicture
      ref="pictureRef"
      preset="image"
      src="/images/self-portrait/portrait.png"
      preload
      sizes="lg:100vw xl:820px"
      :img-attrs="{
        alt: 'Mike de Snoo, senior developer portrait',
        class: `
          mb-0 w-full h-full float-right object-contain object-bottom translation-[transform] duration-400
          mt-[20px] lg:mt-[40px] max-w-[840px] xl:max-w-[580px] xl:scale-[1.4] origin-top
          mr-[-55%] xs:mr-[-45%] lg:mr-[-20%] xl:mr-[-5%]
          ${!isImageLoaded('portrait') ? 'translate-x-[10%]' : ''}
        `,
        style: {
          shapeMargin: '15px',
          shapeOutside: shapeOutsideSrc && `url(${shapeOutsideSrc})`,
          opacity: animationState.opacity,
          '--tw-scale-x': animationState.scale,
          '--tw-scale-y': animationState.scale
        }
      }"
      @load="onImageLoad"
    />
  </VisibilityWrapper>
</template>
