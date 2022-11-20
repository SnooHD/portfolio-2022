<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  spacing: {
    type: String as PropType<'md' | 'lg'>,
    default: 'lg'
  }
})

const { getSpacing, getTextClasses } = useShowcaseClasses()
</script>

<template>
  <section
    :class="`
      ${getSpacing('px')}
      ${spacing === 'md' ? getSpacing('py-md') : getSpacing('py')}
      ${getSpacing('space-y')}
    `"
  >
    <h2 v-if="$slots.title" :class="`${getTextClasses('lg')}`">
      <slot name="title" />
    </h2>
    <slot v-if="$slots.content" name="content" />
    <slot v-else />
  </section>
</template>
>
