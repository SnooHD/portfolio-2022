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
      <div class="flex justify-center">
        <div class="w-full md:w-2/3 space-y-[15px]">
          <NuxtImg class="w-1/2 xs:w-1/3" src="/images/basic-fit/logo.svg" preset="svg" />
          <Text class="shadow-white/60 text-shadow-[sm]">
            As a developer for Basic-Fit, I get to work on various products and create innovative
            solutions to improve user experiences. This includes developing for multiple platforms
            such as web and kiosk applications.
          </Text>
        </div>
      </div>
    </template>
    <template #background>
      <WorkItemBackground src="/images/basic-fit/work-at-basic-fit.png" />
    </template>
  </WorkItem>
</template>
