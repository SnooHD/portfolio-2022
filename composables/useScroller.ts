export const useScroller = () => {
  const scrollSectionHeight = 400
  const scrollRef = ref<HTMLDivElement>()

  const scrollPosition = useState('scroll-position', () => 0)
  const handleScrollEvent = (e: WheelEvent) =>
    requestAnimationFrame(() => {
      const currentTarget = e.target as HTMLDivElement
      const { scrollTop } = currentTarget
      scrollPosition.value = scrollTop / scrollSectionHeight
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
      scrollRef.value.scroll({
        top: scrollToPositionValue * scrollSectionHeight,
        behavior: 'smooth'
      })
    }
  })

  return {
    scrollRef,
    scrollPosition,
    scrollToPosition,
    scrollSectionHeight
  }
}
