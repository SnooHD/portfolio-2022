interface AnimationConfigProps {
  property: string
  fromValue: number
  toValue: number
  scrollStart: number
  scrollEnd: number
}

type AnimationStateType = Record<string, number>

export const useAnimationScroller = (animationConfig: AnimationConfigProps[]) => {
  const { scrollPosition } = useScroller()

  const animationState = reactive<AnimationStateType>(
    animationConfig.reduce(
      (previous, { fromValue, property }) => ({
        ...previous,
        [property]: fromValue
      }),
      {}
    ) as AnimationStateType
  )

  watch(scrollPosition, (currentScrollPosition) =>
    requestAnimationFrame(() => {
      animationConfig.forEach(({ property, toValue, fromValue, scrollEnd, scrollStart }) => {
        if (currentScrollPosition <= scrollStart) {
          animationState[property] = fromValue
          return
        }

        if (currentScrollPosition >= scrollEnd) {
          animationState[property] = toValue
          return
        }

        const scrollDistance = scrollEnd - scrollStart
        const scrollRatio = (currentScrollPosition - scrollStart) / scrollDistance

        const animationDistance = toValue - fromValue
        animationState[property] = fromValue + animationDistance * scrollRatio
      })
    })
  )

  return {
    animationState
  }
}