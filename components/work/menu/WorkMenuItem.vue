<script setup lang="ts">
import { PropType } from 'vue'
import { WorkMenuItemProps } from '~/types/menu.types'
const { getImageFormat, getImageSrcSet, hasWebpSupport } = useImages()

defineProps({
  menuItems: {
    type: Object as PropType<WorkMenuItemProps[]>,
    required: true
  }
})
</script>

<template>
  <ul class="space-y-[20px] md:space-y-[30px] w-full px-[40px]">
    <li
      v-for="({ to, title, description, image }, index) in menuItems"
      :key="`work-menu-item-${index}-${to}`"
    >
      <NuxtLink :to="to">
        <div class="font-merriweather text-[18px] sm:text-[21px]">{{ title }}</div>
        <div v-if="description" class="font-palanquin font-light text-[18px] sm:text-[21px]">
          {{ description }}
        </div>
        <NuxtImg
          :src="getImageFormat(image)"
          :srcset="getImageSrcSet(image, 400)"
          preset="image"
          class="w-full max-w-[400px] mt-[10px]"
        />
      </NuxtLink>
    </li>
  </ul>
</template>
