<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})

const { scrollPosition } = useScroller()
</script>

<template>
  <!--
      We are using shape-outside with the self portrait so the text wraps around the image,
      this css property only works with inline floated elements
      so we cant use flexbox here =/
    -->
  <div
    :class="`
      w-full h-full
      ${scrollPosition > 1.5 ? 'h-full' : ''}
    `"
  >
    <IntroSelfPortrait />
    <Intro />
    <AboutMe />
    <Work />
    <Contact />
  </div>
</template>
