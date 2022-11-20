<script lang="ts" setup>
const { getFontSize, getTextClasses } = useShowcaseClasses()
</script>

<template>
  <div>
    <h3 v-if="$slots.title" :class="`${getTextClasses('md')} uppercase`">
      <slot name="title" />
    </h3>
    <p
      :class="`
        text-white font-public-sans font-normal
        ${getFontSize('md')}
      `"
    >
      <slot v-if="$slots.content" name="content" />
      <slot v-else />
    </p>
  </div>
</template>
