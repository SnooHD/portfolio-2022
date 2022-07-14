<script lang="ts" setup>
import { watchPostEffect } from 'vue'

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
    scrollStart: 2,
    scrollEnd: 2.1
  }
])

/**
 * Since the shape-outside property is inline we cant force it to the bottom of the container
 * To fix that i calculate the offset position and set a margin-top
 */
const outsideShapeRef = ref<HTMLDivElement>()
const shapeOutsideMarginTop = useState('shape-outside-margin-top', () => 0)

const setShapeOutsideMarginTop = () => {
  const { height: outsideShapeHeight } = outsideShapeRef.value.getBoundingClientRect()
  const sectionElement = document.querySelector('section') as HTMLElement
  const { height: sectionHeight } = sectionElement.getBoundingClientRect()

  shapeOutsideMarginTop.value = Math.ceil(sectionHeight - outsideShapeHeight)
}

const { addWindowEvent, removeWindowEvent } = useWindowEvent(
  () => requestAnimationFrame(setShapeOutsideMarginTop),
  'resize'
)

onMounted(() => {
  addWindowEvent()
})

onUnmounted(() => {
  removeWindowEvent()
})

watchPostEffect(() => {
  if (outsideShapeRef.value) {
    setShapeOutsideMarginTop()
  }
})
</script>

<template>
  <span v-if="scrollPosition <= 2.1">
    <img
      v-if="getImageSrc('Portrait')"
      ref="outsideShapeRef"
      aria-hidden="true"
      :class="`
        float-right h-full opacity-0
        max-h-[60vh] w-[90%] object-contain pointer-events-none shape-margin-[15px]
        ${scrollPosition <= 0.5 ? 'mr-[-140px]' : 'mb-[-30px] mr-[-170px]'}
      `"
      :style="{
        marginTop:
          scrollPosition <= 0.5 ? `${shapeOutsideMarginTop}px` : `${shapeOutsideMarginTop + 30}px`,
        shapeOutside: `url(${getImageSrc('Portrait')})`
      }"
    />
    <div
      :class="`
        absolute z-[10] translation-[transform] duration-300 w-full h-full pointer-events-none bottom-[20px]
        ${!isLoadingImage ? 'translate-x-[0%]' : 'translate-x-[10%]'}
      `"
    >
      <picture>
        <source srcset="/assets/images/self-portrait/portrait.webp" type="image/webp" />
        <img
          src="/assets/images/self-portrait/portrait.png"
          alt="Mike de Snoo, Senior developer portrait"
          :class="`
            mb-[0px] mr-[-140px] max-h-[60vh] h-full pointer-events-auto
            w-[90%] object-contain absolute bottom-0 right-0 object-bottom
          `"
          :style="{
            opacity: `${animationState.opacity}`,
            transform: `translateX(${animationState.translateX}px) translateY(${animationState.translateY}px)`,
            maskImage: `linear-gradient(to bottom, black ${animationState.gradientMask}%, transparent 100%)`
          }"
        />
      </picture>
    </div>
  </span>
</template>
