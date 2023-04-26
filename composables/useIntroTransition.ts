export const useIntroTransition = () => {
  const introTextDone = useState('intro-text-transition-done', () => false)

  const fadeInClasses = useState(
    'fade-in-classes',
    (): string => 'transition-[opacity,_transform] duration-300 opacity-0 translate-y-[15px]'
  )

  watch(introTextDone, (introTextDoneValue) => {
    if (introTextDoneValue) {
      fadeInClasses.value =
        'transition-[opacity,_transform] duration-300 opacity-100 translate-y-[0]'
    }
  })

  return {
    introTextDone,
    fadeInClasses
  }
}
