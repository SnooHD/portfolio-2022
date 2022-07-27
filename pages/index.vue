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
  <div class="w-full max-h-full h-full">
    <IntroSelfPortrait />
    <IntroText />
    <IntroSocialMedia />
    <AboutMe />
    <MyWork />
  </div>
</template>
