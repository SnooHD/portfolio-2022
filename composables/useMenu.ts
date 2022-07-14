export const menuItems = ['home', 'about me', 'my work', 'contact']

export const useMenu = () => {
  const { scrollPosition, scrollToPosition } = useScroller()
  // Use a separated state for the active menu index
  // If we use the scrollPosition, there would be a delay between the click
  // and the active menu actually being set, since it will first need to scroll
  // to the correct position
  const activeMenuIndex = useState('active-menu-index', () => 0)

  // Use a boolean to keep state if a menu item was clicked that initiated the scroll
  const triggeredScroll = useState('triggered-scroll', () => false)
  watch(scrollPosition, (scrollPositionValue) => {
    if (!triggeredScroll.value && activeMenuIndex.value !== scrollPositionValue) {
      activeMenuIndex.value = Math.floor(scrollPositionValue)
    }

    // If the scrollPositionValue is the scrollToPosition.value we know
    // we are done scrolling
    if (scrollPositionValue === scrollToPosition.value) {
      triggeredScroll.value = false
    }
  })

  watch(scrollToPosition, (scrollToPositionValue) => {
    triggeredScroll.value = true
    activeMenuIndex.value = scrollToPositionValue
  })

  return {
    activeMenuIndex
  }
}
