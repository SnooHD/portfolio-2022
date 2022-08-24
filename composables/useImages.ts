/**
 * This hook detects webp support and preloads images so we can wait until they are ready
 */

import { useState } from 'nuxt/app'

interface LoadImageProps {
  name?: string
  src: string
  fallback?: string
}

export const useImages = () => {
  const webp = useState<boolean | null>('webp', () => null)

  if (process.client && webp.value === null) {
    ;(async () => {
      try {
        webp.value = await new Promise<boolean>((resolve, reject) => {
          // some small (2x1 px) test images for each feature
          const base64 =
            'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='

          const image = document.createElement('img')
          image.onload = () => {
            if (image.width === 2 && image.height === 1) {
              resolve(true)
            } else {
              reject('unable to load webp')
            }
          }
          image.onerror = () => {
            reject('unable to load webp')
          }
          image.src = base64
        })
      } catch (e) {
        webp.value = false
      }
    })()
  }

  const fetchImage = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
      const image = document.createElement('img')
      image.onerror = () => reject()
      image.onload = () => resolve()
      image.src = src
    })

  const isImageLoaded = (name: string) =>
    images.value.some(({ name: imageName }) => imageName.toLowerCase() === name.toLowerCase())
  const getImageSrc = (name: string) =>
    images.value.find(({ name: imageName }) => imageName.toLowerCase() === name.toLowerCase())?.src

  const images = useState<LoadImageProps[]>('images', () => [])
  const loadImage = async ({ name, src, fallback }: LoadImageProps) => {
    if (webp) {
      await fetchImage(src)
    } else if (fallback) {
      src = fallback

      try {
        await fetchImage(src)
      } catch (e) {
        throw new Error('Both src and fallback can not be preloaded')
      }
    } else {
      // unable to load fallback
      throw new Error('No preload fallback was provided')
    }

    // add resource to loaded list
    if (!name) {
      const imagePath = src.split('.')[0]
      name = imagePath.split('/').reverse()[0]
    }

    images.value = [...images.value, { name, src }]

    // return the src and type
    return src
  }

  return {
    loadImage,
    isImageLoaded,
    getImageSrc
  }
}
