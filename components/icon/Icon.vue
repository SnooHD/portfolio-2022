<script lang="ts" setup>
import type { PropType } from 'vue'
import { IconType } from '@/types/icons.types'
const icons = {
  Email: resolveComponent('IconEmail'),
  Hamburger: resolveComponent('IconHamburger'),
  ArrowBottomRight: resolveComponent('IconArrowBottomRight'),
  ArrowUp: resolveComponent('IconArrowUp'),
  ArrowDown: resolveComponent('IconArrowDown'),
  ArrowRight: resolveComponent('IconArrowRight'),
  ArrowLeft: resolveComponent('IconArrowLeft'),
  Linkedin: resolveComponent('IconLinkedin'),
  Codepen: resolveComponent('IconCodepen'),
  Codesandbox: resolveComponent('IconCodesandbox'),
  CheckMark: resolveComponent('IconCheckMark'),
  Check: resolveComponent('IconCheck'),
  Warning: resolveComponent('IconWarning'),
  ExplanationMark: resolveComponent('IconExplanationMark')
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
