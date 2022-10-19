<script lang="ts" setup>
const { isImageLoaded } = useImages()
const { isFontLoaded } = useFonts()

const animateText = useState('animate-text', () => false)
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

const { introTextDone } = useTransitionDone()
const timeoutRef = ref<NodeJS.Timeout>()
const setTransitionDone = () => {
  clearTimeout(timeoutRef.value)
  timeoutRef.value = setTimeout(() => {
    introTextDone.value = true
  }, 300)
}

const getIndexState = (index) => index * (0.25 / 3)
const { animationState } = useAnimationScroller(
  [...Array(3)].flatMap((_value, index) => [
    {
      property: `translateX-${index}`,
      fromValue: 0,
      toValue: -10,
      scrollStart: 0.5 + getIndexState(index),
      scrollEnd: 0.75 + getIndexState(index)
    },
    {
      property: `opacity-${index}`,
      fromValue: 1,
      toValue: 0,
      scrollStart: 0.5 + getIndexState(index),
      scrollEnd: 0.75 + getIndexState(index)
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
        transition-[opacity,_transform] duration-400
        ${animationState['translateX-0'] < 0 ? '!transition-none' : ''}
      `"
      :style="{
        opacity: `${animationState['opacity-0']}`,
        transform: `translateX(${animationState['translateX-0']}%)`
      }"
    >
      <span
        :class="`
          font-atyp-text text-[.75em] leading-[1.4em] transition-[transform,_opacity] inline-block duration-400
          ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-50px] opacity-[0]'}  
        `"
      >
        Hi, I'm Mike
      </span>
    </div>

    <div class="font-atyp-display font-bold t">
      <div
        :class="`
          transition-[opacity,_transform] duration-400
          ${animationState['translateX-1'] < 0 ? '!transition-none' : ''}
        `"
        :style="{
          opacity: `${animationState['opacity-1']}`,
          transform: `translateX(${animationState['translateX-1']}%)`
        }"
      >
        <span
          :class="`
            delay-[600ms] transition-[transform,_opacity] duration-400 inline-block
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

      <div
        :class="`
          transition-[opacity,_transform] duration-400
          ${animationState['translateX-2'] < 0 ? '!transition-none' : ''}
        `"
        :style="{
          opacity: `${animationState['opacity-2']}`,
          transform: `translateX(${animationState['translateX-2']}%)`
        }"
      >
        <span
          :class="`
            delay-[900ms] transition-[transform,_opacity] duration-400 inline-block
            ${animateText ? 'skew-x-[0] opacity-[1]' : 'skew-x-[-15deg] opacity-[0]'}  
          `"
        >
          UX
        </span>
        <span
          :class="`
            delay-[900ms] transition-[opacity] duration-400 inline-block
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
