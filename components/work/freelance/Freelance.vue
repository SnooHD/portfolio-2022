<script lang="ts" setup>
defineProps({
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <WorkItem id="freelance" :index="index">
    <template #item>
      <div class="w-full">
        <LogoBasicFit class="w-[120px] h-[60px]" />
        <Text>
          For
          <a href="#" target="_blank">Freelance</a>
          , I am actively working on numerous online platforms to improve upon customer journeys.
        </Text>
      </div>
    </template>
    <template #background>
      <WorkItemBackground class="bg-freelance" />
    </template>
    <template #menu>
      <ul>
        <li>Hi there! Freelance</li>
      </ul>
    </template>
  </WorkItem>
</template>
