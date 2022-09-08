<script lang="ts" setup>
import { WorkMenuItemProps } from '~/types/menu.types'

const menuItems: WorkMenuItemProps[] = [
  {
    to: '/kiosk',
    image: '/images/basic-fit/kiosk.png',
    title: 'Kiosk',
    description: 'Member self service hub'
  },
  {
    to: '/my-basic-fit',
    image: '/images/basic-fit/MBF.png',
    title: 'My Basic-Fit',
    description: 'Member dashboard'
  }
]
</script>

<template>
  <WorkMenuItem :menu-items="menuItems" />
</template>
