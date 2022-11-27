/**
 * This hook handles the current scroll position on the page
 */

export const useScroller = () => {
  const scrollSectionHeight = 400
  const scrollOffset = 0.8

  const scrollToScrollPosition = (top: number) => {
    window.scroll({
      top: top * scrollSectionHeight,
      behavior: 'smooth'
    })
  }

  const scrollPosition = useState<number>('scroll-position', () => (process.client ? scrollY : 0))
  const lastScrollPosition = useState<number>('active-scroll-position', () =>
    process.client ? scrollY : 0
  )
  const scrollDirection = useState<'down' | 'up'>('scroll-direction', () => 'down')

  const handleScrollEvent = () =>
    requestAnimationFrame(() => {
      // scrollOffset makes sure the first section directly starts scrolling
      scrollPosition.value = Math.max(scrollY / scrollSectionHeight, 0) + scrollOffset
      scrollDirection.value = (lastScrollPosition.value as number) < window.scrollY ? 'down' : 'up'
      lastScrollPosition.value = window.scrollY
    })

  onMounted(() => {
    document.addEventListener('scroll', handleScrollEvent)
  })

  onUnmounted(() => {
    document.removeEventListener('scroll', handleScrollEvent)
  })

  const scrollToPositionState = useState<number | null>('scroll-to-position', () => null)
  const scrollToPosition = computed<number | null>({
    set: (value) => {
      if (value === null) return
      // We subtract half the offset to make sure we end up in the middle of the section.
      scrollToPositionState.value = value - scrollOffset / 2
      scrollToScrollPosition(value === 0 ? 0 : value - scrollOffset / 2)
    },
    get: () =>
      scrollToPositionState.value === null ? null : scrollToPositionState.value + scrollOffset
  })

  return {
    scrollPosition,
    scrollDirection,
    scrollToPosition,
    scrollSectionHeight
  }
}
