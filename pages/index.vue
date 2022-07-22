<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <!--
      We are using shape-outside with the self portrait so the text wraps around the image,
      this css property only works with inline floated elements
      so we cant use flexbox here =/
    -->
  <div class="w-full sm:px-[10%]">
    <IntroSelfPortrait />
    <IntroText class="pt-[120px]" />
    <IntroSocialMedia class="pt-[150px]" />
    <AboutMe />
  </div>
</template>
