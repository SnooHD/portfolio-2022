<script lang="ts" setup>
const { getImageSrcSet, isImageLoaded, getImageName, setImageLoaded } = useImages()

const { animationState } = useAnimationScroller([
  {
    property: 'translateX',
    fromValue: 0,
    toValue: 30,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'translateY',
    fromValue: 0,
    toValue: 30,
    scrollStart: 0.1,
    scrollEnd: 0.9
  },
  {
    property: 'opacity',
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.1,
    scrollEnd: 1.5
  }
])

const introTransitionEnded = useState('intro-transition-ended', () => false)
const onTransitionEnd = () => {
  introTransitionEnded.value = true
}

/**
 * Using `url(#image)` for shapeOutside does not work.
 * We want to make sure that the `shapeOutside` and the image `src` are using the same format
 * else we are loading an extra image.
 */
interface PictureRefProps {
  $el: HTMLPictureElement
  src: string
}

const pictureRef = ref<PictureRefProps>(null)
const shapeOutsideSrc = useState<string>('shape-outside-src', () => null)
const portraitImageWrapperRef = ref<HTMLDivElement>(null)

const onImageLoad = () => {
  const { src, $el } = pictureRef.value
  const image = $el.querySelector('img')
  if (!image || !image.complete) {
    return
  }

  shapeOutsideSrc.value = image.currentSrc

  const name = getImageName(src)
  setImageLoaded(name)
}

onMounted(() => {
  onImageLoad()
})
</script>

<template>
  <VisibilityWrapper :hidden="1.5">
    <div ref="portraitImageWrapperRef">
      <NuxtPicture
        ref="pictureRef"
        preset="image"
        src="/images/self-portrait/self-portrait.png"
        sizes="xs:800px"
        preload
        :srcset="getImageSrcSet('/images/self-portrait/self-portrait.png', 800)"
        :img-attrs="{
          alt: 'Mike de Snoo, senior developer portrait',
          class: `
            mb-0 w-full float-right object-contain object-bottom brightness-[0.8] contrast-[1.05] mt-[20px] md:mt-[40px] mr-[-45%]
            ${!introTransitionEnded ? 'translate-x-[10%] translation-[transform] duration-400' : ''}
          `,
          style: {
            shapeOutside: shapeOutsideSrc && `url(${shapeOutsideSrc})`,
            opacity: animationState.opacity,
            transform:
              isImageLoaded('self-portrait') &&
              `translateX(${animationState.translateX}px) translateY(${animationState.translateY}px)`
          }
        }"
        @load="onImageLoad"
        @transitionend="onTransitionEnd"
      />
    </div>
  </VisibilityWrapper>
</template>
