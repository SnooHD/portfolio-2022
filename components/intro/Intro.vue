<script lang="ts" setup>
const { fadeInClasses } = useTransitionDone()
</script>

<template>
  <div class="flex flex-col justify-evenly h-full absolute w-full h-full top-0 left-0">
    <IntroText />
    <IntroSocialMedia :class="fadeInClasses" />
  </div>
</template>
