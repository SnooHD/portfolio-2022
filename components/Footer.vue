<script lang="ts" setup>
const lastSection = computed<boolean>(() => {
  return false
})

const moveToSection = () => {
  console.log('move')
}
</script>

<template>
  <footer class="flex w-full flex-col py-[15px] space-y-[30px]">
    <div class="flex items-center justify-between">
      <slot name="link" />
      <slot name="button" />
    </div>
    <div class="flex justify-center font-palanquin font-light text-gray text-[14px]">
      <span onclick="moveToSection">scroll {{ lastSection ? 'up' : 'down' }}</span>
    </div>
  </footer>
</template>
