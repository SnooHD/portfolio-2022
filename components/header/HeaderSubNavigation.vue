<script lang="ts" setup>
const { activeMenuIndex, menuItems } = useMenu()
const { scrollPosition } = useScroller()
const menuWrapper = ref<HTMLUListElement>()
const menuItemHeight = useState<number>('menuItemHeight', () => 0)

const { scrollToHash, stringToHash } = useHashChange()

onMounted(() => {
  const menuItem = (menuWrapper.value as HTMLUListElement).querySelector('li') as HTMLLIElement
  menuItemHeight.value = menuItem.getBoundingClientRect().height
})

const menuOffset = computed<number>(() =>
  Math.max(-menuItemHeight.value * scrollPosition.value, -75)
)
const navWrapperTransition = useState('nav-wrapper-transition', () => false)
</script>

<template>
  <nav
    role="navigation"
    aria-label="Sub menu"
    class="text-[14px] xs:text-[16px] md:text-[18px] ml-[-.8em]"
  >
    <div
      ref="menuWrapper"
      class="overflow-hidden relative h-[72px] mask-[linear-gradient(to_top,_transparent_0%,_black_20%,_black_80%,_transparent_100%)]"
    >
      <ul
        :class="`
          text-white inline-flex flex-col select-none
        `"
        :style="{ transform: `translateY(${menuOffset}px)` }"
      >
        <li
          v-for="(menuItem, index) in menuItems"
          :key="`header-sub-navigation-item-${index}`"
          :tag="index"
          :test="activeMenuIndex"
          :class="`
            relative pl-[.8em] transition-all duration-300 h-[24px] font-public-sans
            first-of-type:mt-[24px] w-[100px]
            before:absolute before:bg-blue before:w-[.4em] before:h-[.4em] before:rounded-full font-light
            before:top-1/2 before:translate-y-[calc(-50%+1px)] before:left-0 before:transition-all before:duration-300 before:ease-linear
            ${index === activeMenuIndex ? 'before:opacity-[1]' : 'before:opacity-[0]'}
            ${
              index < activeMenuIndex
                ? 'mask-[linear-gradient(10deg,_black_0%,_transparent_70%)]'
                : ''
            }
            ${
              index > activeMenuIndex
                ? 'mask-[linear-gradient(350deg,_transparent_0%,_black_70%)]'
                : ''
            }
            ${
              index !== activeMenuIndex ? 'opacity-[.6] ml-[.4em] cursor-pointer text-[.875em]' : ''
            }
            ${index < activeMenuIndex || index > activeMenuIndex ? 'opacity-[0]' : ''}
          `"
          :style="{
            '-webkit-text-stroke-width': index !== activeMenuIndex ? '0px' : '1px',
            '-webkit-text-stroke-color': 'white'
          }"
        >
          <span class="flex items-center absolute w-full h-full">
            <h1 v-if="menuItem && index === activeMenuIndex">{{ menuItem }}</h1>
            <a
              v-if="menuItem && index !== activeMenuIndex"
              :href="stringToHash(menuItem)"
              @click.prevent="
                () => {
                  navWrapperTransition = true
                  scrollToHash(menuItem)
                }
              "
            >
              {{ menuItem }}
            </a>
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>
