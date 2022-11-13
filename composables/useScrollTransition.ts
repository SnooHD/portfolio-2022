export interface UseScrollTransitionsProps {
  visible: number
  hidden?: number
  transitionDelay?: string
  transitionClasses?: string
  transitionIn?: string
  transitionOut?: string
  id: string
}

export const useScrollTransition = ({
  visible,
  hidden,
  id,
  transitionDelay = 'delay-[200ms]',
  transitionClasses = 'transition-opacity duration-[400ms]',
  transitionIn = 'opacity-[1]',
  transitionOut = 'opacity-[0]'
}: UseScrollTransitionsProps) => {
  const { scrollPosition, scrollDirection } = useScroller()
  const transitionState = useState(`scroll-transition-state-${id}`, () => '')

  watch(
    scrollPosition,
    (scrollPositionValue) => {
      const delayClass = scrollDirection.value === 'down' ? transitionDelay : ''
      if (
        (!hidden && scrollPositionValue >= visible) ||
        (hidden && scrollPositionValue >= visible && scrollPositionValue <= hidden)
      ) {
        transitionState.value = `${transitionClasses} ${delayClass} ${transitionIn}`
        return
      }

      transitionState.value = `${transitionClasses} ${delayClass} ${transitionOut}`
    },
    {
      immediate: true
    }
  )

  return {
    transitionState
  }
}
