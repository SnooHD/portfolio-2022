<script lang="ts" setup>
defineProps({
  padding: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<template>
  <p
    :class="`
      text-[16px] text-white md:text-[18px] lg:text-[21px]
      ${padding ? 'p-[15px] xs:px-[30px] sm:px-[60px] md:px-[90px] lg:px-[120px]' : ''}
    `"
  >
    <slot />
  </p>
</template>
