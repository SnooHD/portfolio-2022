<script setup lang="ts">
const { state } = useWorkCarousel()
const workItems = {
  0: resolveComponent('WorkBasicFit'),
  1: resolveComponent('WorkStijlbreuk'),
  2: resolveComponent('WorkFreelance')
}

const animateButton = useState<string>('animate-button-state', () => '')
watch(state, (stateValue, previousStateValue) => {
  stateValue < previousStateValue ? (animateButton.value = 'back') : (animateButton.value = 'next')
})

const { transitionState } = useScrollTransition({
  visible: 2,
  hidden: 3,
  id: 'work'
})
</script>

<template>
  <div class="w-full h-full">
    <div
      :class="`
        relative w-full h-full 
        ${transitionState}
      `"
    >
      <div class="h-full flex-shrink-0 flex flex-nowrap">
        <template v-for="(item, _key, index) in workItems" :key="`work-item-${item}`">
          <Component :is="item" :index="index" />
        </template>
      </div>
    </div>

    <Transition
      v-for="direction in ['left', 'right']"
      :key="`my-work-direction-${direction}`"
      enter-from-class="!opacity-[0]"
      leave-to-class="!opacity-[0]"
      enter-active-class="duration-300 transition-opacity"
      leave-active-class="duration-300 transition-opacity"
    >
      <button
        v-show="direction === 'left' ? state > 0 : state < Object.keys(workItems).length - 1"
        :class="`
          transition-all duration-300 bg-white/[.1] backdrop-blur-[2.5px] flex items-center justify-center
          rounded-full w-[60px] h-[60px] z-[110] group
          fixed bottom-[120px]
          md:absolute md:bottom-auto md:top-1/2 md:translate-y-[-50%]
          hover:bg-white/[.2]
          ${
            direction === 'left' ? 'left-[-20px] md:left-[-40px]' : 'right-[-20px] md:right-[-40px]'
          }
          ${transitionState}
        `"
        @click.stop="
          () => {
            direction === 'left' ? state-- : state++
          }
        "
      >
        <div
          :class="`
            w-[56px] h-[56px] rounded-full bg-black/[.6] flex flex-col justify-center md:items-center px-[10px] text-gray text-[12px]
            ${direction === 'left' ? 'items-end' : 'items-start'}
          `"
        >
          <Icon
            :class="`
              transition-transform duration-300 mx-[7px]
              ${direction === 'left' && animateButton === 'back' ? 'translate-x-[-2px]' : ''}
              ${direction === 'right' && animateButton === 'next' ? 'translate-x-[2px]' : ''}
            `"
            :icon="direction === 'left' ? 'ArrowLeft' : 'ArrowRight'"
            @transitionend="() => (animateButton = '')"
          />
          <span class="text-gray font-light font-public-sans">
            {{ direction === 'left' ? 'back' : 'next' }}
          </span>
        </div>
      </button>
    </Transition>
  </div>
  <!--
      Background blur using backdrop-blur doesn't work if the parent element has an opacity.
      For that reason, the menu is managing its own transition
    -->
  <WorkMenu />
</template>
