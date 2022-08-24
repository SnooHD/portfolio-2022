<script lang="ts" setup>
const { state } = useWorkCarousel()

defineProps({
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="h-full w-full shrink-0">
    <div
      :class="`
        h-full w-full relative
      `"
      :style="{
        transform: `translateX(-${index * 100}%)`
      }"
    >
      <div
        :class="`
          w-full h-full duration-300 transition-[opacity]
          ${state === index ? 'opacity-100' : 'opacity-0'}
        `"
      >
        <div class="flex w-full h-full items-center">
          <slot name="item" />
        </div>
        <div
          :class="`
            duration-300 transition-[transform] absolute left-0 top-0 w-full h-full z-[-1]
            ${index < state ? 'translate-x-[-100%]' : ''}
            ${index > state ? 'translate-x-[100%]' : ''}
            ${index === state ? 'translate-x-[0%]' : ''}
          `"
        >
          <slot name="background" />
        </div>
      </div>
    </div>
  </div>
</template>
