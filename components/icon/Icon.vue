<script lang="ts" setup>
import type { PropType } from 'vue'
import { IconType } from '~/types/icons.types'
const icons = {
  Hamburger: resolveComponent('IconHamburger'),
  Arrow: resolveComponent('IconArrow'),
  Linkedin: resolveComponent('IconLinkedin'),
  Codepen: resolveComponent('IconCodepen'),
  Codesandbox: resolveComponent('IconCodesandbox')
}

defineProps({
  animationState: {
    type: Boolean,
    required: false
  },
  icon: {
    type: String as PropType<IconType>,
    required: true
  }
})
</script>

<template>
  <span class="w-[1em] h-[1em] inline-block">
    <Component :is="icons[icon]" :animation-state="animationState" />
  </span>
</template>
