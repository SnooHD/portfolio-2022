<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  size: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md'
  }
})
</script>

<template>
  <span
    :class="`
      font-palanquin translate-y-[-1px]
      ${props.size === 'sm' ? 'text-[16px] md:text-[18px]' : ''}
      ${props.size === 'md' ? 'text-[18px] md:text-[20px]' : ''}
    `"
  >
    <slot />
  </span>
</template>
