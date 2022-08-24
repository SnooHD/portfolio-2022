<script lang="ts" setup>
const { activeMenuIndex, menuItems } = useMenu()
const { scrollToPosition } = useScroller()

const { menuState, activeState } = useMenuOverlay('main-menu')
</script>

<template>
  <nav class="relative select-none" role="navigation" aria-label="Main menu">
    <button
      class="text-[30px] relative right-0 top-0 z-[110]"
      :aria-expanded="!!activeState"
      :aria-controls="activeState === 'work-item' ? 'work-item' : 'main-menu'"
      @click.stop="() => (menuState = !menuState)"
    >
      <Icon :animation-state="!!activeState" icon="Hamburger" />
    </button>
    <MenuOverlay
      id="main-menu"
      type="main-menu"
      class="origin-top-right right-[-75px] w-[300px] h-[300px] z-[99] top-[-100px]"
    >
      <ul
        :class="`
          inline-flex flex-col space-y-[4px] pl-[100px] pt-[115px]
        `"
      >
        <li
          v-for="(menuItem, index) in menuItems"
          :key="`header-navigation-item-${index}`"
          :class="`
            relative pl-3 transition-all duration-400 h-[1.5em] font-palanquin text-[16px] font-light
            before:absolute before:bg-blue before:w-[.4em] before:h-[.4em] before:rounded-full
            before:top-1/2 before:translate-y-[-50%] before:left-0 before:transition-all before:duration-400 before:ease-linear
            ${
              menuState && index + 1 === activeMenuIndex
                ? 'before:opacity-[1]'
                : 'before:opacity-[0]'
            }
            ${menuState && index + 1 !== activeMenuIndex ? 'opacity-[.6] cursor-pointer' : ''}
          `"
          :style="{
            '-webkit-text-stroke-width': menuState && index + 1 !== activeMenuIndex ? '0px' : '1px',
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
    </MenuOverlay>
  </nav>
</template>
