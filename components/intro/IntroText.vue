<script lang="ts" setup>
const { isImageLoaded } = useImagePreloader()
const { isFontLoaded } = useFonts()
const { hashValue } = useHash()

const animateText = useState('animate-text', () => false)

// When we have a hash, we don't want to animate the text.
// When we set the animateText to true, the page will render with the end state
watch(hashValue, () => {
  if (hashValue.value === '#home') return

  animateText.value = !!hashValue.value
  introTextDone.value = true
})

watchEffect(() => {
  const preLoaded =
    isFontLoaded('atyp-display', { weight: 700 }) &&
    isFontLoaded('atyp-text') &&
    isImageLoaded('portrait')

  if (!preLoaded) {
    return
  }

  animateText.value = preLoaded
})

const { introTextDone } = useIntroTransition()
const timeoutRef = ref<NodeJS.Timeout>()
const setTransitionDone = () => {
  clearTimeout(timeoutRef.value)
  timeoutRef.value = setTimeout(() => {
    introTextDone.value = true
  }, 300)
}

const getIndexState = (index: number) => index * (0.8 / 3)
const { animationState } = useAnimationScroller(
  [...Array(3)].flatMap((_value, index) => [
    {
      property: `translateX-${index}`,
      fromValue: 0,
      toValue: -40,
      scrollStart: 0 + getIndexState(index),
      scrollEnd: 0 + getIndexState(index + 1)
    },
    {
      property: `opacity-${index}`,
      fromValue: 1,
      toValue: 0,
      scrollStart: 0 + getIndexState(index),
      scrollEnd: 0 + getIndexState(index + 1)
    }
  ])
)
</script>

<template>
  <div
    class="text-white text-[28px] xs:text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] lg:leading-[1.25em]"
  >
    <div
      :class="`
        transition-[opacity,_transform] duration-300
        ${animationState['translateX-0'] < 0 ? '!transition-none' : ''}
      `"
      :style="{
        opacity: `${animationState['opacity-0']}`,
        transform: `translateX(${animationState['translateX-0']}px)`
      }"
    >
      <span
        :class="`
          font-atyp-text text-[.75em] leading-[1.4em] inline-block
          ${
            !hashValue || hashValue === '#home'
              ? 'transition-[transform,_opacity] duration-300'
              : ''
          }
          ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-50px] opacity-[0]'}  
        `"
      >
        Hi, I'm Mike
      </span>
    </div>

    <div class="font-atyp-display font-bold t">
      <div
        :class="`
          transition-[opacity,_transform] duration-300
          ${animationState['translateX-1'] < 0 ? '!transition-none' : ''}
        `"
        :style="{
          opacity: `${animationState['opacity-1']}`,
          transform: `translateX(${animationState['translateX-1']}px)`
        }"
      >
        <span
          :class="`
            inline-block
            ${
              !hashValue || hashValue === '#home'
                ? 'delay-[600ms] transition-[transform,_opacity] duration-300'
                : ''
            }
            ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-50px] opacity-[0]'}
          `"
        >
          Front-end dev
        </span>
        <span
          :class="`
            inline-block
            ${
              !hashValue || hashValue === '#home'
                ? 'delay-[700ms] transition-[transform,_opacity] duration-300'
                : ''
            }
            ${animateText ? 'rotate-[0]  opacity-[1]' : 'rotate-[-25deg] opacity-[0]'}  
          `"
        >
          &nbsp;&
        </span>
      </div>

      <div
        :class="`
          transition-[opacity,_transform] duration-300
          ${animationState['translateX-2'] < 0 ? '!transition-none' : ''}
        `"
        :style="{
          opacity: `${animationState['opacity-2']}`,
          transform: `translateX(${animationState['translateX-2']}px)`
        }"
      >
        <span
          :class="`
            inline-block
            ${
              !hashValue || hashValue === '#home'
                ? 'delay-[900ms] transition-[transform,_opacity] duration-300'
                : ''
            }
            ${animateText ? 'skew-x-[0] opacity-[1]' : 'skew-x-[-15deg] opacity-[0]'}  
          `"
        >
          UX
        </span>
        <span
          :class="`
            inline-block
            ${
              !hashValue || hashValue === '#home'
                ? 'delay-[900ms] transition-[opacity] duration-300'
                : ''
            }
            ${animateText ? 'opacity-[1]' : 'opacity-[0]'}  
          `"
          @transitionend="setTransitionDone"
        >
          &nbsp;designer
        </span>
      </div>
    </div>
  </div>
</template>
