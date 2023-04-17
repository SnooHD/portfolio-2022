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
        <Text>
          As a developer for
          <NuxtLink href="https://www.basic-fit.com" target="_blank">Basic-fit</NuxtLink>
          , I get to work on various products and create innovative solutions to improve user
          experiences, which includes developing for multiple platforms such as web and kiosk
          applications.
        </Text>
      </div>
    </template>
    <template #background>
      <WorkItemBackground src="/images/basic-fit/work-at-basic-fit.png" />
    </template>
  </WorkItem>
</template>
