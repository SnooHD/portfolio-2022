/**
 * This hook handles the current scroll position on the page
 */

export const useScroller = () => {
  const scrollSectionHeight = 400
  const scrollRef = ref<HTMLDivElement>()

  const isScrollingToPosition = useState('is-scrolling-to-position', () => null)
  const scrollToScrollPosition = (top: number) => {
    isScrollingToPosition.value = top * scrollSectionHeight

    scrollRef.value.scroll({
      top: top * scrollSectionHeight,
      behavior: 'smooth'
    })
  }

  const scrollPosition = useState('scroll-position', () => 0)
  const lastScrollPosition = useState<number>('active-scroll-position', () => null)
  const scrollDirection = useState<'down' | 'up'>('scroll-direction', () => 'down')

  const handleScrollEvent = (e: WheelEvent) =>
    requestAnimationFrame(() => {
      const currentTarget = e.target as HTMLDivElement
      const { scrollTop } = currentTarget
      scrollPosition.value = Math.max(scrollTop / scrollSectionHeight, 0)

      scrollDirection.value = lastScrollPosition.value < scrollRef.value.scrollTop ? 'down' : 'up'
      lastScrollPosition.value = scrollRef.value.scrollTop
    })

  watch([scrollRef], (value, _oldValue, onCleanUp) => {
    const [scrollElement] = value
    if (scrollElement) {
      // scrollElement.addEventListener('scroll', handleScrollEvent)
      // onCleanUp(() => {
      //   scrollElement.removeEventListener('scroll', handleScrollEvent)
      // })
    }
  })

  const scrollToPosition = useState('scroll-to-position', () => 0)
  watch(scrollToPosition, (scrollToPositionValue) => {
    if (scrollRef.value) {
      scrollToScrollPosition(scrollToPositionValue)
    }
  })

  return {
    scrollRef,
    scrollPosition,
    scrollDirection,
    scrollToPosition,
    scrollSectionHeight
  }
}
