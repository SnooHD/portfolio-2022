<template>
  <button
    :class="`
      font-medium text-[16px] lg:text-[18px] font-public-sans bg-blue-dark text-white px-[16px] py-[6px] rounded-[4px]
      hover:bg-blue duration-300 transition-colors
    `"
  >
    <span class="inline-block w-full h-full">
      <slot />
    </span>
  </button>
</template>
