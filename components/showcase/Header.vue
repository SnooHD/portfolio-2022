<script lang="ts" setup>
const { getTextClasses, getSpacing, getFontSize } = useShowcaseClasses()
</script>

<template>
  <header>
    <div
      :class="`
        relative z-[0] min-h-[150px] flex items-center
        ${getSpacing('px')}
        ${getSpacing('py')}
      `"
    >
      <div v-if="$slots.background" class="absolute top-0 left-0 w-full h-full z-[-1]">
        <slot name="background" />
      </div>
      <div class="flex justify-between w-full">
        <div
          :class="`
          space-y-[8px] lg:space-y-[20px] flex-grow
        `"
        >
          <h1
            v-if="$slots.title"
            :class="`
          uppercase text-white font-black
          ${getTextClasses('xl')}
        `"
          >
            <slot name="title" />
          </h1>
          <div
            v-if="$slots.role"
            :class="`
            ${getFontSize('sm')}
          `"
          >
            <slot name="role" />
          </div>
        </div>
        <div v-if="$slots.image">
          <slot name="image" />
        </div>
      </div>
    </div>
    <div v-if="$slots.bottom">
      <slot name="bottom" />
    </div>
  </header>
</template>
