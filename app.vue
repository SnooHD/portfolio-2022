<script lang="ts">
export default {
  mounted() {
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
  }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
