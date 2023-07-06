<script lang="ts" setup>
import { PictureRefProps } from '@/composables/useImagePreloader'

const { pictureRef, onImageLoad, isImageLoaded, loadedImages } = useImagePreloader()

/**
 * Using `url(#image)` for shapeOutside does not work.
 * We want to make sure that the `shapeOutside` and the image `src` are using the same format
 * else we are loading an extra image.
 */

const shapeOutsideSrc = useState<string>('shape-outside-src', () => '')

const { animationState } = useAnimationScroller([
  {
    fromValue: 1.4,
    toValue: 1,
    scrollStart: 0,
    scrollEnd: 1,
    property: 'scale'
  },
  {
    fromValue: 0,
    toValue: 10,
    scrollStart: 0,
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

watch(loadedImages, () => {
  if (!isImageLoaded('portrait')) return

  const { $el: image } = pictureRef.value as PictureRefProps

  shapeOutsideSrc.value = image.currentSrc
})
</script>

<template>
  <NuxtImg
    ref="pictureRef"
    preset="image"
    src="/images/self-portrait/portrait.png"
    preload
    sizes="lg:100vw xl:820px"
    width="400"
    height="auto"
    :style="{
      shapeMargin: '25px',
      shapeOutside: shapeOutsideSrc && `url(${shapeOutsideSrc})`,
      opacity: animationState['opacity-out'],
      '--tw-scale-x': animationState['scale'],
      '--tw-scale-y': animationState['scale'],
      '--tw-translate-y': `${animationState['translate-y']}%`
    }"
    :class="`
      mb-0 h-auto float-right object-contain object-bottom transition-[transform, _opacity] duration-300
      mt-[20px] lg:mt-[40px] w-[400px] scale-[1.4] origin-top
      mr-[-50%] xs:mr-[-35%] md:mr-[-20%] lg:mr-[0]
      ${animationState['scale'] < 1.4 && animationState['scale'] > 1 ? '!transition-none' : ''}
      ${!isImageLoaded('portrait') ? 'translate-x-[10%]' : ''}
    `"
    alt="Mike de Snoo, senior developer portrait"
    @load="onImageLoad"
  />
</template>
