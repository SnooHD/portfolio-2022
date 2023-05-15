<script lang="ts" setup>
import { FormKitNode } from '@formkit/core'
import { EmailBodyProps } from '~/types/contact.types'

const { isSubmitting, submitError, submitSuccess, resetSubmitState } = useFormSubmit()

const handleSubmit = async (data: EmailBodyProps, node?: FormKitNode) => {
  resetSubmitState(false)
  isSubmitting.value = true

  try {
    const res = await useFetch('/api/send-email', {
      method: 'post',
      body: {
        ...data,
        subject: data.subject || 'New job offer',
        to: 'snoohd@gmail.com'
      }
    })

    if (res.error.value) throw new Error(res.error.value.message)
  } catch (e) {
    console.error(e)

    submitError.value = true
    isSubmitting.value = false
    resetSubmitState()
    return
  }

  // happy timeout =)
  setTimeout(() => {
    isSubmitting.value = false
    submitSuccess.value = true

    resetSubmitState()
    node?.reset()
  }, 1000)
}
</script>

<template>
  <FormKit
    id="contact-form"
    type="form"
    :actions="false"
    :sections-schema="{
      messages: {
        $el: null,
        children: ''
      },
      message: { $el: null, children: '' }
    }"
    @submit="handleSubmit"
  >
    <ContactFormInput
      name="from"
      type="email"
      label="from:"
      placeholder="*example@domain.com"
      validation="required|email"
    />
    <FormKit type="text" name="to" label="to:" value="snoohd@gmail.com">
      <template #inner="context">
        <div>
          <NuxtLink
            :id="context.id"
            href="mailto:snoohd@gmail.com"
            title="snoohd@gmail.com"
            :class="`
              border-blue border-[1px] rounded-md py-[4px] md:py-[6px] px-[12px] bg-black/[.25]
              text-center h-full flex items-center justify-center font-light
            `"
          >
            <Icon icon="CheckMark" class="text-blue text-[14px] translate-y-[-1px] mr-[4px]" />
            <Text class="!text-[12px] md:!text-[14px] !text-white/[.8]">Mike de Snoo</Text>
          </NuxtLink>
        </div>
      </template>
    </FormKit>
    <ContactFormInput type="text" name="subject" label="subject:" placeholder="New job offer" />
    <ContactFormInput
      type="textarea"
      name="text"
      placeholder="*Your message"
      validation="required"
    />
    <TransitionGroup
      name="form-submit-message-transition"
      enter-from-class="opacity-[0] translate-x-[-10px]"
      leave-to-class="opacity-[0] translate-x-[-10px]"
      leave-from-class="translate-x-[0px]"
      enter-to-class="translate-x-[0px]"
      tag="div"
      class="text-white min-h-[1rem] py-4px"
      enter-active-class="duration-[400ms] transition-[opacity,_transform]"
      leave-active-class="duration-[400ms] transition-[opacity,_transform]"
    >
      <div v-if="submitError">
        Something went wrong, try again or send an email directly to
        <a class="text-blue" href="mailto:snoohd@gmail.com">snoohd@gmail.com</a>
      </div>
      <div v-else-if="submitSuccess">Your message was send, you will hear back from me soon!</div>
    </TransitionGroup>
  </FormKit>
</template>
