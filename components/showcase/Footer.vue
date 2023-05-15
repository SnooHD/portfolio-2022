<script lang="ts" setup>
const { getSpacing } = useShowcaseClasses()

defineProps({
  link: {
    type: String,
    required: false,
    default: null
  },
  company: {
    type: String,
    required: true
  }
})

const { scrollDirection, scrollPosition } = useScroller()
const footerElementRef = ref<HTMLDivElement>()
const showShowcaseFooter = useState('showcase-footer-state', () => false)
watch(scrollPosition, () => {
  if (!footerElementRef.value) return

  const scrollHeight = Math.round(document.body.scrollHeight)
  const windowHeight = window.innerHeight
  const scrollPosition = window.scrollY
  const scrollBottomPosition = Math.round(scrollPosition + windowHeight)
  const { height: footerElementHeight } = footerElementRef.value.getBoundingClientRect()
  showShowcaseFooter.value = scrollHeight <= scrollBottomPosition + footerElementHeight
})
</script>

<template>
  <div
    ref="footerElementRef"
    :class="`
      bottom-0 left-0 w-full
      h-[100px] flex items-center justify-center 
      duration-400 border-t-[1px] border-t-gray-light
      ${
        showShowcaseFooter
          ? 'bg-anthracite/0 border-t-gray-light/0 transition-none absolute'
          : 'bg-anthracite/60 backdrop-blur-[5px] transition-[transform,_background,_border,_filter] fixed duration-400'
      }
      ${
        scrollDirection === 'down' && scrollPosition > 0 && !showShowcaseFooter
          ? 'translate-y-[100%]'
          : 'translate-y-0'
      }
    `"
  >
    <div
      :class="`
        max-w-[1280px] w-full flex justify-between
        ${getSpacing('px')}
      `"
    >
      <Button>
        <NuxtLink :to="{ path: '/', hash: '#my-work', query: { company, menu: 'true' } }">
          {{ '< Back' }}
        </NuxtLink>
      </Button>
      <Button v-if="link" class="bg-white group">
        <NuxtLink
          :href="link"
          target="_blank"
          class="text-anthracite group-hover:text-white transition-colors duration-300"
        >
          View project
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
