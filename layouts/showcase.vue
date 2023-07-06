<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'

const { loadFont } = useFonts()
useAsyncData(
  'preload-fonts',
  () => {
    const fonts: Record<string, fontWeightTypes[]> = {
      'Public Sans': [300, 400, 500],
      'Atyp Display': [700],
      'Atyp Text': [400]
    }

    const fontPromises: Promise<void>[] = []
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

const { handleScrollEvent } = useScroller()
useDocumentEvent('scroll', handleScrollEvent)

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div class="w-full h-full min-h-screen bg-gray-gradient flex justify-center">
    <div class="max-w-[1280px] w-full relative">
      <slot />
    </div>
  </div>
</template>
