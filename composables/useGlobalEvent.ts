/**
 * This hook allows us to easily use events
 */

export function useDocumentEvent<T extends keyof DocumentEventMap>(
  event: T,
  callback: (e: DocumentEventMap[T]) => void
) {
  onMounted(() => {
    document.addEventListener<T>(event, (e) => callback(e))
  })

  onUnmounted(() => {
    document.removeEventListener<T>(event, (e) => callback(e))
  })
}

export function useWindowEvent<T extends keyof WindowEventMap>(
  event: T,
  callback: (e: WindowEventMap[T]) => void
) {
  onMounted(() => {
    window.addEventListener<T>(event, (e) => callback(e))
  })

  onUnmounted(() => {
    window.removeEventListener<T>(event, (e) => callback(e))
  })
}
