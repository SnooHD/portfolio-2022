<script lang="ts" setup>
import { FormKitNode } from '@formkit/core'
import { EmailBodyProps } from '~/types/contact.types'

const handleSubmit = async (data: EmailBodyProps, node: FormKitNode) => {
  node.clearErrors()

  node.setErrors([
    'Something went wrong, try again or send an email directly to <a href="mailto:snoohd@gmail.com">snoohd@gmail.com</a>'
  ])

  try {
    await useFetch('/api/send-email', {
      method: 'post',
      body: {
        ...data,
        subject: data.subject || 'New job offer',
        to: 'snoohd@gmail.com'
      }
    })
  } catch (e) {
    node.setErrors([
      'Something went wrong, try again or send an email directly to snoohd@gmail.com'
    ])
  }
}
</script>

<template>
  <FormKit id="contact-form" type="form" :actions="false" @submit="handleSubmit">
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
    <ContactFormInput type="textarea" name="text" placeholder="*Your message" />
  </FormKit>
</template>
