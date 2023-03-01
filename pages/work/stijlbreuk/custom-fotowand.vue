<script lang="ts" setup>
import { CustomFotowandImage } from '@/types/images.types'

definePageMeta({
  layout: 'showcase'
})

const { getSpacing, spacingSize } = useShowcaseClasses()
spacingSize.value = 'md'

const { getImageSrcSet } = useImages()
const { pictureRef, onImageLoad, isImageLoaded } = useImagePreloader()
</script>

<template>
  <div :class="`font-manrope xl:py-[80px]`">
    <div
      :class="`
        transition-opacity duration-1000
        ${isImageLoaded('header') ? 'opacity-100' : 'opacity-0'}  
      `"
    >
      <ShowcaseHeader class="relative md:!py-[6%] !pb-[5%]">
        <template #background>
          <NuxtImg
            ref="pictureRef"
            preset="image"
            :src="CustomFotowandImage.header"
            :srcset="getImageSrcSet(CustomFotowandImage.header, [{ width: 900 }])"
            :class="`
              absolute w-[110%] left-0 md:left-auto md:w-[90%] h-[105%] md:h-auto
              object-cover object-bottom md:object-contain md:right-[2%] top-[-5%] md:top-[50%] md:translate-y-[-50%] z-[-1]
            `"
            @load="onImageLoad"
          />
        </template>
        <template #title>
          Custom
          <br />
          Fotowand
        </template>
        <template #role>
          <span class="text-white">Role: Medior developer</span>
        </template>
      </ShowcaseHeader>
      <ShowcaseSection>
        <template #title>Intro</template>
        <template #content>
          <ShowcaseParagraph>
            Custom fotowand offers custom and seamlessly printed wallpaper. Custom means that it
            should be easy for customers to create their own wallpapers. That is where Stijlbreuk
            comes into play. Together with the team, we sat down to conceptualize a tool the
            customers could use to design their high-quality wallpaper.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseSection>
        <template #title>Exactly enough options</template>
        <template #content>
          <ShowcaseParagraph>
            You could build an online version of Photoshop. But is that a good idea? We don't think
            so. By giving the user enough freedom — upload photos, add text and logos, change
            colors, determine format — we know that every result does what it has to do: stand out
            and shine.
          </ShowcaseParagraph>
          <div class="flex">
            <ShowcaseImage>
              <NuxtImg
                preset="image"
                :src="CustomFotowandImage.preview"
                :srcset="getImageSrcSet(CustomFotowandImage.preview, [{ width: 900 }])"
                class="w-full"
              />
            </ShowcaseImage>
          </div>
        </template>
      </ShowcaseSection>
      <ShowcaseSection>
        <template #title>Development</template>
        <template #content>
          <ShowcaseParagraph>
            At Stijlbreuk, we use Vue to build our projects, allowing us to create reusable
            components without hassle. We decided to develop the tool using Fabric.js. Fabric.js
            creates a high-performing and interactive canvas that rotates, moves, and scales
            elements. Wrapping all this is a nicely designed layout that gives the perfect
            usability.
          </ShowcaseParagraph>
          <div
            :class="`
            flex items-center justify-between
            flex-col sm:flex-row
            ${getSpacing('space-y-md')}
          `"
          >
            <ShowcaseParagraph class="w-full sm:w-2/5">
              <template #title>DPI check</template>
              <template #content>
                To guarantee that every customer receives a beautiful end product delivered to their
                home, we protect the user from common mistakes. Such as uploading low-quality
                photos. Our DPI check indicates whether your photo meets the quality requirements.
              </template>
            </ShowcaseParagraph>
            <ShowcaseImage class="w-full sm:w-1/2">
              <NuxtImg
                preset="image"
                :src="CustomFotowandImage.dpiCheck"
                :srcset="getImageSrcSet(CustomFotowandImage.dpiCheck, [{ width: 400 }])"
                class="w-full"
              />
            </ShowcaseImage>
          </div>
        </template>
      </ShowcaseSection>
      <ShowcaseSection>
        <template #title>Integration</template>
        <template #content>
          <ShowcaseParagraph>
            The tool we built is not part of the Custom fotowand website. That implies we need to
            inject the component into the page at runtime. We expose a configurational object to the
            Vue instance, which makes it possible for the maintainers of the Custom Fotowand to
            decide where the component should load. It also allows adding/removing backgrounds and
            fonts and customizing the price.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
    </div>
    <ShowcaseFooter company="stijlbreuk" />
  </div>
</template>
