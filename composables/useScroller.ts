/**
 * This hook handles the current scroll position on the page
 */

export const useScroller = () => {
  const scrollSectionHeight = 400

  const isScrollingToPosition = useState('is-scrolling-to-position', () => null)
  const scrollToScrollPosition = (top: number) => {
    isScrollingToPosition.value = top * scrollSectionHeight

    window.scroll({
      top: top * scrollSectionHeight,
      behavior: 'smooth'
    })
  }

  const scrollPosition = useState('scroll-position', () => 0)
  const lastScrollPosition = useState<number>('active-scroll-position', () => null)
  const scrollDirection = useState<'down' | 'up'>('scroll-direction', () => 'down')

  const handleScrollEvent = () =>
    requestAnimationFrame(() => {
      const { scrollY } = window
      scrollPosition.value = Math.max(scrollY / scrollSectionHeight, 0) + 0.8

      scrollDirection.value = lastScrollPosition.value < window.scrollY ? 'down' : 'up'
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
