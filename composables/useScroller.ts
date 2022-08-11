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

  const scrollPosition = useState('scroll-position', () => null)
  const swiped = useState('swiped', () => false)
  const onSwipe = () => {
    scrollToScrollPosition(Math.round(scrollPosition.value))
  }

  const { isTouching } = useSwipe({
    element: scrollRef,
    direction: 'y',
    onSwipe
  })

  const lastScrollPosition = useState<number>('active-scroll-position', () => null)
  const scrollTimeout = useState('scroll-timeout', () => 0)
  const handleOverscroll = (nextScrollPosition: number) => {
    let delta = 0
    if (lastScrollPosition.value !== null) {
      delta = scrollRef.value.scrollTop - lastScrollPosition.value
    }

    // Block delta proximity and timeout if we are scrolling through the scrollToPosition function
    if (isScrollingToPosition.value !== null || swiped.value) {
      scrollPosition.value = nextScrollPosition
      if (scrollRef.value.scrollTop === isScrollingToPosition.value) {
        isScrollingToPosition.value = null
      }
      return
    }

    window.clearTimeout(scrollTimeout.value)

    // Use delta proximity to directly move to next or previous section
    if (delta >= 5) {
      lastScrollPosition.value = null
      scrollToScrollPosition(Math.round(scrollPosition.value) + (delta < 200 ? 1 : 0))
      return
    }

    if (delta <= -5) {
      lastScrollPosition.value = null
      scrollToScrollPosition(Math.round(scrollPosition.value) + (delta > -200 ? -1 : 0))
      return
    }

    scrollPosition.value = nextScrollPosition

    // If we didn't scroll for 100ms, we will scroll to the closest section
    scrollTimeout.value = window.setTimeout(() => {
      lastScrollPosition.value = null
      scrollToScrollPosition(Math.round(scrollPosition.value))
    }, 100)

    lastScrollPosition.value = scrollRef.value.scrollTop
  }

  const handleScrollEvent = (e: WheelEvent) =>
    requestAnimationFrame(() => {
      const currentTarget = e.target as HTMLDivElement
      const { scrollTop } = currentTarget
      const nextScrollPosition = Math.max(scrollTop / scrollSectionHeight, 0)

      // when touch events are active we don't have to use the timeout to detect "scroll end"
      if (isTouching.value) {
        scrollPosition.value = nextScrollPosition
        return
      }

      handleOverscroll(nextScrollPosition)
    })

  watch([scrollRef], (value, _oldValue, onCleanUp) => {
    const [scrollElement] = value
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScrollEvent)

      onCleanUp(() => {
        scrollElement.removeEventListener('scroll', handleScrollEvent)
      })
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
    isTouching,
    scrollToPosition,
    scrollSectionHeight
  }
}
