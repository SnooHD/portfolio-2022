/**
 * This hook allows us to easily use global body events
 */

export const useBodyEvent = (event: Event['type'], callback: (e?: Event) => void) => {
  const addBodyEvent = () => {
    ;(document.querySelector('body') as HTMLBodyElement).addEventListener(event, callback)
  }

  const removeBodyEvent = () => {
    ;(document.querySelector('body') as HTMLBodyElement).removeEventListener(event, callback)
  }

  return {
    addBodyEvent,
    removeBodyEvent
  }
}
