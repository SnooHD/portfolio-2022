<script lang="ts" setup>
const props = defineProps({
  animationState: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <svg
    aria-hidden="true"
    focusable="false"
    width="100%"
    height="100%"
    viewBox="0 0 27 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0"
      y="0"
      width="27"
      height="2.5"
      :class="`
        transition-transform duration-400 origin-top-right stroke-gray fill-gray
        ${props.animationState ? 'rotate-[-45deg] translate-x-[-2px]' : ''}
      `"
      stroke-width="0.5"
    />
    <rect
      x="5"
      y="9"
      width="22"
      height="2.5"
      :class="`
        transition-all duration-400 origin-right stroke-gray fill-gray
        ${props.animationState ? 'scale-x-[0] opacity-[0]' : ''}
      `"
      stroke-width="0.5"
    />
    <rect
      x="0"
      y="18"
      height="2.5"
      width="27"
      :class="`
        transition-transform duration-400 origin-bottom-right stroke-gray fill-gray
        ${props.animationState ? 'scale-x-[1] rotate-[45deg] translate-x-[-3px]' : 'scale-x-[.45]'}
      `"
      stroke-width="0.5"
    />
  </svg>
</template>
