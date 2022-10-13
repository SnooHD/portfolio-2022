<script lang="ts" setup>
const getIndexState = (index) => index * (0.4 / 3)
const { animationState } = useAnimationScroller(
  [...Array(3)].flatMap((_value, index) => [
    {
      property: `translateX-${index}`,
      fromValue: 0,
      toValue: -5,
      scrollStart: 0 + getIndexState(index),
      scrollEnd: 0.5 + getIndexState(index)
    },
    {
      property: `opacity-${index}`,
      fromValue: 1,
      toValue: 0,
      scrollStart: 0 + getIndexState(index),
      scrollEnd: 0.25 + getIndexState(index)
    }
  ])
)

const { isImageLoaded } = useImages()
const { isFontLoaded } = useFonts()

const animateText = useState('animate-text', () => false)
const preloadTimeout = ref()
watchEffect(() => {
  const preLoaded =
    isFontLoaded('atyp-display', { weight: 700 }) &&
    isFontLoaded('atyp-text') &&
    isImageLoaded('self-portrait')

  if (!preLoaded) {
    return
  }

  clearTimeout(preloadTimeout.value)
  preloadTimeout.value = setTimeout(() => {
    animateText.value = preLoaded
  }, 400)
})

const getAnimationStateStyles = (index) => ({
  opacity: `${animationState[`opacity-${index}`]}`,
  transform: `translateX(${animationState[`translateX-${index}`]}%)`
})
</script>

<template>
  <div
    class="text-white text-[24px] sm:text-[41px] md:text-[49px] md:leading-[61px] lg:text-[58px] lg:leading-[72px]"
  >
    <div :style="getAnimationStateStyles(0)">
      <span
        :class="`
          font-atyp-text text-[.75em] transition-[transform,_opacity] inline-block duration-400
          ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-50px] opacity-[0]'}  
        `"
      >
        Hi, I'm Mike
      </span>
    </div>

    <div class="font-atyp-display font-bold t">
      <div :style="getAnimationStateStyles(1)">
        <span
          :class="`
            delay-[300ms] transition-[transform,_opacity] duration-[500ms] inline-block
            ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-50px] opacity-[0]'}
          `"
        >
          Front-end dev
        </span>
        <span
          :class="`
            delay-[700ms] transition-[transform,_opacity] duration-400 inline-block
            ${animateText ? 'rotate-[0]  opacity-[1]' : 'rotate-[-25deg] opacity-[0]'}  
          `"
        >
          &nbsp;&
        </span>
      </div>

      <div :style="getAnimationStateStyles(2)">
        <span
          :class="`
            delay-[1100ms] transition-[transform,_opacity] duration-400 inline-block
            ${animateText ? 'skew-x-[0] opacity-[1]' : 'skew-x-[-15deg] opacity-[0]'}  
          `"
        >
          UX
        </span>
        <span
          :class="`
            delay-[1100ms] transition-[opacity] duration-400 inline-block
            ${animateText ? 'opacity-[1]' : 'opacity-[0]'}  
          `"
        >
          &nbsp;designer
        </span>
      </div>
    </div>
  </div>
</template>
