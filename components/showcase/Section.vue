<script lang="ts" setup>
const { getSpacing, getTextClasses } = useShowcaseClasses()
</script>

<template>
  <section
    :class="`
      ${getSpacing('px')}
      ${getSpacing('py')}
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
