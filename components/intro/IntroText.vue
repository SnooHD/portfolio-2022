<script lang="ts" setup>
const { scrollPosition, isTouching } = useScroller()
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
  animateText.value = isFontLoaded('Merriweather Sans') && isImageLoaded('self-portrait')
})

const textLines = ['Hi there, i am Mike.', 'It is nice to meet you.']
</script>

<template>
  <!--
    Vertical align does not work correctly when it needs to collapse to multiple lines,
    going with padding top using media queries based on height.
  -->
  <div
    v-show="scrollPosition <= 0.5"
    v-if="isTouching || scrollPosition <= 0.5"
    :class="`
      font-merriweather text-white h-[50%] pt-[130px]
      text-[18px] leading-[21px]
      md:text-[21px] md:leading-[24px]
      lg:text-[24px] lg:leading-[36px]
    `"
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
          translation-transform duration-400
          ${animateText ? 'translate-x-[0] opacity-[1]' : 'translate-x-[-5%] opacity-[0]'}
        `"
        :style="{
          transitionDelay: `${300 + index * 50}ms`
        }"
      >
        <div
          :class="`
            ${index === 0 ? 'md:translate-x-[-5px]' : ''}
          `"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>
