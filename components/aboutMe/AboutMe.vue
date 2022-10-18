<script lang="ts" setup>
const { animationState } = useAnimationScroller([
  {
    property: 'opacity-in',
    fromValue: 0,
    toValue: 1,
    scrollStart: 0.5,
    scrollEnd: 0.9
  },
  {
    property: 'opacity-out',
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.1,
    scrollEnd: 1.5
  }
])
</script>

<template>
  <VisibilityWrapper
    :visible="0.5"
    :hidden="1.5"
    :class="`
      pt-[60px] h-xs:pt-[150px] max-w-[600px]
      text-[16px] sm:text-[18px] lg:text-[21px]
    `"
    :style="{
      opacity:
        animationState['opacity-in'] < 1
          ? animationState['opacity-in']
          : animationState['opacity-out']
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
  </VisibilityWrapper>
</template>
