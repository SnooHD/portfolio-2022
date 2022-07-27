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

const currentWorkItem = useState('current-work-item', () => 0)
</script>

<template>
  <div class="w-full h-full">
    <div
      v-if="scrollPosition > 1.5"
      class="w-full h-full flex space-x-[30px] transition-transform duration-300"
      :style="{
        opacity: animationState.opacity,
        transform: `translateX(calc(-${100 * currentWorkItem}% - ${30 * currentWorkItem}px))`
      }"
      @click="() => (currentWorkItem === 0 ? (currentWorkItem = 1) : (currentWorkItem = 0))"
    >
      <MyWorkBasicFit
        :class="`
          ${currentWorkItem === 0 ? 'opacity-100' : 'opacity-0'}
        `"
      />
      <MyWorkBasicFit
        :class="`
          ${currentWorkItem === 1 ? 'opacity-100' : 'opacity-0'}
        `"
      />
    </div>
  </div>
</template>
