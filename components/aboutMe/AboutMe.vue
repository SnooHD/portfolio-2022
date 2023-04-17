<script lang="ts" setup>
const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    fromValue: 0,
    toValue: 1,
    scrollStart: 0.8,
    scrollEnd: 1,
    property: 'opacity-in'
  },
  {
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'opacity-out'
  }
])
</script>

<template>
  <div
    :class="`
      max-w-[600px] h-full
      text-[16px] sm:text-[18px] xl:text-[21px]
    `"
    :style="{
      opacity: scrollPosition < 1 ? animationState['opacity-in'] : animationState['opacity-out']
    }"
  >
    <div class="w-full py-[10%] xs:py-[20%] sm:py-[25%] md:py-[33%] xl:py-[24%]">
      <Paragraph>
        I'm a web developer from the Netherlands with 12 years of experience in building websites
        that combine stunning visuals with top-notch user experience. One of my favorite parts of
        web development is animation, as it has the power to elevate a website from good to
        exceptional.
      </Paragraph>
      <br />
      <Paragraph>
        I aim to bridge the gap between design and development. My aim is to provide a seamless user
        experience, ensuring a perfect blend of creativity and functionality. I work with a modern
        stack that includes Vue and React. I pay close attention to the code I write, ensuring that
        it is clean, efficient, and maintainable.
      </Paragraph>
    </div>
  </div>
</template>
