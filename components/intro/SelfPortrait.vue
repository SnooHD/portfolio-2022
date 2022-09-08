<script lang="ts" setup>
const { getImageFormat, getImageSrcSet, setImageLoaded, isImageLoaded } = useImages()

const { animationState } = useAnimationScroller([
  {
    property: 'gradientMask',
    fromValue: 90,
    toValue: 86,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'translateX',
    fromValue: 0,
    toValue: 30,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'translateY',
    fromValue: 0,
    toValue: 30,
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

const introTransitionEnded = useState('intro-transition-ended', () => false)
const onTransitionEnd = () => {
  introTransitionEnded.value = true
}

const onImageLoad = () => {
  setImageLoaded('self-portrait')
}

/**
 * Using `url(#image)` for shapeOutside does not work.
 * We want to make sure that the `shapeOutside` and the image `src` are using the same format
 * else we are loading an extra image.
 */
const shapeOutsideSrc = useState<string>('shape-outside-src', () => null)
const portraitImageWrapperRef = ref<HTMLDivElement>(null)
watchEffect(() => {
  const imageWrapperElement = portraitImageWrapperRef.value
  if (imageWrapperElement && isImageLoaded('self-portrait')) {
    const imageElement = imageWrapperElement.querySelector('img')
    shapeOutsideSrc.value = imageElement.currentSrc
  }
})
</script>

<template>
  <VisibilityWrapper :hidden="1.5">
    <div ref="portraitImageWrapperRef">
      <NuxtImg
        preset="image"
        :src="getImageFormat('/images/self-portrait/self-portrait.png')"
        width="300"
        sizes="xs:300px"
        preload
        :srcset="getImageSrcSet('/images/self-portrait/self-portrait.png', 300)"
        alt="Mike de Snoo, senior developer portrait"
        :class="`
          mb-0 pt-[50px] mr-[-100px] xs:mr-[-140px] object-contain object-bottom float-right brightness-[0.8] contrast-[1.05]
          ${!introTransitionEnded ? 'translate-x-[10%] translation-[transform] duration-400' : ''}
        `"
        :style="{
          shapeOutside: shapeOutsideSrc && `url(${shapeOutsideSrc})`,
          opacity: animationState.opacity,
          transform: `${
            isImageLoaded('self-portrait') &&
            `translateX(${animationState.translateX}px) translateY(${animationState.translateY}px)`
          }`,
          maskImage: `linear-gradient(to bottom, black 50%, transparent ${animationState.gradientMask}%)`
        }"
        @load.native="onImageLoad"
        @transitionend.native="onTransitionEnd"
      />
    </div>
  </VisibilityWrapper>
</template>
