import { submitForm } from '@formkit/core'

export const useFormSubmit = () => {
  const submit = () => submitForm('contact-form')
  const isSubmitting = useState('is-submitting-form', () => false)
  const submitSuccess = useState('form-was-submitted', () => false)
  const submitError = useState('form-submit-error', () => false)

  const resetState = () => {
    isSubmitting.value = false
    submitSuccess.value = false
    submitError.value = false
  }

  const resetSubmitState = (wait = true) => {
    if (!wait) {
      resetState()
      return
    }

    // Reset state after 5 seconds
    setTimeout(resetState, 5000)
  }

  return {
    submit,
    isSubmitting,
    submitSuccess,
    submitError,
    resetSubmitState
  }
}
