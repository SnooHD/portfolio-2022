<template>
  <FormKit id="contact-form" ref="formRef" type="form" :actions="false">
    <FormKit
      type="email"
      label="from:"
      placeholder="example@domain.com"
      validation="required|email"
    />
    <FormKit type="text" label="to:" value="Mike de Snoo">
      <template #inner="context">
        <a href="mailto:snoohd@gmail.com" title="snoohd@gmail.com">
          <div :class="context.classes.inner">
            <input :class="context.classes.input" :value="context._value" readonly />
          </div>
        </a>
      </template>
    </FormKit>
    <FormKit type="text" label="subject:" placeholder="New job offer" />
    <FormKit type="textarea" placeholder="Your message" />
  </FormKit>
</template>
