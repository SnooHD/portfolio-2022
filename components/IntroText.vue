<script lang="ts" setup>
const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller(
  [...Array(2)].flatMap((_value, index) => [
    {
      property: `translateX-${index}`,
      fromValue: 0,
      toValue: -5,
      scrollStart: 0 + index * 0.25,
      scrollEnd: 0.25 + index * 0.25
    },
    {
      property: `opacity-${index}`,
      fromValue: 1,
      toValue: 0,
      scrollStart: 0 + index * 0.25,
      scrollEnd: 0.25 + index * 0.25
    }
  ])
)

const { isImageLoaded } = useImages()
const { isFontLoaded } = useFonts()

const animateText = useState('animate-text', () => false)
watchEffect(() => {
  animateText.value = isFontLoaded('Merriweather Sans') && isImageLoaded('Portrait')
})

const textLines = ['Hi there, i am Mike.', 'It is nice to meet you.']
</script>

<template>
  <div
    v-if="scrollPosition <= 0.5"
    class="font-merriweather text-white text-[18px] leading-[21px] pt-[27vh]"
  >
    <div
      v-for="(text, index) of textLines"
      :key="`intro-text-line-${index}`"
      :style="{
        opacity: `${animationState[`opacity-${index}`]}`,
        transform: `translateX(${animationState[`translateX-${index}`]}%)`
      }"
    >
      <div
        :class="`
          translation-transform duration-300
          ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-5%] opacity-[0]'}
        `"
        :style="{
          transitionDelay: `${300 + index * 50}ms`
        }"
      >
        <span>
          {{ text }}
        </span>
        <br v-if="index === 0" />
      </div>
    </div>
  </div>
</template>
