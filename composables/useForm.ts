export const useForm = () => {
  const formRef = ref(null)

  watch(formRef, (reference) => {
    console.log(reference)
  })

  return {
    formRef
  }
}
