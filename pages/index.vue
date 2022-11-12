<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})

const { currentMenuIndex } = useMenu()
</script>

<template>
  <div class="w-full h-full relative z-[1]">
    <VisibilityWrapper id="intro" :hidden="2" :class="currentMenuIndex < 2 ? 'z-[1]' : 'z-[0]'">
      <!--
        We are using shape-outside with the self portrait so the text wraps around the image,
        this css property only works with inline floated elements
        so we cant use flexbox here =/
      -->
      <IntroSelfPortrait />
      <Intro />
      <AboutMe />
    </VisibilityWrapper>
    <VisibilityWrapper
      id="work"
      :visible="2"
      :hidden="3"
      :class="currentMenuIndex === 2 ? 'z-[1]' : 'z-[0]'"
    >
      <Work />
    </VisibilityWrapper>
    <!-- <VisibilityWrapper :hidden="3" :class="currentMenuIndex === 3 ? 'z-[1]' : 'z-[0]'"> -->
    <!-- <Contact /> -->
    <!-- </VisibilityWrapper> -->
  </div>
</template>
