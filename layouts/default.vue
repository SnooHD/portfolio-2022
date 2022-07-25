<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'

const { loadFont } = useFonts()
const { menuItems } = useMenu()
const { scrollRef, scrollSectionHeight } = useScroller()

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
              flex flex-col w-full h-full lg:px-[30px] sm:px-[20px] px-[15px]
            `"
      >
        <Header class="h-[10%] max-h-[120px] min-h-[75px]" />
        <!-- max height = 100% - (header + footer)  -->
        <section class="sm:px-[20%] flex-grow flex max-h-[calc(100%-190px)] items-center">
          <slot />
        </section>
        <Footer class="sm:px-[15%] h-[15%] max-h-[180px] min-h-[115px]" />
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
