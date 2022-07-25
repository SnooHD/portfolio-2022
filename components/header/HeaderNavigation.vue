<script lang="ts" setup>
const { activeMenuIndex, menuItems } = useMenu()
const { scrollToPosition } = useScroller()

const navRef = ref<HTMLMenuElement>()
const { addBodyEvent, removeBodyEvent } = useBodyEvent('click', (e: PointerEvent) => {
  // ignore clicks on parent element of this component
  if (navRef.value.contains(e.target as Node)) {
    return
  }

  toggleMenu(false)
})

const menuInvisible = useState<boolean>('menuInvisible', () => true)
const menuOpen = useState<boolean>('menuOpen', () => false)
const toggleMenu = (state: boolean) => {
  if (state) {
    menuInvisible.value = false

    requestAnimationFrame(() => {
      menuOpen.value = state
    })

    addBodyEvent()
    return
  }

  menuOpen.value = state
  removeBodyEvent()
}

const onTransitionEnd = () => {
  if (!menuOpen.value) {
    menuInvisible.value = true
  }
}
</script>

<template>
  <nav ref="navRef" class="relative select-none" role="navigation" aria-label="Main menu">
    <button
      class="text-[30px] relative right-0 top-0 z-[100]"
      :aria-expanded="menuOpen"
      aria-controls="main-menu"
      @click="() => toggleMenu(!menuOpen)"
    >
      <Icon :animation-state="menuOpen" icon="Hamburger" />
    </button>
    <div
      :class="`
        absolute top-0 right-0 w-[300px] h-[300px] z-[99] p-[4px]
        transition-transform duration-400 backdrop-blur-[1.5px]
        bg-black/10 rounded-full origin-top-right translate-x-[30%] translate-y-[-25%]
        ${menuInvisible ? 'invisible' : 'visible'}
        ${menuOpen ? 'scale-[1]' : 'scale-[0]'}
      `"
      @transitionend.self="onTransitionEnd"
    >
      <div
        class="w-full h-full pr-[50px] pt-[50px] bg-black/30 rounded-full flex items-center justify-center"
      >
        <ul
          id="main-menu"
          :class="`inline-flex flex-col
            text-white transition-opacity duration-200 space-y-[4px]
            ${menuOpen ? 'opacity-[1] delay-100' : 'opacity-[0]'}
          `"
        >
          <li
            v-for="(menuItem, index) in menuItems"
            :key="`header-navigation-item-${index}`"
            :class="`
              relative pl-3 transition-all duration-400 h-[1.5em] font-palanquin text-[16px] font-light
              before:absolute before:bg-blue before:w-[.4em] before:h-[.4em] before:rounded-full
              before:top-1/2 before:translate-y-[-50%] before:left-0 before:transition-all before:duration-400 before:ease-linear
              ${menuOpen && index === activeMenuIndex ? 'before:opacity-[1]' : 'before:opacity-[0]'}
              ${menuOpen && index !== activeMenuIndex ? 'opacity-[.6] cursor-pointer' : ''}
            `"
            :style="{
              '-webkit-text-stroke-width': menuOpen && index !== activeMenuIndex ? '0px' : '1px',
              '-webkit-text-stroke-color': 'white'
            }"
          >
            <a
              class="inline-block translate-y-[-2px]"
              :href="`#${menuItem.replace(/ /g, '-')}`"
              @click="() => (scrollToPosition = index)"
            >
              {{ menuItem }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
