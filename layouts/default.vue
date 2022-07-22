<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'
const { loadFont } = useFonts()
const { scrollRef, scrollContainerRef, scrollContainerHeight, scrollChildHeight } = useScroller()

const { pending: isFontLoading } = useAsyncData(
  'preload-fonts',
  () => {
    const fonts: Record<string, fontWeightTypes[]> = {
      Palanquin: [300, 500],
      'Merriweather Sans': [400]
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

const setScrollChildHeight = () => {
  const { height: scrollElementHeight } = scrollRef.value.getBoundingClientRect()
  if (scrollElementHeight === scrollChildHeight.value) {
    return
  }

  scrollChildHeight.value = scrollElementHeight
}

useWindowEvent(setScrollChildHeight, 'resize')
</script>

<template>
  <div class="relative w-full h-full">
    <div class="absolute z-[-1] left-0 top-0 overflow-hidden w-full h-full">
      <Background />
    </div>
    <div
      ref="scrollRef"
      class="overflow-y-auto overflow-x-hidden scroll-smooth z-[0] w-full h-full absolute flex flex-col items-center"
    >
      <div
        ref="scrollContainerRef"
        :class="`
          max-w-[1280px] flex flex-col transition-opacity duration-300
          w-full relative flex-shrink-0 flex-grow
          ${isFontLoading ? 'opacity-[0]' : 'opacity-[1]'}
        `"
        :style="{
          height: `${scrollContainerHeight}px` || '100%'
        }"
      >
        <div
          class="flex flex-col sticky top-0 lg:px-14 md:px-12 sm:px-10 xs:px-6 px-2"
          :style="{
            height: `${scrollChildHeight}px` || '100%'
          }"
        >
          <Header class="h-[10%] max-h-[120px] min-h-[75px]" />
          <!-- max height = 100% - (header + footer)  -->
          <section class="flex-grow flex max-h-[calc(100%-190px)] items-center">
            <slot />
          </section>
          <Footer class="h-[15%] max-h-[180px] min-h-[115px]" />
        </div>
      </div>
    </div>
  </div>
</template>
