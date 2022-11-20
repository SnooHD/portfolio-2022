<script lang="ts" setup>
const { getTextClasses, getSpacing } = useShowcaseClasses()
</script>

<template>
  <section
    :class="`
      text-white
      sm:mx-[30px] md:mx-[45px] lg:mx-[60px]
      p-[15px] xs:p-[30px] sm:p-[30px] md:p-[45px] lg:p-[60px]
      border-y-[2px] sm:border-x-[2px]
      ${getSpacing('space-y')}
    `"
  >
    <h2 v-if="$slots.title" :class="getTextClasses('lg')">
      <slot name="title" />
    </h2>
    <slot v-if="$slots.content" name="content" />
    <slot v-else />
  </section>
</template>
