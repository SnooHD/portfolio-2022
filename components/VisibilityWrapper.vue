<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Number,
    default: 0
  },
  hidden: {
    type: Number,
    default: 4
  },
  id: {
    type: String,
    required: true
  }
})

const { scrollPosition } = useScroller()

// isRendered makes sure that on initial load only the current section is rendered into view.
// This makes sure crawlers get the right data from the section
const isRendered = useState(
  `${props.id}-is-rendered`,
  () => scrollPosition.value >= props.visible && scrollPosition.value <= props.hidden
)

onMounted(() => {
  isRendered.value = true
})
</script>

<template>
  <div v-if="isRendered" class="absolute w-full h-full top-0 left-0">
    <slot />
  </div>
</template>
