<script lang="ts" setup>
const messageRef = ref<HTMLSpanElement[]>([])

const elementHeight = useState<number[]>('contact-input-message-height', () => [])
watch(messageRef, (messageRefValue) => {
  messageRefValue.forEach((value, index) => {
    const element = value.querySelector('span')
    elementHeight.value[index] = element.getBoundingClientRect().height
  })
})
</script>

<template>
  <FormKit v-bind="$attrs">
    <template #messages="context">
      <div :class="context.classes.messages">
        <transition-group
          enter-from-class="!h-[0px] opacity-[0]"
          enter-to-class="opacity-[1]"
          leave-from-class="opacity-[1]"
          leave-to-class="!h-[0px] opacity-[0]"
        >
          <div
            v-for="(message, key, index) in (context.messages as Record<string, any>)"
            ref="messageRef"
            :key="`form-input-${$attrs.name}-${key}`"
            :class="`
              ${context.classes.message}
              transition-[opacity,_height] duration-300
            `"
            :style="{
              height: `${elementHeight[index]}px`
            }"
          >
            <span class="text-red">{{ message.value }}</span>
          </div>
        </transition-group>
      </div>
    </template>
  </FormKit>
</template>
