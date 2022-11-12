<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'

const { loadFont } = useFonts()
const { menuItems } = useMenu()
const { scrollSectionHeight } = useScroller()

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
</script>

<template>
  <div class="w-full h-full">
    <div
      :class="`
          ${isFontLoading ? 'opacity-[0]' : 'opacity-[1]'}
          transition-opacity duration-300 w-full h-screen flex justify-center  sticky top-0
        `"
    >
      <div class="z-[-1] left-0 top-0 overflow-hidden w-full h-full fixed">
        <Background />
      </div>
      <div class="max-w-[1280px] flex flex-col w-full h-full lg:px-[30px] px-[20px]">
        <Header
          :class="`
            h-[10%] max-h-[100px] min-h-[80px]
            ${fadeInClasses}
          `"
        />
        <section class="sm:px-[5%] flex-grow-0 flex h-[80%] items-center">
          <slot />
        </section>
        <!--
          Chromium mobile browsers are right now not able to animate viewport changes
          when the menu bar scrolls in or out. To keep things tidy, the footer has been
          set to a fixed position with bottom 0.
        -->
        <div
          :class="`
            fixed px-[20px] bottom-0 h-[15%] max-h-[120px] lg:max-h-[140px] min-h-[100px] w-full
            transition-[all] duration-300 max-w-[1280px] left-1/2 translate-x-[-50%] z-[1]
            ${fadeInClasses}
          `"
        >
          <Footer class="sm:px-[5%]" />
        </div>
      </div>
    </div>

    <div
      class="flex-shrink-0"
      :style="{
        height: `calc(100vh + ${(menuItems.length - 2) * scrollSectionHeight}px)`
      }"
    />
  </div>
</template>
