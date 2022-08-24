/**
 * This hook is used to keep an active state for the "my work" carousel
 */

export type carouselItemType = 'basic-fit' | 'stijlbreuk' | 'freelance'
export const useWorkCarousel = () => {
  const workItems: carouselItemType[] = ['basic-fit', 'stijlbreuk', 'freelance']
  const state = useState('my-work-carousel-state', () => 0)

  return {
    state,
    workItems,
    activeItem: workItems[state.value]
  }
}
