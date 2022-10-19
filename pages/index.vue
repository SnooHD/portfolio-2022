<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="w-full h-full relative">
    <VisibilityWrapper id="intro" :hidden="2">
      <!--
        We are using shape-outside with the self portrait so the text wraps around the image,
        this css property only works with inline floated elements
        so we cant use flexbox here =/
      -->
      <IntroSelfPortrait />
      <Intro />
      <AboutMe />
    </VisibilityWrapper>
    <VisibilityWrapper id="work" :visible="2" :hidden="3">
      <Work />
    </VisibilityWrapper>
    <!-- <VisibilityWrapper :hidden="3"> -->
    <!-- <Contact /> -->
    <!-- </VisibilityWrapper> -->
  </div>
</template>
