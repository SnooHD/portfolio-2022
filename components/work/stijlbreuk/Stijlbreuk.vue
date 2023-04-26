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
      <div class="flex justify-center">
        <div class="w-full md:w-2/3 space-y-[15px]">
          <NuxtImg class="w-1/2 xs:w-1/3" src="/images/stijlbreuk/logo.svg" preset="svg" />
          <Text class="shadow-white/60 text-shadow-[sm]">
            Stijlbreuk is an innovative UX agency that creates designs with a wow effect. With a
            talented team and cutting-edge technology, they aim to deliver exceptional user
            experiences.
          </Text>
        </div>
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
