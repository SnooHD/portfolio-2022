<script lang="ts" setup>
const handleSubmit = async (data) => {
  try {
    await useFetch('/api/send-email', {
      method: 'post',
      body: {
        ...data,
        to: 'snoohd@gmail.com'
      }
    })
  } catch (e) {
    console.log('something went wrong =(')
  }
}
</script>

<template>
  <FormKit id="contact-form" ref="formRef" type="form" :actions="false" @submit="handleSubmit">
    <FormKit
      name="from"
      type="email"
      label="from:"
      placeholder="example@domain.com"
      validation="required|email"
    />
    <FormKit type="text" name="to" label="to:" value="Mike de Snoo">
      <template #inner="context">
        <a href="mailto:snoohd@gmail.com" title="snoohd@gmail.com">
          <div :class="context.classes.inner">
            <input :class="context.classes.input" :value="context._value" readonly />
          </div>
        </a>
      </template>
    </FormKit>
    <FormKit type="text" name="subject" label="subject:" placeholder="New job offer" />
    <FormKit type="textarea" name="text" placeholder="Your message" />
  </FormKit>
</template>
