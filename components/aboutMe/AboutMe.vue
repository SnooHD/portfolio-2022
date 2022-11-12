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
      pt-[60px] h-xs:pt-[150px] max-w-[600px]
      text-[16px] sm:text-[18px] lg:text-[21px]
    `"
    :style="{
      opacity: scrollPosition < 1 ? animationState['opacity-in'] : animationState['opacity-out']
    }"
  >
    <Paragraph>
      I am a Senior front-end developer from Holland. I'm unapologetically a web generalist, but I
      particularly love diving deep into front-end development and UX design.
    </Paragraph>
    <br />
    <Paragraph>
      I develop from a strategic perspective of telling stories through visual and interactive
      systems. I find great joy in pressing buttons, but I also take great responsibility for how I
      press them.
    </Paragraph>
  </div>
</template>
