/**
 * This hook handles touch events and detects when a user swipes
 */

import { UseSwipeProps } from '~/types/swipe.types'

export const useSwipe = ({ element, onSwipe, direction }: UseSwipeProps) => {
  const touchStartX = useState<number>('touch-start-x', () => null)
  const touchStartY = useState<number>('touch-start-y', () => null)

  const handleTouchStartEvent = (e: TouchEvent) =>
    requestAnimationFrame(() => {
      if (direction === 'y') {
        touchStartY.value = e.touches[0].clientY
        return
      }

      touchStartX.value = e.touches[0].clientX
    })

  const touchEndX = useState<number>('touch-end-x', () => null)
  const touchEndY = useState<number>('touch-end-y', () => null)
  const handleTouchMoveEvent = (e: TouchEvent) =>
    requestAnimationFrame(() => {
      if (direction === 'y') {
        touchEndY.value = e.targetTouches[0].pageY
        return
      }

      touchEndX.value = e.targetTouches[0].pageX
    })

  const handleTouchEndEvent = () =>
    requestAnimationFrame(() => {
      const moved =
        direction === 'y'
          ? touchEndY.value - touchStartY.value
          : touchEndX.value - touchStartX.value

      if (Math.abs(moved) > 100) {
        if (moved > 0) {
          onSwipe('previous')
        } else {
          onSwipe('next')
        }
      } else {
        onSwipe(null)
      }

      touchStartX.value = null
      touchStartY.value = null
    })

  /**
   * We are using scroll and touch events, on touch events I want to use the touchend to detect when to scroll to the next section
   * However, this does not play well with v-if; Touch events always starts on the current touched element, when this element disappears the
   * touchend will never trigger. To deal with this I am combining v-if and v-show inside the VisibilityWrapper component.
   */
  watch(element, (value, _oldValue, onCleanUp) => {
    const swipeElement = value
    if (swipeElement) {
      swipeElement.addEventListener('touchstart', handleTouchStartEvent)
      swipeElement.addEventListener('touchmove', handleTouchMoveEvent)
      swipeElement.addEventListener('touchend', handleTouchEndEvent)

      onCleanUp(() => {
        swipeElement.removeEventListener('touchstart', handleTouchStartEvent)
        swipeElement.removeEventListener('touchmove', handleTouchMoveEvent)
        swipeElement.removeEventListener('touchend', handleTouchEndEvent)
      })
    }
  })

  return {
    isTouching: direction === 'y' ? touchStartY : touchStartX
  }
}
