<script lang="ts" setup>
const { isImageLoaded, getImageName, setImageLoaded } = useImages()

/**
 * Using `url(#image)` for shapeOutside does not work.
 * We want to make sure that the `shapeOutside` and the image `src` are using the same format
 * else we are loading an extra image.
 */
interface PictureRefProps {
  $el: HTMLPictureElement
  src: string
}

const pictureRef = ref<PictureRefProps>()
const shapeOutsideSrc = useState<string>('shape-outside-src', () => '')

const onImageLoad = () => {
  const { src, $el } = pictureRef.value as PictureRefProps
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

const { animationState } = useAnimationScroller([
  {
    fromValue: 1.4,
    toValue: 1,
    scrollStart: 0.8,
    scrollEnd: 1,
    property: 'scale'
  },
  {
    fromValue: 0,
    toValue: 10,
    scrollStart: 0.8,
    scrollEnd: 1,
    property: 'translate-y'
  },
  {
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'opacity-out'
  }
])
</script>

<template>
  <NuxtPicture
    ref="pictureRef"
    preset="image"
    src="/images/self-portrait/portrait.png"
    preload
    sizes="lg:100vw xl:820px"
    :img-attrs="{
      alt: 'Mike de Snoo, senior developer portrait',
      class: `
          mb-0 w-full h-full float-right object-contain object-bottom transition-[transform, _opacity] duration-300
          mt-[20px] lg:mt-[40px] max-w-[840px] xl:max-w-[580px] xl:scale-[1.4] origin-top
          mr-[-55%] xs:mr-[-45%] lg:mr-[-20%] xl:mr-[-5%] scale-[1]
          ${animationState['scale'] < 1.4 && animationState['scale'] > 1 ? '!transition-none' : ''}
          ${!isImageLoaded('portrait') ? 'translate-x-[10%]' : ''}
        `,
      style: {
        shapeMargin: '15px',
        shapeOutside: shapeOutsideSrc && `url(${shapeOutsideSrc})`,
        opacity: animationState['opacity-out'],
        '--tw-scale-x': animationState['scale'],
        '--tw-scale-y': animationState['scale'],
        '--tw-translate-y': `${animationState['translate-y']}%`
      }
    }"
    @load="onImageLoad"
  />
</template>
