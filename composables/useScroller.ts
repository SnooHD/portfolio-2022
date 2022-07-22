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

  const scrollContainerHeight = useState<number>('scroll-container-height', () => null)
  const scrollChildHeight = useState<number>('scroll-child-height', () => null)
  watch([scrollRef, scrollContainerRef], (value, _oldValue, onCleanUp) => {
    const [scrollElement, scrollContainerElement] = value
    if (scrollElement && scrollContainerElement) {
      const { height: scrollHeight } = scrollContainerElement.getBoundingClientRect()
      const calculatedScrollContainerHeight = scrollHeight + menuItems.length * scrollSectionHeight
      scrollContainerHeight.value = calculatedScrollContainerHeight

      // set the original container height to the child, this way we know it will always fill
      // the complete screen correctly (also on mobile browsers with menu bars)
      scrollChildHeight.value = scrollHeight

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
    scrollToPosition,
    scrollChildHeight,
    scrollContainerHeight
  }
}
