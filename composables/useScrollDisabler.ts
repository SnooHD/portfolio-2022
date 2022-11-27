export const useScrollDisabler = () => {
  const stopScrollEvent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const stopKeyboardScroll = (e: KeyboardEvent) => {
    const keys = [32, 33, 34, 35, 37, 38, 39, 40]
    if (keys.includes(e.keyCode)) {
      e.preventDefault()
      return false
    }
  }

  const disableScroll = (element: HTMLElement, enable: boolean) => {
    if (enable) {
      element.addEventListener('wheel', stopScrollEvent, false)
      element.addEventListener('touchmove', stopScrollEvent, false)
      document.addEventListener('keydown', stopScrollEvent, false)
      return
    }

    element.removeEventListener('wheel', stopScrollEvent, false)
    element.removeEventListener('touchmove', stopScrollEvent, false)
    document.removeEventListener('keydown', stopKeyboardScroll, false)
  }

  return {
    disableScroll
  }
}
