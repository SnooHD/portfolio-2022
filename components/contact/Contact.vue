<script lang="ts" setup>
const { animationState } = useAnimationScroller([
  {
    property: 'opacity-in',
    fromValue: 0,
    toValue: 1,
    scrollStart: 2.5,
    scrollEnd: 3
  }
])
</script>

<template>
  <VisibilityWrapper
    :visible="2.5"
    class="pt-[0px] xs:pt-[50px] h-xs:pt-[150px] max-w-[460px]"
    :style="{
      opacity:
        animationState['opacity-in'] < 1
          ? animationState['opacity-in']
          : animationState['opacity-out']
    }"
  >
    <ContactForm />
  </VisibilityWrapper>
</template>
