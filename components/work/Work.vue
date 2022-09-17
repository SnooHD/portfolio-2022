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

const animateButton = useState<string>('animate-button-state', () => null)
watch(state, (stateValue, previousStateValue) => {
  stateValue < previousStateValue ? (animateButton.value = 'back') : (animateButton.value = 'next')
})

const onTransitionEnd = () => {
  console.log('end')
}
</script>

<template>
  <VisibilityWrapper :visible="1.5" :hidden="2.5" class="w-full h-full">
    <div class="relative w-full h-full">
      <div
        class="h-full flex-shrink-0 flex flex-nowrap transition-opacity duration-400"
        :style="{
          opacity: animationState.opacity
        }"
      >
        <template v-for="(item, _key, index) in workItems" :key="`work-item-${item}`">
          <Component :is="item" :index="index" />
        </template>
      </div>
      <!--
        Background blur using backdrop-blur doesn't work if the parent element has an opacity.
        Because of this the visibilityWrapper in this component doesn't add any opacity.
        The other elements that do need to fade have the opacity directly set to them.
        The only downside is that if you scroll with this menu open, there is no smooth transition.
      -->
      <WorkMenu />
    </div>

    <Transition
      v-for="direction in ['left', 'right']"
      :key="`my-work-direction-${direction}`"
      enter-from-class="!opacity-[0]"
      leave-to-class="!opacity-[0]"
      enter-active-class="duration-400 transition-opacity"
      leave-active-class="duration-400 transition-opacity"
    >
      <button
        v-show="direction === 'left' ? state > 0 : state < Object.keys(workItems).length - 1"
        :class="`
          transition-opacity duration-400 bg-white/[.1] backdrop-blur-[2.5px] flex items-center justify-center
          rounded-full absolute top-1/2 translate-y-[-50%] w-[60px] h-[60px] z-[110] group
          ${direction === 'left' ? 'left-[-20px]' : 'right-[-20px]'}
        `"
        :style="{
          opacity: animationState.opacity
        }"
        @click.stop="() => (direction === 'left' ? state-- : state++)"
      >
        <div
          :class="`
            w-[56px] h-[56px] rounded-full bg-black/[.6] flex flex-col justify-center px-[10px] text-gray text-[12px]
            ${direction === 'left' ? 'items-end' : 'items-start'}
          `"
        >
          <Icon
            :class="`
              transition-transform duration-300 mx-[7px]
              ${direction === 'left' && animateButton === 'back' ? 'translate-x-[-3px]' : ''}
              ${direction === 'right' && animateButton === 'next' ? 'translate-x-[3px]' : ''}
            `"
            :icon="direction === 'left' ? 'ArrowLeft' : 'ArrowRight'"
            @transitionend.native="() => (animateButton = null)"
          />
          <span class="text-gray font-light font-palanquin">
            {{ direction === 'left' ? 'back' : 'next' }}
          </span>
        </div>
      </button>
    </Transition>
  </VisibilityWrapper>
</template>
