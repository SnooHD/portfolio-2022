<script setup lang="ts">
const { animationState } = useAnimationScroller([
  {
    property: 'opacity',
    fromValue: 0,
    toValue: 1,
    scrollStart: 1.5,
    scrollEnd: 1.9
  }
])

const { state } = useWorkCarousel()
const workItems = {
  0: resolveComponent('WorkBasicFit'),
  1: resolveComponent('WorkStijlbreuk'),
  2: resolveComponent('WorkFreelance')
}
</script>

<template>
  <VisibilityWrapper
    :visible="1.5"
    class="w-full h-full transition-transform duration-400"
    :style="{
      opacity: animationState.opacity
    }"
  >
    <div class="relative w-full h-full">
      <div class="h-full flex-shrink-0 flex flex-nowrap">
        <template v-for="(item, _key, index) in workItems" :key="`work-item-${item}`">
          <Component :is="item" :index="index" />
        </template>
      </div>

      <WorkMenu />
    </div>

    <Transition
      v-for="direction in ['left', 'right']"
      :key="`my-work-direction-${direction}`"
      enter-to-class="opacity-100"
      leave-to-class="opacity-0"
      enter-active-class="duration-400 transition-opacity"
      leave-active-class="duration-400 transition-opacity"
    >
      <div
        v-if="direction === 'left' ? state > 0 : state < Object.keys(workItems).length - 1"
        :class="`
          rounded-full bg-white absolute top-1/2 translate-y-[-50%] w-[50px] h-[50px] z-[110]
          ${direction === 'left' ? 'left-0' : 'right-0'}
        `"
        @click.stop="() => (direction === 'left' ? state-- : state++)"
      />
    </Transition>
  </VisibilityWrapper>
</template>
