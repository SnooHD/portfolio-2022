<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})

const { scrollPosition } = useScroller()
</script>

<template>
  <div
    :class="`
      w-full h-full
      ${scrollPosition > 1.5 ? 'h-full' : ''}
    `"
  >
    <!--
      We are using shape-outside with the self portrait so the text wraps around the image,
      this css property only works with inline floated elements
      so we cant use flexbox here =/
    -->
    <IntroSelfPortrait />
    <Intro />
    <AboutMe />
    <Work />
    <Contact />
  </div>
</template>
