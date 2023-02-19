<script setup lang="ts">
import { PropType } from 'vue'
import { WorkMenuItemProps } from '~/types/menu.types'
const { getImageSrcSet } = useImages()

defineProps({
  menuItems: {
    type: Object as PropType<WorkMenuItemProps[]>,
    required: true
  }
})
</script>

<template>
  <ul class="space-y-[20px] md:space-y-[30px] w-full md:px-[40px]">
    <li
      v-for="({ to, title, description, image }, index) in menuItems"
      :key="`work-menu-item-${index}-${to}`"
    >
      <NuxtLink :to="to" class="group">
        <div class="font-atyp-text font-bold text-[18px] sm:text-[21px]">{{ title }}</div>
        <div v-if="description" class="font-public-sans font-light text-[16px] sm:text-[18px]">
          {{ description }}
        </div>
        <NuxtPicture
          :src="image"
          :srcset="getImageSrcSet(image, [{ width: 400 }])"
          preset="image"
          :img-attrs="{
            class:
              'w-full max-w-[400px] mt-[10px] transition-[filter,_transform] duration-400 group-hover:scale-[1.02] group-hover:drop-shadow-[0_5px_15px_rgba(255,255,255,.15)]'
          }"
        />
      </NuxtLink>
    </li>
  </ul>
</template>
