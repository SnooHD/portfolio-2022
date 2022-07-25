<script setup lang="ts">
const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    property: 'opacity',
    fromValue: 0,
    toValue: 1,
    scrollStart: 1.5,
    scrollEnd: 1.9
  }
])
</script>

<template>
  <div
    v-if="scrollPosition > 1.5"
    class="w-full h-full absolute left-0 top-0 flex"
    :style="{
      opacity: animationState.opacity
    }"
  >
    <MyWorkBasicFit />
  </div>
</template>
