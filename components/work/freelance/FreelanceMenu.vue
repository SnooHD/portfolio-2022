<script lang="ts" setup>
import { WorkMenuItemProps } from '@/types/menu.types'

const menuItems: WorkMenuItemProps[] = [
  {
    to: '/work/freelance/nativeway',
    image: '/images/freelance/nativeway.png',
    title: 'Nativeway',
    description: 'Learn English natively'
  },
  {
    to: '/work/freelance/logopicker',
    image: '/images/freelance/logopicker.png',
    title: 'Logopicker',
    description: 'Logo design tool'
  }
]
</script>

<template>
  <WorkMenuItem :menu-items="menuItems" />
</template>
