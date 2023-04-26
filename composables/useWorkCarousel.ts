/**
 * This hook is used to keep an active state for the "my work" carousel
 */

export type carouselItemType = 'basic-fit' | 'stijlbreuk' | 'freelance'
export const useWorkCarousel = () => {
  const workItems: carouselItemType[] = ['basic-fit', 'stijlbreuk', 'freelance']
  const state = useState('my-work-carousel-state', () => 0)

  const { queryParam, hashValue } = useHash()

  const initializeCarouselMenuState = () => {
    if (!hashValue.value || hashValue.value !== '#my-work') return
    if (!queryParam.value?.company) return false

    const companyIndex = workItems.indexOf(queryParam.value.company)
    if (companyIndex === -1) return false

    state.value = companyIndex
    return queryParam.value.menu
  }

  const defaultCarouselMenuState = useState('default-carousel-menu-state', () =>
    initializeCarouselMenuState()
  )

  return {
    state,
    workItems,
    defaultCarouselMenuState,
    activeItem: workItems[state.value]
  }
}
