<script lang="ts" setup>
const lastSection = computed<boolean>(() => {
  return false
})

const moveToSection = () => {
  console.log('move')
}
</script>

<template>
  <footer class="flex w-full flex-col py-[15px] justify-between">
    <div class="flex items-center justify-between">
      <Link href="#next">Contact me</Link>
      <Button>View my work</Button>
    </div>
    <div class="flex justify-center font-palanquin font-light text-gray text-[14px]">
      <span onclick="moveToSection">scroll {{ lastSection ? 'up' : 'down' }}</span>
    </div>
  </footer>
</template>
