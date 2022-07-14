export const useWindowEvent = (callback: (e?: PointerEvent) => void, event: Event['type']) => {
  const addWindowEvent = () => {
    window.addEventListener(event, callback)
  }

  const removeWindowEvent = () => {
    window.removeEventListener(event, callback)
  }

  return {
    addWindowEvent,
    removeWindowEvent
  }
}
