<script lang="ts" setup>
import { getNode, FormKitNode, FormKitMessageProps } from '@formkit/core'

interface MessageContextProps {
  classes: {
    messages: string
  }
  messages: FormKitMessageProps
}

const props = defineProps({
  name: {
    required: true,
    type: String
  }
})

const errorMessage = useState(`input-error-message-${props.name}`, () => '')
onMounted(() => {
  const node = getNode(props.name) as FormKitNode
  node.on('message-added', ({ origin }) => {
    const messages = origin.context?.messages
    if (!messages || !Object.values(messages).length) return

    const message = Object.values(messages)[0].value as string
    errorMessage.value = message
  })
})
</script>

<template>
  <FormKit
    v-bind="$attrs"
    :id="props.name"
    :name="props.name"
    class="flex"
    :validation-messages="{
      required: 'This field is required',
      email: 'Please enter a valid Email'
    }"
  >
    <template #messages="context: MessageContextProps">
      <div
        :class="`
          duration-300 transition-opacity
          absolute right-[6px] bottom-[8px]
          ${Object.values(context.messages).length ? 'opacity-100' : 'opacity-0'}
        `"
      >
        <Icon
          icon="Warning"
          :class="`
            ${errorMessage ? 'animate-shake' : ''}
            flex items-center justify-center text-red-700 text-[18px]
            rounded-full bg-red-900
          `"
        />
        <div
          :class="`
            absolute bottom-full bg-white rounded-md mb-[9px] right-0
            transition-[opacity,_transform] duration-300 px-[4px]
            ${
              Object.values(context.messages).length
                ? 'translate-y-[-5px] opacity-100'
                : 'translate-y-[5px] opacity-0'
            }
            ${context.classes.messages}
          `"
        >
          <div
            :class="`
              absolute right-[1.5px] top-full translate-y-[-2px]
              border-[9px] border-t-white border-r-transparent border-l-transparent border-b-0
            `"
          />
          <span v-if="errorMessage" class="whitespace-nowrap text-[14px]">
            {{ errorMessage }}
          </span>
        </div>
      </div>
    </template>
  </FormKit>
</template>
