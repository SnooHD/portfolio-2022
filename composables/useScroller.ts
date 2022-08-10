export const useScroller = () => {
  const scrollSectionHeight = 200
  const scrollRef = ref<HTMLDivElement>()

  const scrollToScrollPosition = (top: number) => {
    scrollRef.value.scroll({
      top: top * scrollSectionHeight,
      behavior: 'smooth'
    })
  }

  const scrollPosition = useState('scroll-position', () => 0)
  const onSwipe = () => {
    scrollToScrollPosition(Math.round(scrollPosition.value))
  }

  const { isTouching } = useSwipe({
    element: scrollRef,
    direction: 'y',
    onSwipe
  })

  const scrollTimeout = useState('scroll-timeout', () => 0)
  const handleScrollEvent = (e: WheelEvent) =>
    requestAnimationFrame(() => {
      const currentTarget = e.target as HTMLDivElement
      const { scrollTop } = currentTarget
      scrollPosition.value = scrollTop / scrollSectionHeight

      // when touch events are active we don't have to use the timeout to detect "scroll end"
      if (isTouching.value) {
        return
      }

      // scroll to next section after we didn't scroll for 400ms
      window.clearTimeout(scrollTimeout.value)
      scrollTimeout.value = window.setTimeout(() => {
        if (scrollPosition.value === Math.round(scrollPosition.value)) {
          return
        }

        scrollToScrollPosition(Math.round(scrollPosition.value))
      }, 400)
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
