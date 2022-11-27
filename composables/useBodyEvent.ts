/**
 * This hook allows us to easily use global body events
 */

export function useBodyEvent<T extends keyof HTMLBodyElementEventMap>(
  event: T,
  callback: (e: HTMLBodyElementEventMap[T]) => void
) {
  const addBodyEvent = () =>
    (document.querySelector('body') as HTMLBodyElement).addEventListener<T>(event, callback)

  const removeBodyEvent = () =>
    (document.querySelector('body') as HTMLBodyElement).removeEventListener<T>(event, callback)

  return {
    addBodyEvent,
    removeBodyEvent
  }
}
