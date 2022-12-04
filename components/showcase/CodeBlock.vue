<script lang="ts" setup>
defineProps({
  content: {
    type: String,
    required: true
  }
})

const formatWhitespace = (string: string) => {
  const lines = string.split(/\n|\r|\n\r/g).filter((line) => line.search(/\S/) > 1)
  const initialWhitespace = lines[0].search(/\S/)

  return lines.map((line) => line.slice(initialWhitespace)).join('\n')
}

const { getSpacing } = useShowcaseClasses()
</script>

<template>
  <div
    :class="`
      overflow-scroll
      ${getSpacing('py')}
    `"
  >
    <pre v-highlightjs><code class="svg rounded-lg">{{ formatWhitespace(content) }}</code></pre>
  </div>
</template>
