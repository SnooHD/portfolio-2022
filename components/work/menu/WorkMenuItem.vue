<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: false,
    default: null
  },
  image: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li>
    <NuxtLink :to="to">
      <span>{{ title }}</span>
      <span v-if="intro">{{ intro }}</span>
      <img :src="image" />
    </NuxtLink>
  </li>
</template>
