export const useTransitionDone = () => {
  const introTextDone = useState('intro-text-transition-done', () => false)

  const fadeInClasses = useState(
    'fade-in-classes',
    () => 'transition-[opacity,_transform] duration-400 opacity-0 translate-y-[15px]'
  )

  watch(introTextDone, (introTextDoneValue) => {
    if (introTextDoneValue) {
      fadeInClasses.value = 'transition-[opacity,_transform] duration-400 opacity-1 translate-y-[0]'
    }
  })

  return {
    introTextDone,
    fadeInClasses
  }
}
