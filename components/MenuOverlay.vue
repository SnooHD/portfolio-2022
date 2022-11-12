<script lang="ts" setup>
import { PropType } from 'vue'
import { MenuOverlayTypes } from '~/composables/useMenuOverlay'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<MenuOverlayTypes>,
    required: true
  },
  size: {
    type: String as PropType<'sm' | 'lg'>,
    default: 'sm'
  }
})

const { menuState } = useMenuOverlay(props.type)
const menuRef = ref<HTMLMenuElement>()
const { addBodyEvent, removeBodyEvent } = useBodyEvent('click', (e: PointerEvent) => {
  // ignore clicks on child element
  if (e.target !== menuRef.value && menuRef.value.contains(e.target as Node)) {
    return
  }

  menuState.value = false
})

const menuInvisible = useState<boolean>(`menu-invisible-${props.id}`, () => true)
watch(menuState, (menuStateValue) => {
  if (menuStateValue) {
    menuInvisible.value = false
    addBodyEvent()

    return
  }

  removeBodyEvent()
})

const onTransitionEnd = () => {
  if (!menuState.value) {
    menuInvisible.value = true
  }
}
</script>

<template>
  <div
    :id="id"
    ref="menuRef"
    :class="`
      flex items-center justify-center absolute z-[99]
      transition-transform duration-300 h-full w-full
      ${menuInvisible ? 'invisible' : 'visible'}
      ${menuState ? 'scale-[1]' : 'scale-[0]'}
    `"
    @transitionend.self="onTransitionEnd"
  >
    <div
      :class="`
        absolute z-[-1] block bg-white/[.04]
        rounded-full backdrop-blur-[2.5px] aspect-square p-[2px]
        backface-[hidden]
        ${
          size === 'lg'
            ? `
              bottom-[-200px] right-1/2 translate-x-[calc(50%_+_200px)]
              min-w-[1200px] w-[calc(100vw_+_200px)] max-w-[1600px]
            `
            : 'left-0 top-0 min-w-full min-h-full'
        }
      `"
    >
      <div class="w-full h-full bg-black/[.6] rounded-full" />
    </div>
    <div
      :class="`
        flex absolute z-[1] w-full
        text-white transition-opacity duration-200 top-0 left-0
        ${menuState ? 'opacity-[1] delay-100' : 'opacity-[0]'}
      `"
    >
      <slot />
    </div>
  </div>
</template>
