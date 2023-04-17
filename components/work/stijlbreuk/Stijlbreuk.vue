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
        <Text>
          <NuxtLink href="https://www.stijlbreuk.nl" target="_blank">Stijlbreuk</NuxtLink>
          is an innovative UX agency that creates designs with a wow effect. With a talented team
          and cutting-edge technology, they aim to deliver exceptional user experiences.
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
