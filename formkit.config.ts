import { generateClasses } from '@formkit/themes'

export default {
  config: {
    validationVisibility: 'submit',
    classes: generateClasses({
      global: {
        form: 'space-y-[10px]',
        inner: `
          border-b-[1px] border-white/[.15] transition-[border,_color] duration-400
          focus-within:border-white/[.75] focus-within:text-white text-white/[.6] flex-grow
        `,
        input: `
          bg-transparent pb-[1px]
          focus-visible:outline-none w-full
          !bg-clip-text autofill:!text-fill-color-[#fff] !caret-white
          placeholder:text-white/[.4] placeholder:transition-[color] placeholder:duration-400 focus:placeholder:text-white/[.6]
        `,
        label: 'text-white/[.8] w-[65px]',
        wrapper: 'flex font-palanquin'
      },
      textarea: {
        inner: '!border-none'
      }
    })
  }
}
