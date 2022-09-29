<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    required: true
  }
})
</script>

<template>
  <a
    :href="href"
    class="group font-medium text-[18px] font-public-sans text-blue-light translate-y-[-2px]"
  >
    <span
      :class="`
        inline-block relative
        before:absolute before:w-full before:h-[2px] before:left-0 before:bottom-[0px] before:scale-x-[0]
        before:transition-transform before:duration-400 before:bg-blue-light before:origin-left group-hover:before:scale-x-[1]
      `"
    >
      <slot />
    </span>
    <Icon
      icon="ArrowBottomRight"
      :class="`
        text-[14px] scale-[.9] translate-y-[2px] translate-x-[7px] transition-transform duration-400
        group-hover:translate-y-[7px] group-hover:translate-x-[10px] group-hover:scale-[1]
      `"
    />
  </a>
</template>
