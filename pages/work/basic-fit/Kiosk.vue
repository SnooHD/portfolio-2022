<script lang="ts" setup>
definePageMeta({
  layout: 'showcase'
})

const { getImageSrcSet } = useImages()
</script>

<template>
  <div class="font-heading-pro mb-[15px] xs:mb-[30px] sm:mb-[60px] md:mb-[90px] lg:mb-[120px]">
    <ShowcaseHeader>
      <template #background>
        <div class="w-full h-full bg-orange-gradient" />
      </template>
      <template #title>
        <span
          :class="`
          uppercase  text-white font-black
          text-[28px] leading-[34px]
          xs:text-[36px] xs:leading-[44px]
          sm:text-[40px] sm:leading-[48px]
          md:text-[46px] md:leading-[54px]
          lg:text-[64px] lg:leading-[74px]
        `"
        >
          <span>Basic-Fit</span>
          <br />
          <span
            class="text-transparent"
            :style="{
              '-webkit-text-stroke-color': '#fff',
              '-webkit-text-stroke-width': '1px'
            }"
          >
            Kiosk
          </span>
        </span>
      </template>
      <template #role>
        <span class="text-[12px] md:text-[14px] lg:text-[16px] text-white">
          Role: Senior developer
        </span>
      </template>
      <template #image>
        <div class="relative">
          <NuxtPicture
            src="images/showcase/kiosk/kiosk.png"
            :srcset="getImageSrcSet('images/showcase/kiosk/kiosk.png', [{ width: 400 }])"
            preset="image"
            :img-attrs="{
              class: 'w-full absolute right-0 top-0 translate-y-[-5%]'
            }"
          />
        </div>
      </template>
    </ShowcaseHeader>
    <div
      class="space-y-[15px] xs:space-y-[25px] sm:space-y-[35px] md:space-y-[45px] lg:space-y-[60px]"
    >
      <ShowcaseParagraph class="mt-[60px] xs:mt-[80px] md:mt-[110px] lg:mt-[140px]">
        The kiosks contain a small PC running windows 10, this allows us to run Google Chrome in
        Kiosk mode as the interface for the application.
        <br />
        <br />
        This app was built up using React.js and Typescript. We used Tailwind to style our
        components and Storybook to document these components for our team members.
      </ShowcaseParagraph>
      <ShowcaseBlock class="border-mint bg-gray-light">
        <div class="space-y-[60px]">
          <NuxtPicture
            preset="image"
            src="images/showcase/kiosk/overview.png"
            :srcset="getImageSrcSet('images/showcase/kiosk/overview.png', [{ width: 1200 }])"
            :img-attrs="{
              class: 'w-full'
            }"
          />
          <div class="flex justify-between space-x-[60px] w-full">
            <NuxtPicture
              preset="image"
              src="images/showcase/kiosk/details.png"
              :srcset="getImageSrcSet('images/showcase/kiosk/details.png', [{ width: 600 }])"
              class="w-full"
            />
            <NuxtPicture
              preset="image"
              src="images/showcase/kiosk/membership.png"
              :srcset="getImageSrcSet('images/showcase/kiosk/showcase.png', [{ width: 600 }])"
              class="w-full"
            />
          </div>
          <ShowcaseParagraph :padding="false">
            The design aims to give energy and get you going. The Kiosk is capable of some important
            things: New customers can sign up to become a member Members can log in and change their
            memberships Members can buy a day pass New customers can start there membership using
            the voucher kit that was bought online.
          </ShowcaseParagraph>
        </div>
      </ShowcaseBlock>
    </div>
  </div>
</template>
