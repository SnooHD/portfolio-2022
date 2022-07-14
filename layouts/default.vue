<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'
const { loadFont } = useFonts()
const { scrollRef, scrollContainerRef } = useScroller()

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
      class="overflow-y-auto overflow-x-hidden scroll-smooth z-[0] w-full h-full absolute flex flex-col items-center"
    >
      <div
        ref="scrollContainerRef"
        :class="`
          max-w-[1280px] flex flex-col transition-opacity duration-300
          w-full h-full relative flex-shrink-0 flex-grow
          ${isFontLoading ? 'opacity-[0]' : 'opacity-[1]'}
        `"
      >
        <div
          class="h-screen max-h-[stretch] flex flex-col sticky top-0 lg:px-14 md:px-12 sm:px-10 px-6"
        >
          <Header />
          <section class="flex-grow flex relative items-end w-full">
            <slot />
          </section>
          <Footer>
            <template #link>
              <Link href="#next">Contact me</Link>
            </template>
            <template #button>
              <Button>View my work</Button>
            </template>
          </Footer>
        </div>
      </div>
    </div>
  </div>
</template>
