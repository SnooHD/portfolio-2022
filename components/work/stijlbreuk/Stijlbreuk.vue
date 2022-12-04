<script lang="ts" setup>
defineProps({
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <WorkItem id="stijlbreuk" :index="index">
    <template #item>
      <div class="w-full">
        <LogoBasicFit class="w-[120px] h-[60px]" />
        <Text>
          For
          <NuxtLink href="#" target="_blank">Stijlbreuk</NuxtLink>
          , I am actively working on numerous online platforms to improve upon customer journeys.
        </Text>
      </div>
    </template>
    <template #background>
      <WorkItemBackground src="/images/stijlbreuk/stijlbreuk.png" />
    </template>
    <template #menu>
      <ul>
        <li>Hi there! Stijlbreuk</li>
      </ul>
    </template>
  </WorkItem>
</template>
