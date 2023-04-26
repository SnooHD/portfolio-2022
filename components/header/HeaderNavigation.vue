<script lang="ts" setup>
const { activeMenuIndex, menuItems } = useMenu()
const { stringToHash, scrollToHash } = useHash()

const { menuState, activeState } = useMenuOverlay('main-menu')
</script>

<template>
  <nav class="relative select-none" role="navigation" aria-label="Main menu">
    <button
      class="text-[28px] sm:text-[30px] md:text-[32px] lg:text-[34px] relative z-[110] flex items-center"
      :aria-expanded="!!activeState"
      :aria-controls="activeState === 'work-item' ? 'work-item' : 'main-menu'"
      @click.stop="() => (menuState = !menuState)"
    >
      <Icon :animation-state="!!activeState" icon="Hamburger" />
    </button>
    <MenuOverlay
      id="main-menu"
      type="main-menu"
      :class="`
        origin-top-right right-[-75px] z-[99] top-[-100px]
        w-[320px] h-[320px] sm:w-[350px] sm:h-[350px] xl:w-[380px] xl:h-[380px]
      `"
    >
      <ul
        :class="`
          inline-flex flex-col pl-[100px] pt-[115px] xl:pl-[120px]
          space-y-[15px] sm:space-y-[20px] xl:space-y-[25px]
          text-[18px] sm:text-[20px] xl:text-[22px]
        `"
      >
        <li
          v-for="(menuItem, index) in menuItems"
          :key="`header-navigation-item-${index}`"
          :class="`
            relative pl-[1em] transition-all duration-300 h-[1.5em] font-public-sans font-light
            before:absolute before:bg-blue before:w-[.4em] before:h-[.4em] before:rounded-full
            before:top-1/2 before:translate-y-[-50%] before:left-0 before:transition-all before:duration-300 before:ease-linear
            ${menuState && index === activeMenuIndex ? 'before:opacity-[1]' : 'before:opacity-[0]'}
            ${menuState && index !== activeMenuIndex ? 'opacity-[.6] cursor-pointer' : ''}
          `"
          :style="{
            '-webkit-text-stroke-width': menuState && index !== activeMenuIndex ? '0px' : '1px',
            '-webkit-text-stroke-color': 'white'
          }"
        >
          <a
            class="inline-block"
            :href="stringToHash(menuItem)"
            @click.prevent="() => scrollToHash(stringToHash(menuItem))"
          >
            {{ menuItem }}
          </a>
        </li>
      </ul>
    </MenuOverlay>
  </nav>
</template>
