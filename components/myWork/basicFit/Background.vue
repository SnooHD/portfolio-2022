<template>
  <div class="absolute left-0 top-0 w-full h-full z-[-1]">
    <picture>
      <source srcset="/assets/images/basic-fit/work-at-basic-fit.webp" type="image/webp" />
      <img
        class="w-full sm:w-[140%] h-full max-w-[1366px] min-w-[600px] xs:translate-x-[50%] object-contain absolute right-[-60px] xs:right-[50%]"
        src="/assets/images/basic-fit/work-at-basic-fit.png"
        :style="{
          maskImage: `linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)`
        }"
      />
    </picture>
  </div>
</template>
