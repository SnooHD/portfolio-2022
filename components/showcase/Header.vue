<template>
  <div class="relative p-[15px] xs:p-[30px] sm:p-[60px] md:p-[90px] lg:p-[120px] z-[0]">
    <div class="absolute top-0 left-0 w-full h-full z-[-1]">
      <slot name="background" />
    </div>
    <div class="flex justify-between w-full">
      <div class="space-y-[8px] lg:space-y-[20px] w-3/5">
        <slot name="title" />
        <div>
          <slot name="role" />
        </div>
      </div>
      <div class="w-2/5">
        <slot name="image" />
      </div>
    </div>
  </div>
</template>
