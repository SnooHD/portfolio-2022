export const useWindowEvent = (callback: (e?: PointerEvent) => void, event: Event['type']) => {
  const addWindowEvent = () => {
    window.addEventListener(event, () => requestAnimationFrame(() => callback()))
  }

  const removeWindowEvent = () => {
    window.removeEventListener(event, () => requestAnimationFrame(() => callback()))
  }

  onMounted(() => {
    addWindowEvent()
  })

  onUnmounted(() => {
    removeWindowEvent()
  })
}
