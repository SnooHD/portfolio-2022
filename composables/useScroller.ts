import { menuItems } from '~/composables/useMenu'

export const useScroller = () => {
  const scrollSectionHeight = 400
  const scrollContainerRef = ref<HTMLDivElement>()
  const scrollRef = ref<HTMLDivElement>()

  const scrollPosition = useState('scroll-position', () => 0)
  const handleScrollEvent = (e: WheelEvent) =>
    requestAnimationFrame(() => {
      const currentTarget = e.target as HTMLDivElement
      const { scrollTop } = currentTarget
      scrollPosition.value = scrollTop / scrollSectionHeight
    })

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
    scrollContainerRef,
    scrollPosition,
    scrollToPosition
  }
}
