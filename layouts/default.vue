<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'

const { loadFont } = useFonts()
const { menuItems } = useMenu()
const { scrollRef, scrollSectionHeight } = useScroller()

const { pending: isFontLoading } = useAsyncData(
  'preload-fonts',
  () => {
    const fonts: Record<string, fontWeightTypes[]> = {
      'Public Sans': [300, 400, 500],
      'Atyp Display': [700],
      'Atyp Text': [400]
    }

    const fontPromises = []
    Object.entries(fonts).forEach(([fontName, fontWeights]) =>
      fontWeights.forEach((fontWeight) => {
        fontPromises.push(
          loadFont({
            name: fontName,
            style: 'normal',
            weight: fontWeight
          })
        )
      })
    )

    return Promise.all(fontPromises)
  },
  {
    server: false
  }
)

const { fadeInClasses } = useTransitionDone()

// const setViewHeight = () => {
//   const viewHeight = window.outerHeight
//   console.log(viewHeight)
//   document.querySelector('html').style.height = `${viewHeight}px`
// }

// onMounted(() => {
//   setViewHeight()
//   window.addEventListener('resize', setViewHeight)
// })

// onUnmounted(() => {
//   window.removeEventListener('resize', setViewHeight)
// })
</script>

<template>
  <div class="relative w-full h-full">
    <div class="absolute z-[-1] left-0 top-0 overflow-hidden w-full h-full">
      <Background />
    </div>
    <div
      ref="scrollRef"
      class="overflow-y-auto overflow-x-hidden scroll-smooth z-[0] w-full h-full flex flex-col items-center"
    >
      <div
        :class="`
          ${isFontLoading ? 'opacity-[0]' : 'opacity-[1]'}
          transition-opacity duration-300 max-w-[1280px] sticky top-0 flex-shrink-0
          flex flex-col w-full h-full lg:px-[30px] px-[20px]
        `"
      >
        <Header
          :class="`
            h-[10%] max-h-[100px] min-h-[80px]
            ${fadeInClasses}
          `"
        />
        <!-- max height = 100% - (header + footer)  -->
        <section class="sm:px-[5%] flex-grow flex h-[70%] items-center">
          <slot />
        </section>
        <Footer
          :class="`
            relative z-[2] sm:px-[5%] h-[15%] max-h-[120px] lg:max-h-[140px] min-h-[100px]
            ${fadeInClasses}
          `"
        />
      </div>
      <div
        class="flex-shrink-0"
        :style="{
          height: `${(menuItems.length - 1) * scrollSectionHeight}px`
        }"
      />
    </div>
  </div>
</template>
