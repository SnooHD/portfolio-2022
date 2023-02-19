<script lang="ts" setup>
onMounted(() => {
  /**
   * Jump back to previous scroll position on page refresh
   * This mimics default browser behavior
   */
  // Set scrollTop to sessionStorage on unload.
  // window.addEventListener("beforeunload", () => {
  //   const scrollTop = this.$refs.scroller.scrollTop;
  //   sessionStorage.setItem("scrollTop", scrollTop);
  // });
  // window.addEventListener("hashchange", this.scrollIntoView);
  // // If hash exists, jump to hash
  // if (location.hash) {
  //   this.scrollIntoView();
  //   return;
  // }
  // // Use scrollTop from sessionStorage to jump back to previous scroll position
  // const scrollTop = sessionStorage.getItem("scrollTop");
  // if (scrollTop) {
  //   (this.$refs.scroller as HTMLDivElement).scrollTo({
  //     top: parseFloat(scrollTop),
  //     behavior: "auto",
  //   });
  // }
})
</script>

<template>
  <div class="w-full h-full">
    <div
      :class="`
          fixed z-[-1] left-0 top-0 h-full w-full bg-anthracite
        `"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- <div
      id="layout-animation-overlay"
      :class="`
          fixed z-99 left-0 top-0 h-full w-full bg-anthracite opacity-0 transition-opacity duration-400
          pointer-events-none
        `"
    /> -->
  </div>
</template>

<style>
/* .layout-enter-from + #layout-animation-overlay,
.layout-leave-to + #layout-animation-overlay {
  --tw-scale-y: 1;
}

.layout-leave-from + #layout-animation-overlay,
.layout-enter-to + #layout-animation-overlay {
  --tw-scale-y: 0;
}

.layout-enter-active + #layout-animation-overlay,
.layout-leave-active + #layout-animation-overlay {
  transition: transform 400ms;
}

.layout-enter-active + #layout-animation-overlay {
  transform-origin: bottom;
}

.layout-leave-active + #layout-animation-overlay {
  transform-origin: top;
} */

.layout-leave-active,
.layout-enter-active {
  transition: opacity 400ms;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
