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
    class="group font-medium text-[18px] lg:text-[21px] font-public-sans text-blue-light translate-y-[-2px]"
  >
    <span
      :class="`
        inline-block relative
        before:absolute before:w-full before:h-[2px] before:left-0 before:bottom-[0px] before:scale-x-[0]
        before:transition-transform before:duration-300 before:bg-blue-light before:origin-left group-hover:before:scale-x-[1]
      `"
    >
      <slot />
    </span>
    <Icon
      icon="ArrowBottomRight"
      :class="`
        scale-[.6] translate-y-[22%] translate-x-[7px] transition-transform duration-300
        group-hover:translate-y-[60%] group-hover:translate-x-[12px] group-hover:scale-[.7]
      `"
    />
  </a>
</template>
