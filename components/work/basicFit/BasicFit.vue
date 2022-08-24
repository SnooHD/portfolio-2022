<script lang="ts" setup>
defineProps({
  index: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <WorkItem id="basic-fit" :index="index">
    <template #item>
      <div class="w-full">
        <LogoBasicFit class="w-[120px] h-[60px]" />
        <Text>
          For
          <a href="#" target="_blank">Basic-Fit</a>
          , I am actively working on numerous online platforms to improve upon customer journeys.
        </Text>
      </div>
    </template>
    <template #background>
      <WorkItemBackground class="bg-basic-fit" />
    </template>
  </WorkItem>
</template>
