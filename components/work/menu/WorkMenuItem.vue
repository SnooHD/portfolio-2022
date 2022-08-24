<template>
  <li>
    <NuxtLink :to="to">
      <span>{{ title }}</span>
      <span v-if="intro">{{ intro }}</span>
      <NuxtImage></NuxtImage>
    </NuxtLink>
  </li>
</template>
