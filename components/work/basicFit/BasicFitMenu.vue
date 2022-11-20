<script lang="ts" setup>
import { WorkMenuItemProps } from '~/types/menu.types'

const menuItems: WorkMenuItemProps[] = [
  {
    to: '/work/basic-fit/kiosk',
    image: '/images/basic-fit/kiosk.png',
    title: 'Kiosk',
    description: 'Member self service hub'
  },
  {
    to: '/work/basic-fit/my-basic-fit',
    image: '/images/basic-fit/MBF.png',
    title: 'My Basic-Fit',
    description: 'Member dashboard'
  }
]
</script>

<template>
  <WorkMenuItem :menu-items="menuItems" />
</template>
