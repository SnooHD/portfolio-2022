<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Number,
    default: -1
  },
  hidden: {
    type: Number,
    default: null
  }
})

const { scrollPosition, isTouching } = useScroller()
const isVisible = computed(() =>
  props.hidden
    ? scrollPosition.value > props.visible && scrollPosition.value <= props.hidden
    : scrollPosition.value > props.visible
)
</script>

<template>
  <span v-if="isTouching || isVisible" v-show="isVisible" class="block w-full h-full">
    <slot />
  </span>
</template>
