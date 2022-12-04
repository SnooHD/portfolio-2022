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
const showShowcaseFooter = useState('showcase-footer-state', () => false)
watch(scrollPosition, () => {
  const scrollHeight = document.body.scrollHeight
  const windowHeight = window.innerHeight
  const scrollPosition = window.scrollY
  showShowcaseFooter.value = scrollHeight <= scrollPosition + windowHeight
})
</script>

<template>
  <div
    :class="`
      fixed bottom-0 left-0 w-full backdrop-blur-[5px] 
      h-[100px] flex items-center justify-center bg-anthracite/60
      transition-[transform,_background,_border] duration-400 border-t-[1px] border-t-gray-light
      ${showShowcaseFooter ? 'bg-anthracite/0 border-t-gray-light/0' : ''}
      ${
        scrollDirection === 'down' && scrollPosition > 0 && !showShowcaseFooter
          ? 'translate-y-[100%]'
          : ''
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
        <NuxtLink :to="{ path: '/', hash: '#my-work', params: { company } }">
          {{ '< Back' }}
        </NuxtLink>
      </Button>
      <Button v-if="link" class="bg-white">
        <NuxtLink :href="link" target="_blank" class="text-anthracite">View project</NuxtLink>
      </Button>
    </div>
  </div>
</template>
