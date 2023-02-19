<script lang="ts" setup>
import { fontWeightTypes } from '~/composables/useFonts'

const dimensionRef = ref<HTMLDivElement>()
const metaViewport = useState('meta-viewport', () => 'width=device-width, initial-scale=1')
const handleOrientation = (landscape: boolean) => {
  if (landscape) {
    if (!dimensionRef.value) return
    const scale = 768
    const { height } = dimensionRef.value?.getBoundingClientRect()
    const zoom = height / scale
    metaViewport.value = `height=${scale}, initial-scale=${zoom}`
    return
  }

  metaViewport.value = 'width=device-width, initial-scale=1'
}

onMounted(() => {
  const portrait = window.matchMedia('(orientation: landscape)')
  if ((portrait.matches && screen.height > 768) || (!portrait.matches && screen.width > 768)) {
    return
  }

  if (portrait.matches) handleOrientation(true)
  portrait.addEventListener('change', ({ matches }) => handleOrientation(matches))
})

const { loadFont } = useFonts()
const { pending: isFontLoading } = useAsyncData(
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

const { fadeInClasses } = useTransitionDone()

// const templateWrapper = ref<HTMLDivElement>()
// const { disableScroll } = useScrollDisabler()
// const { menuState } = useMenuOverlay('work-item')
// watch(menuState, (menuStateValue) => {
//   if (!templateWrapper.value) return
//   disableScroll(templateWrapper.value, menuStateValue)
// })

const { scrollToHash } = useHashChange()
const { scrollSectionHeight, handleScrollEvent } = useScroller()

onMounted(scrollToHash)
useWindowEvent('hashchange', () => scrollToHash())
useDocumentEvent('scroll', handleScrollEvent)
</script>

<template>
  <div class="w-full h-full">
    <Head>
      <Meta name="viewport" :content="metaViewport" />
    </Head>
    <div
      :class="`
        ${isFontLoading ? 'opacity-[0]' : 'opacity-[1]'}
        transition-opacity duration-300 w-full h-screen flex justify-center fixed top-0
      `"
    >
      <div ref="dimensionRef" class="fixed left-0 top-0 h-full w-full" />
      <div class="z-[-1] left-0 top-0 overflow-hidden w-full h-screen fixed">
        <Background />
      </div>
      <div class="max-w-[1280px] flex flex-col w-full h-full lg:px-[30px] px-[20px]">
        <Header
          :class="`
            h-[10%] max-h-[100px] min-h-[80px]
            ${fadeInClasses}
          `"
        />
        <section class="sm:px-[5%] flex-grow flex items-center">
          <slot />
        </section>
        <div class="h-[15%] max-h-[120px] lg:max-h-[140px] min-h-[100px]" />
        <!--
          Chromium mobile browsers are right now not able to animate viewport changes
          when the menu bar scrolls in or out. To keep things tidy, the footer has been
          set to a fixed position with bottom 0.
        -->
        <div
          :class="`
            fixed px-[20px] bottom-0 h-[15vh] max-h-[120px] lg:max-h-[140px] min-h-[100px] w-full
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
        height: `calc(100vh + ${(sections.length - 1) * scrollSectionHeight}px)`
      }"
    />
  </div>
</template>
