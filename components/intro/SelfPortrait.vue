<script lang="ts" setup>
const { loadImage, getImageSrc } = useImages()
const { pending: isLoadingImage } = useAsyncData(
  'preload-self-portrait',
  () => {
    return loadImage({
      src: '/assets/images/self-portrait/portrait.webp',
      fallback: '/assets/images/self-portrait/portrait.png'
    })
  },
  {
    server: false
  }
)

const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    property: 'gradientMask',
    fromValue: 80,
    toValue: 60,
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
</script>

<template>
  <picture v-if="scrollPosition <= 1.5">
    <source srcset="/assets/images/self-portrait/portrait.webp" type="image/webp" />
    <img
      src="/assets/images/self-portrait/portrait.png"
      alt="Mike de Snoo, Senior developer portrait"
      :class="`
            mb-[0px] mr-[-180px] xs:mr-[-140px] min-w-[340px] w-[340px]
            object-contain object-bottom float-right
            ${!introTransitionEnded ? 'translate-x-[10%] translation-[transform] duration-300' : ''}
          `"
      :style="{
        shapeOutside: `url(${getImageSrc('Portrait')})`,
        opacity: `${animationState.opacity}`,
        transform:
          !isLoadingImage &&
          `translateX(${animationState.translateX}px) translateY(${animationState.translateY}px)`,
        maskImage: `linear-gradient(to bottom, black ${animationState.gradientMask}%, transparent 100%)`
      }"
      @transitionend="onTransitionEnd"
    />
  </picture>
</template>
