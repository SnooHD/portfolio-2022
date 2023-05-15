/**
 * This hook handles the current scroll position on the page
 */

export type ScrollSectionType = 'home' | 'about-me' | 'my-work' | 'contact'
export const sections: ScrollSectionType[] = ['home', 'about-me', 'my-work', 'contact']
export const scrollSectionHeight = 400

export const useScroller = () => {
  const scrollToScrollPosition = (top: number, behavior: 'auto' | 'smooth' = 'smooth') => {
    window.scroll({
      top: top * scrollSectionHeight,
      behavior
    })
  }

  const scrollToSection = (section: ScrollSectionType) => {
    if (!sections.includes(section)) return
    scrollToPosition.value = sections.indexOf(section)
  }

  const scrollPosition = useState<number>('scroll-position', () =>
    process.client ? Math.max(scrollY / scrollSectionHeight, 0) : 0
  )
  const lastScrollPosition = useState<number>('active-scroll-position', () => 0)
  const scrollDirection = useState<'down' | 'up'>('scroll-direction', () => 'down')

  const handleScrollEvent = () =>
    requestAnimationFrame(() => {
      // scrollOffset makes sure the first section directly starts scrolling
      scrollPosition.value = Math.max(scrollY / scrollSectionHeight, 0)
      scrollDirection.value = (lastScrollPosition.value as number) < window.scrollY ? 'down' : 'up'
      lastScrollPosition.value = window.scrollY
    })

  const scrollToPositionState = useState<number | null>('scroll-to-position', () => null)
  const scrollToPosition = computed<number | null>({
    set: (value) => {
      if (value === null) return
      // We subtract half the offset to make sure we end up in the middle of the section.
      scrollToPositionState.value = value
      scrollToScrollPosition(value === 0 ? 0 : value)
    },
    get: () => (scrollToPositionState.value === null ? null : scrollToPositionState.value)
  })

  // When we have a hash, we don't want to animate the text.
  // When we set the animateText to true, the page will render with the end state
  const { introTextDone } = useIntroTransition()
  watch(scrollPosition, (watchedScrollPosition) => {
    if (introTextDone.value) return

    if (watchedScrollPosition > 1) {
      introTextDone.value = true
    }
  })

  return {
    handleScrollEvent,
    scrollToSection,
    scrollPosition,
    scrollDirection,
    scrollToPosition,
    scrollToScrollPosition,
    scrollSectionHeight,
    lastScrollPosition
  }
}
