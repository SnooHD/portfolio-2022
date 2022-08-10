import { Ref } from '@vue/reactivity'

export type OnSwipeDirection = 'next' | 'previous'

export interface UseSwipeProps {
  element: Ref<HTMLElement>
  onSwipe: (direction?: OnSwipeDirection) => void
  direction: 'x' | 'y'
}
