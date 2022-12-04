<script lang="ts" setup>
definePageMeta({
  layout: 'showcase'
})

const { getSpacing, spacingSize } = useShowcaseClasses()
spacingSize.value = 'md'

const { getImageSrcSet } = useImages()
</script>

<template>
  <div :class="`font-manrope xl:py-[80px]`">
    <ShowcaseHeader class="relative md:!py-[6%] !pb-[5%]">
      <template #background>
        <NuxtPicture
          preset="image"
          src="images/showcase/custom-fotowand/header.png"
          :srcset="getImageSrcSet('images/showcase/custom-fotowand/header.png', [{ width: 900 }])"
          :class="`
            absolute w-[110%] left-0 md:left-auto md:w-[90%] h-[105%] md:h-auto
            object-cover object-bottom md:object-contain md:right-[2%] top-[-5%] md:top-[50%] md:translate-y-[-50%] z-[-1]
          `"
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
          comes into play. Together with the team, we sat down to conceptualize a tool the customers
          could use to design their high-quality wallpaper.
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Exactly enough options</template>
      <template #content>
        <ShowcaseParagraph>
          You could build an online version of Photoshop. But is that a good idea? We don't think
          so. By giving the user enough freedom — upload photos, add text and logos, change colors,
          determine format — we know that every result does what it has to do: stand out and shine.
        </ShowcaseParagraph>
        <div class="flex">
          <ShowcaseImage>
            <NuxtPicture
              preset="image"
              src="images/showcase/custom-fotowand/preview.png"
              :srcset="
                getImageSrcSet('images/showcase/custom-fotowand/preview.png', [{ width: 900 }])
              "
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
          At Stijlbreuk, we use Vue to build our projects, allowing us to create reusable components
          without hassle. We decided to develop the tool using Fabric.js. Fabric.js creates a
          high-performing and interactive canvas that rotates, moves, and scales elements. Wrapping
          all this is a nicely designed layout that gives the perfect usability.
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
              home, we protect the user from common mistakes. Such as uploading low-quality photos.
              Our DPI check indicates whether your photo meets the quality requirements.
            </template>
          </ShowcaseParagraph>
          <ShowcaseImage class="w-full sm:w-1/2">
            <NuxtPicture
              preset="image"
              src="images/showcase/custom-fotowand/dpi-check.png"
              :srcset="
                getImageSrcSet('images/showcase/custom-fotowand/dpi-check.png', [{ width: 400 }])
              "
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
          Vue instance, which makes it possible for the maintainers of the Custom Fotowand to decide
          where the component should load. It also allows adding/removing backgrounds and fonts and
          customizing the price.
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseFooter company="stijlbreuk" />
  </div>
</template>
