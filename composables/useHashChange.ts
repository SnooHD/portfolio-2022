import { ScrollSectionType } from '~/composables/useScroller'
import { MenuItemsType } from '~/composables/useMenu'

export type HashSectionType = '#home' | '#about-me' | '#my-work' | '#contact'

type FormatHashType = ScrollSectionType | MenuItemsType | HashSectionType
export const useHashChange = () => {
  const { scrollToSection } = useScroller()

  const hashSections = sections.map((section) => `#${section}`) as HashSectionType[]
  const scrollToHash = (hash: FormatHashType = location.hash as HashSectionType) => {
    if (!hash) return

    const formattedHash = stringToHash(hash)
    if (hash !== location.hash) window.history.replaceState(null, '', formattedHash)

    const section = stringToSection(hash)
    scrollToSection(section)
  }

  const stringToSection = (hash: FormatHashType) =>
    hash.replace('#', '').replace(/ /g, '-') as ScrollSectionType

  const stringToHash = (section: FormatHashType) =>
    `#${stringToSection(section)}` as HashSectionType

  return {
    hashSections,
    scrollToHash,
    stringToHash
  }
}
