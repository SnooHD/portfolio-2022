/**
 * This hook is used to keep the state between the main navigation and sub navigation
 */

export const useMenu = () => {
  const menuItems = ['home', 'about me', 'my work', 'contact']

  const { scrollPosition, scrollToPosition } = useScroller()
  // Use a separated state for the active menu index
  // If we use the scrollPosition, there would be a delay between the click
  // and the active menu actually being set, since it will first need to scroll
  // to the correct position
  const currentMenuIndex = useState<number | null>('active-menu-index', () => null)

  // Use a boolean to keep state if a menu item was clicked that initiated the scroll
  const triggeredScroll = useState('triggered-scroll', () => false)
  watch(scrollPosition, (scrollPositionValue) => {
    if (!triggeredScroll.value) {
      currentMenuIndex.value = Math.floor(scrollPositionValue)
    }

    // If the scrollPositionValue is the scrollToPosition.value we know
    // we are done scrolling
    if (scrollPositionValue === scrollToPosition.value) {
      triggeredScroll.value = false
    }
  })

  watch(scrollToPosition, (scrollToPositionValue) => {
    if (scrollToPositionValue === null) return
    triggeredScroll.value = true
    currentMenuIndex.value = scrollToPositionValue
  })

  const activeMenuIndex = computed<number>(() =>
    currentMenuIndex.value === null ? 1 : Math.floor(currentMenuIndex.value) + 1
  )

  return {
    menuItems,
    activeMenuIndex,
    currentMenuIndex
  }
}
