<script lang="ts" setup>
const { loadImage, getImageSrc } = useImages()
const { pending: isLoadingImage } = useAsyncData(
  'preload-self-portrait',
  () => {
    return loadImage({
      src: '/assets/images/self-portrait/self-portrait.webp',
      fallback: '/assets/images/self-portrait/self-portrait.png'
    })
  },
  {
    server: false
  }
)

const { scrollPosition, isTouching } = useScroller()
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
</script>

<template>
  <picture
    v-show="scrollPosition <= 1.5"
    v-if="isTouching || scrollPosition <= 1.5"
    class="pointer-events-none"
  >
    <source srcset="/assets/images/self-portrait/self-portrait.webp" type="image/webp" />
    <img
      src="/assets/images/self-portrait/self-portrait.png"
      alt="Mike de Snoo, Senior developer portrait"
      :class="`
            mb-0 pt-[50px] mr-[-100px] xs:mr-[-140px] w-[300px]
            object-contain object-bottom float-right brightness-[0.8] contrast-[1.05]
            ${!introTransitionEnded ? 'translate-x-[10%] translation-[transform] duration-400' : ''}
          `"
      :style="{
        shapeOutside: `url(${getImageSrc('self-portrait')})`,
        opacity: `${animationState.opacity}`,
        transform:
          !isLoadingImage &&
          `translateX(${animationState.translateX}px) translateY(${animationState.translateY}px)`,
        maskImage: `linear-gradient(to bottom, black 50%, transparent ${animationState.gradientMask}%)`
      }"
      @transitionend="onTransitionEnd"
    />
  </picture>
</template>
