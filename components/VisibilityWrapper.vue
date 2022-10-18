<script lang="ts" setup>
const props = defineProps({
  showOnTouch: {
    type: Boolean,
    default: true
  },
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
  <div v-if="(showOnTouch && isTouching) || isVisible" v-show="isVisible">
    <slot />
  </div>
</template>
