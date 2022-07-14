<script lang="ts" setup>
const { menuItems, activeMenuIndex } = useMenu()
const menuWrapper = ref<HTMLUListElement>()
const menuItemHeight = useState<number>('menuItemHeight', () => 0)

onMounted(() => {
  const menuItem = menuWrapper.value.querySelector('li')
  menuItemHeight.value = menuItem.getBoundingClientRect().height
})

const menuOffset = computed<number>(() => {
  if (currentMenuIndex.value <= 1) {
    return 0
  }

  return -menuItemHeight.value * (currentMenuIndex.value - 1)
})
const currentMenuIndex = computed<number>(() => activeMenuIndex.value + 1)
</script>

<template>
  <nav role="navigation" aria-label="Sub menu">
    <div
      ref="menuWrapper"
      class="overflow-hidden relative h-[4.5em] mask-[linear-gradient(to_top,_transparent_0%,_black_20%,_black_80%,_transparent_100%)]"
    >
      <ul
        class="text-white inline-flex flex-col select-none transition-transform duration-400"
        :style="{ transform: `translateY(${menuOffset}px)` }"
      >
        <li
          v-for="(menuItem, index) in ['', ...menuItems]"
          :key="`header-sub-navigation-item-${index}`"
          :class="`
            relative pl-3 transition-all duration-400 h-[1.5em] font-palanquin
            before:absolute before:bg-blue before:w-[.4em] before:h-[.4em] before:rounded-full font-light
            before:top-1/2 before:translate-y-[-50%] before:left-0 before:transition-all before:duration-400 before:ease-linear
            ${index === currentMenuIndex ? 'before:opacity-[1]' : 'before:opacity-[0]'}
            ${
              index < currentMenuIndex
                ? 'mask-[linear-gradient(10deg,_black_0%,_transparent_70%)]'
                : ''
            }
            ${
              index > currentMenuIndex
                ? 'mask-[linear-gradient(350deg,_transparent_0%,_black_70%)]'
                : ''
            }
            ${
              index !== currentMenuIndex
                ? 'opacity-[.6] ml-[.4em] cursor-pointer text-[14px]'
                : 'text-[16px]'
            }
            ${index < currentMenuIndex - 1 || index > currentMenuIndex + 1 ? 'opacity-[0]' : ''}
            ${index === 0 ? 'pointer-events-none' : ''}
          `"
          :style="{
            WebkitTextStrokeWidth: index !== currentMenuIndex ? '0px' : '1px',
            WebkitTextStrokeColor: 'white'
          }"
        >
          <span class="inline-block translate-y-[-2px]">
            <h1 v-if="menuItem && index === currentMenuIndex">{{ menuItem }}</h1>
            <a
              v-if="menuItem && index !== currentMenuIndex"
              :href="`#${menuItem.replace(/ /g, '-')}`"
              @click="() => (activeMenuIndex = index - 1)"
            >
              {{ menuItem }}
            </a>
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>
