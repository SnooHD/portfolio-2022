<script lang="ts" setup>
import { WorkMenuItemProps } from '@/types/menu.types'

const menuItems: WorkMenuItemProps[] = [
  {
    to: '/work/stijlbreuk/custom-fotowand',
    image: '/images/stijlbreuk/custom-fotowand.png',
    title: 'Custom Fotowand',
    description: 'Wallpaper design tool'
  },
  {
    to: '/work/stijlbreuk/abel-co',
    image: '/images/stijlbreuk/abel-co.png',
    title: 'Abel & Co',
    description: 'Heath pomp check'
  }
]
</script>

<template>
  <WorkMenuItem :menu-items="menuItems" />
</template>
