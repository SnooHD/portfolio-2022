<template>
  <div
    :class="`
      mx-[7.5px] xs:mx-[15px] sm:mx-[30px] md:mx-[45px] lg:mx-[60px]
      p-[7.5px] xs:p-[15px] sm:p-[30px] md:p-[45px] lg:p-[60px]
      border-[2px] text-white
    `"
  >
    <slot />
  </div>
</template>
