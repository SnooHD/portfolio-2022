export const useBodyEvent = (event: Event['type'], callback: (e?: Event) => void) => {
  const addBodyEvent = () => {
    document.querySelector('body').addEventListener(event, callback)
  }

  const removeBodyEvent = () => {
    document.querySelector('body').removeEventListener(event, callback)
  }

  return {
    addBodyEvent,
    removeBodyEvent
  }
}
