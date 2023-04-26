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
      <div class="flex justify-center">
        <div class="w-full md:w-2/3 space-y-[15px]">
          <NuxtImg class="w-1/2 xs:w-1/3" src="/images/freelance/logo.svg" preset="svg" />
          <Text class="shadow-white/60 text-shadow-[sm]">
            Working across various industries, I strive to improve user experiences by developing
            seamless applications for web and mobile platforms. I deliver high-quality work that
            meets the unique needs of each project.
          </Text>
        </div>
      </div>
    </template>
    <template #background>
      <WorkItemBackground src="/images/freelance/freelance.png" />
    </template>
    <template #menu>
      <ul>
        <li>Hi there! Freelance</li>
      </ul>
    </template>
  </WorkItem>
</template>
