/**
 * This hook handles the current scroll position on the page
 */

export const useScroller = () => {
  const scrollSectionHeight = 400

  const isScrollingToPosition = useState<number>('is-scrolling-to-position', () => 0)
  const scrollToScrollPosition = (top: number) => {
    isScrollingToPosition.value = top * scrollSectionHeight

    window.scroll({
      top: top * scrollSectionHeight,
      behavior: 'smooth'
    })
  }

  const scrollPosition = useState<number | null>('scroll-position', () => null)
  const lastScrollPosition = useState<number | null>('active-scroll-position', () => null)
  const scrollDirection = useState<'down' | 'up'>('scroll-direction', () => 'down')

  const handleScrollEvent = () =>
    requestAnimationFrame(() => {
      const { scrollY } = window
      scrollPosition.value = Math.max(scrollY / scrollSectionHeight, 0) + 0.8

      scrollDirection.value = (lastScrollPosition.value as number) < window.scrollY ? 'down' : 'up'
      lastScrollPosition.value = window.scrollY
    })

  onMounted(() => {
    document.addEventListener('scroll', handleScrollEvent)
  })

  onUnmounted(() => {
    document.removeEventListener('scroll', handleScrollEvent)
  })

  const scrollToPosition = useState('scroll-to-position', () => 0)
  watch(scrollToPosition, (scrollToPositionValue) => {
    scrollToScrollPosition(scrollToPositionValue)
  })

  return {
    scrollPosition,
    scrollDirection,
    scrollToPosition,
    scrollSectionHeight
  }
}
