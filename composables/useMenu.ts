import { useState } from 'nuxt/app'

export const useMenu = () => {
  const menuItems = ['home', 'about me', 'my work', 'contact']

  const activeMenuIndex = useState<number>('activeMenuIndex', () => 0)

  return {
    menuItems,
    activeMenuIndex
  }
}
