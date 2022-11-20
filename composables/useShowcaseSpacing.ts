type SpacingTypes = 'space-y' | 'space-y-md' | 'space-x' | 'p' | 'py-md' | 'px' | 'py' | 'mt'
type FontSizeTypes = 'xl' | 'lg' | 'md' | 'sm'

export const useShowcaseClasses = () => {
  const spacingSize = useState<'md' | 'lg'>('showcase-page-spacing', () => 'lg')

  const getSpacing = (type: SpacingTypes) => {
    if (spacingSize.value === 'md') {
      if (type === 'space-y') type = 'space-y-md'
      else if (type === 'py') type = 'py-md'
    }

    switch (type) {
      case 'space-y':
        return 'space-y-[15px] xs:space-y-[25px] sm:space-y-[30px] md:space-y-[45px] lg:space-y-[60px]'
      case 'space-y-md':
        return 'space-y-[7.5px] xs:space-y-[12.5px] sm:space-y-[15px] md:space-y-[22.5px] lg:space-y-[30px]'
      case 'space-x':
        return 'space-x-[15px] xs:space-x-[25px] sm:space-x-[30px] md:space-x-[45px] lg:space-x-[60px]'
      case 'p':
        return 'p-[15px] xs:p-[30px] sm:p-[40px] md:p-[60px] lg:p-[80px]'
      case 'px':
        return 'px-[15px] xs:px-[30px] sm:px-[40px] md:px-[60px] lg:px-[80px]'
      case 'py':
        return 'py-[15px] xs:py-[30px] sm:py-[40px] md:py-[60px] lg:py-[80px]'
      case 'py-md':
        return 'py-[7.5px] xs:py-[15px] sm:py-[20px] md:py-[30px] lg:py-[40px]'
      case 'mt':
        return 'mt-[15px] xs:mt-[30px] sm:mt-[40px] md:mt-[60px] lg:mt-[80px]'
    }
  }

  const getFontSize = (type: FontSizeTypes) => {
    switch (type) {
      case 'xl':
        return 'text-[28px] leading-[34px] xs:text-[36px] xs:leading-[44px] sm:text-[40px] sm:leading-[48px] md:text-[46px] md:leading-[54px] lg:text-[64px] lg:leading-[74px]'
      case 'lg':
        return 'text-[21px] leading-[24px] xs:text-[28px] xs:leading-[34px] sm:text-[34px] sm:leading-[40px] md:text-[40px] md:leading-[46px] lg:text-[58px] lg:leading-[64px]'
      case 'sm':
        return 'text-[12px] md:text-[14px] lg:text-[16px]'
      case 'md':
        return 'text-[16px]  md:text-[18px] lg:text-[21px]'
    }
  }

  const getTextClasses = (type: FontSizeTypes) => {
    switch (type) {
      case 'md':
        return `${getFontSize(type)} text-white font-black`
      default:
        return `${getFontSize(type)} uppercase text-white font-black`
    }
  }

  return { getSpacing, getFontSize, getTextClasses, spacingSize }
}
