export interface menuOverlayProps {
  text: string
  href?: string
  onClick?: (e?: MouseEvent) => void
}

export interface WorkMenuItemProps {
  to: string
  title: string
  description?: string
  image: string
}
