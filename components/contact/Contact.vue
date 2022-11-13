<script lang="ts" setup>
const { transitionState } = useScrollTransition({
  visible: 3,
  id: 'contact'
})
</script>

<template>
  <div
    :class="`
      w-full h-full
      ${transitionState}
    `"
  >
    <ContactForm />
  </div>
</template>
