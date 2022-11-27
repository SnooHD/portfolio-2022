/**
 * This hook allows us to easily set up a global window event without writing the same logic everywhere
 */

export function useWindowEvent<T extends keyof WindowEventMap>(
  event: T,
  callback: (e: WindowEventMap[T]) => void
) {
  const addWindowEvent = () => {
    window.addEventListener<T>(event, (e) => requestAnimationFrame(() => callback(e)))
  }

  const removeWindowEvent = () => {
    window.removeEventListener<T>(event, (e) => requestAnimationFrame(() => callback(e)))
  }

  onMounted(() => {
    addWindowEvent()
  })

  onUnmounted(() => {
    removeWindowEvent()
  })
}
