export default defineNuxtPlugin(() => {
  ;(() => {
    const createEvent = (e: Event, name: string) => {
      const customEvent = new Event(name)
      e.target.dispatchEvent(customEvent)
    }

    let noMove = true
    let startPoints = {
      x: 0,
      y: 0
    }
    let endPoints = {
      x: 0,
      y: 0
    }

    const touch = {
      touchstart: (e: TouchEvent) => {
        startPoints = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      },
      touchmove: (e: TouchEvent) => {
        noMove = false
        endPoints = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      },
      touchend: (e: TouchEvent) => {
        if (noMove) {
          createEvent(e, 'tab')
        } else {
          const moveX = endPoints.x - startPoints.x
          const absX = Math.abs(moveX)
          const moveY = endPoints.y - startPoints.y
          const absY = Math.abs(moveY)

          if (Math.max(absX, absY) > 100) {
            const event =
              absX > absY
                ? moveX < 0
                  ? 'swipeLeft'
                  : 'swipeRight'
                : moveY < 0
                ? 'swipeUp'
                : 'swipeDown'

            createEvent(e, event)
          } else if (Math.max(absX, absY) < 10) {
            createEvent(e, 'tab')
          }
        }
        noMove = true
      },
      touchcancel: () => {
        noMove = false
      }
    }

    Object.entries(touch).forEach(([key, value]) => {
      document.addEventListener(key, value, false)
    })
  })()
})
