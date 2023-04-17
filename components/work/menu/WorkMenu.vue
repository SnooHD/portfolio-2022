<script setup lang="ts">
const { state, workItems } = useWorkCarousel()

const workItemMenus = {
  0: resolveComponent('WorkBasicFitMenu'),
  1: resolveComponent('WorkStijlbreukMenu'),
  2: resolveComponent('WorkFreelanceMenu')
}

const { transitionState } = useScrollTransition({
  visible: 2,
  hidden: 3,
  id: 'work-menu'
})
</script>

<template>
  <!-- Add a negative offset so the menu left top starts offscreen -->
  <nav role="navigation" :aria-label="`${workItems[state]} showcase menu`">
    <MenuOverlay
      id="work-item"
      class="origin-top-left top-[-200px] left-[-300px]"
      type="work-item"
      size="lg"
      :background-class="transitionState"
      :menu-class="transitionState"
    >
      <!-- Counter the negative offset so the content is back at the original place -->
      <div
        :class="`
          absolute left-[300px] top-[200px] transition-opacity duration-300 w-full
        `"
      >
        <template v-for="(item, _key, index) in workItemMenus" :key="`work-item-menu-${item}`">
          <div
            :class="`
            transition-opacity duration-300 absolute left-0 top-0
            ${state === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}
          `"
          >
            <Component :is="item" :index="index" />
          </div>
        </template>
      </div>
    </MenuOverlay>
  </nav>
</template>
