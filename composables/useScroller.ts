export const useScroller = () => {
  const { menuItems } = useMenu()

  const scrollSectionHeight = 400
  const scrollContainerRef = ref<HTMLDivElement>()
  const scrollRef = ref<HTMLDivElement>()

  const scrollPosition = useState('scrollSection', () => 0)
  const handleScrollEvent = (e: WheelEvent) => {
    const currentTarget = e.target as HTMLDivElement
    const { scrollTop } = currentTarget
    scrollPosition.value = scrollTop / scrollSectionHeight
  }

  watch([scrollRef, scrollContainerRef], (value, _oldValue, onCleanUp) => {
    const [scrollElement, scrollContainerElement] = value
    if (scrollElement && scrollContainerElement) {
      const { height: scrollHeight } = scrollContainerElement.getBoundingClientRect()
      const scrollContainerHeight = scrollHeight + menuItems.length * scrollSectionHeight
      scrollContainerElement.style.height = `${scrollContainerHeight}px`

      scrollElement.addEventListener('scroll', handleScrollEvent)
      onCleanUp(() => {
        scrollElement.removeEventListener('scroll', handleScrollEvent)
      })
    }
  })

  return {
    scrollRef,
    scrollContainerRef,
    scrollPosition
  }
}
