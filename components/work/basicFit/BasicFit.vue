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
        <LogoBasicFit class="w-[140px] h-[60px] text-white" />
        <Text class="mt-[15px]">
          <span>{{ 'For ' }}</span>
          <NuxtLink href="https://basic-fit.com/" target="_blank" class="text-blue-light underline">
            {{ 'Basic-Fit' }}
          </NuxtLink>
          <span>
            {{
              ', I am actively working on numerous online platforms to improve upon customer journeys.'
            }}
          </span>
        </Text>
      </div>
    </template>
    <template #background>
      <WorkItemBackground src="/images/basic-fit/work-at-basic-fit.png" />
    </template>
  </WorkItem>
</template>
