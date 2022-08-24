/**
 * This hook allows us to easily set up a global window event without writing the same logic everywhere
 */

export const useWindowEvent = (event: Event['type'], callback: (e?: PointerEvent) => void) => {
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
