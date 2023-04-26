/**
 * This hook is used to create a global state between the different menu's in the UI
 * It allows us to keep a state between different components
 */

export type MenuOverlayTypes = 'main-menu' | 'work-item'
type MenuStateType = Record<MenuOverlayTypes, boolean>
export const useMenuOverlay = (menu: MenuOverlayTypes) => {
  const menuStates = useState<Partial<MenuStateType>>('menu-states', () => ({}))

  const menuState = computed({
    get: () => menuStates.value[menu],
    set: (value) => {
      const allStatesToFalse = Object.keys(menuStates.value).reduce(
        (previous, current) => ({ ...previous, [current]: false }),
        {}
      ) as MenuStateType

      menuStates.value = {
        ...allStatesToFalse,
        [menu]: menu === 'main-menu' && activeState.value ? false : value
      }
    }
  })

  menuStates.value = {
    ...menuStates.value,
    [menu]: menuState.value
  }

  const activeState = computed(() => {
    const activeMenuState = Object.entries(menuStates.value).find(([_key, value]) => value)
    return activeMenuState ? (activeMenuState[0] as MenuOverlayTypes) : null
  })

  return {
    menuState,
    activeState
  }
}
