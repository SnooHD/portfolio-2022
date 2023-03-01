<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<template>
  <NuxtImg
    aria-hidden="true"
    preset="image"
    :class="`
      w-full sm:w-[140%] h-full max-w-[1024px] min-h-[380px] min-w-[600px] xs:translate-x-[50%]
      object-contain absolute right-[-60px] xs:right-[50%] opacity-75
    `"
    :style="{
      maskImage: `linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)`
    }"
    :src="src"
    sizes="sm:600 lg:1024"
  />
</template>
