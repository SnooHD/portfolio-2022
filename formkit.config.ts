import { generateClasses } from '@formkit/themes'

export default {
  config: {
    validationVisibility: 'submit',
    classes: generateClasses({
      global: {
        form: 'space-y-[10px] md:space-y-[12px] h-full flex flex-col',
        inner: 'flex-grow max-w-[300px]',
        input: `
          pl-[10px] bg-black/[.15] rounded-md border-[1px] border-white/0
          focus-visible:outline-none w-full py-[4px] md:py-[8px] transition-[border,_color] duration-300
          autofill:!text-fill-color-[#fff] !caret-white focus:border-white/[.15] focus:text-white text-white/[.5] 
          placeholder:text-white/[.5] placeholder:transition-[color] placeholder:duration-300 focus:placeholder:text-white/[.8]
        `,
        label: 'text-white/[.8] w-[65px] capitalize flex items-center mr-[4px]',
        wrapper: 'flex font-public-sans'
      },
      textarea: {
        inner: '!max-w-full',
        outer: 'flex-grow',
        wrapper: 'h-full',
        input: 'h-full resize-none'
      }
    })
  }
}
