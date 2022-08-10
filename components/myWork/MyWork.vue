<script setup lang="ts">
const { scrollPosition, isTouching } = useScroller()
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
const workItems = {
  0: {
    content: resolveComponent('MyWorkBasicFit'),
    background: resolveComponent('MyWorkBasicFitBackground')
  },
  1: {
    content: resolveComponent('MyWorkStijlbreuk'),
    background: resolveComponent('MyWorkStijlbreukBackground')
  },
  2: {
    content: resolveComponent('MyWorkFreelance'),
    background: resolveComponent('MyWorkFreelanceBackground')
  }
}
</script>

<template>
  <div
    v-show="scrollPosition > 1.5"
    v-if="isTouching || scrollPosition > 1.5"
    class="w-full h-full transition-transform duration-400"
    :style="{
      opacity: animationState.opacity
    }"
  >
    <div class="w-full h-full relative">
      <div
        v-for="(item, _key, index) in workItems"
        :key="`secret-${item}`"
        :class="`
          ${currentWorkItem === index ? 'opacity-100' : ''}
          ${currentWorkItem > index ? 'opacity-0' : ''}
          ${currentWorkItem < index ? 'opacity-0' : ''}
          absolute left-0 top-0 w-full h-full duration-400 transition-[opacity]
        `"
      >
        <div class="flex w-full h-full items-center">
          <Component :is="item.content" />
        </div>
        <Component
          :is="item.background"
          :class="`
            duration-400 transition-[transform]
            ${currentWorkItem > index ? 'translate-x-[-100%]' : ''}
            ${currentWorkItem < index ? 'translate-x-[100%]' : ''}
            ${currentWorkItem === index ? 'translate-x-0' : ''}
          `"
        />
      </div>
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
        v-if="
          direction === 'left'
            ? currentWorkItem > 0
            : currentWorkItem < Object.keys(workItems).length - 1
        "
        :class="`
          rounded-full bg-black absolute top-1/2 translate-y-[-50%] w-[50px] h-[50px]
          ${direction === 'left' ? 'left-0' : 'right-0'}
        `"
        @click="() => (direction === 'left' ? currentWorkItem-- : currentWorkItem++)"
      />
    </Transition>
  </div>
</template>
