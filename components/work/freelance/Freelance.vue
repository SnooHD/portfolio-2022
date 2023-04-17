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
        <Text>
          Working across various industries, I strive to improve user experiences by developing
          seamless applications for web and mobile platforms. With flexibility and autonomy, I
          deliver high-quality work that meets the unique needs of each project.
        </Text>
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
