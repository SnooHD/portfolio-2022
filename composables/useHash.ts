import { carouselItemType } from './useWorkCarousel'
import { ScrollSectionType } from '~/composables/useScroller'
import { MenuItemsType } from '~/composables/useMenu'

export type HashSectionType = '#home' | '#about-me' | '#my-work' | '#contact'

interface QueryParamProps {
  company: carouselItemType | null
  menu: boolean
}

type FormatHashType = ScrollSectionType | MenuItemsType | HashSectionType
export const useHash = () => {
  const hashValue = useState('has-hash', (): HashSectionType | null => null)
  const queryParam = useState('company-query-param', (): QueryParamProps | null => null)

  const { scrollToScrollPosition } = useScroller()
  const scrollToHash = (
    hash: HashSectionType = location.hash as HashSectionType,
    behavior: 'auto' | 'smooth' = 'smooth'
  ) => {
    if (!hash) return

    hashValue.value = hash

    const queryParams = new URLSearchParams(window.location.search)
    queryParam.value = {
      company: queryParams.get('company') as carouselItemType,
      menu: queryParams.get('menu') === 'true'
    }

    const { origin, pathname } = location
    const url = `${origin}${pathname}`

    // Remove hash without mutating the history
    window.history.replaceState(null, '', url)

    const section = hashToSection(hash)
    const sectionIndex = sections.indexOf(section)

    scrollToScrollPosition(sectionIndex, behavior)
  }

  const hashToSection = (hash: FormatHashType) =>
    hash.replace('#', '').replace(/ /g, '-') as ScrollSectionType
  const stringToHash = (section: FormatHashType) => `#${hashToSection(section)}` as HashSectionType

  return {
    hashValue,
    queryParam,
    scrollToHash,
    hashToSection,
    stringToHash
  }
}
