<template>
  <div class="relative w-full">
    <div
      :class="`
        relative
        left-[-3.75px] xs:left-[-6.25px] sm:left-[-7.5px] md:left-[-11.25px] lg:left-[-15px]
        w-[calc(100%+7.5px)] xs:w-[calc(100%+12.5px)] sm:w-[calc(100%+15px)] md:w-[calc(100%+22.5px)] lg:w-[calc(100%+30px)]
      `"
    >
      <slot />
    </div>
  </div>
</template>
