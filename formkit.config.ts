import { generateClasses } from '@formkit/themes'

export default {
  config: {
    validationVisibility: 'submit',
    classes: generateClasses({
      global: {
        inner: `
          border-b-[1px] border-white/[.15] transition-[border,_color] duration-400
          focus-within:border-white/[.75] focus-within:text-white text-white/[.6]
        `,
        input: `
          bg-transparent pb-[1px]
          focus-visible:outline-none
          !bg-clip-text autofill:!text-fill-color-[#fff] !caret-white
          placeholder:text-white/[.4] placeholder:transition-[color] placeholder:duration-400 focus:placeholder:text-white/[.6]
        `,
        label: 'text-white',
        wrapper: 'flex font-palanquin'
      },
      text: {
        input: `
          read-only:border-blue read-only:border-[1px] read-only:rounded-md read-only:pointer-events-none
          read-only:w-[90px] read-only:text-[12px] read-only:text-center read-only:mb-[2px] read-only:text-white
        `
      },
      textarea: {
        inner: '!border-none'
      }
    })
  }
}
