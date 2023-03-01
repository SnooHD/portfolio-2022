<script lang="ts" setup>
import { KioskImage } from '@/types/images.types'
import { useImagePreloader } from '@/composables/useImagePreloader'

definePageMeta({
  layout: 'showcase'
})

const { getImageSrcSet } = useImages()
const { pictureRef, onImageLoad, isImageLoaded } = useImagePreloader()
const { getSpacing } = useShowcaseClasses()
</script>

<template>
  <div class="xl:my-[80px] font-heading-pro">
    <div
      :class="`
        transition-opacity duration-1000
        ${isImageLoaded('kiosk') ? 'opacity-100' : 'opacity-0'}  
      `"
    >
      <ShowcaseHeader>
        <template #background>
          <div class="w-full h-full bg-orange-gradient" />
        </template>
        <template #title>
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
        </template>
        <template #role>
          <span class="text-white">Role: Senior developer</span>
        </template>
        <template #image>
          <NuxtImg
            ref="pictureRef"
            :src="KioskImage.kiosk"
            :srcset="getImageSrcSet(KioskImage.kiosk, [{ width: 400 }])"
            preset="image"
            :class="`
              w-[30%] absolute right-0 bottom-0 translate-y-[20%] translate-x-[-20%]
            `"
            @load="onImageLoad"
          />
        </template>
      </ShowcaseHeader>
      <ShowcaseSection class="mt-[15px] xs:mt-[20px] md:mt-[30px] lg:mt-[40px]">
        <ShowcaseParagraph>
          The kiosks contain a small PC running windows 10, this allows us to run Google Chrome in
          Kiosk mode as the interface for the application.
          <br />
          <br />
          This app was built using React.js and Typescript. We used Tailwind to style our components
          and Storybook to document these components for our team members.
        </ShowcaseParagraph>
      </ShowcaseSection>
      <ShowcaseBlock class="border-mint bg-gray-light">
        <template #title>Design</template>
        <template #content>
          <div :class="getSpacing('space-y-md')">
            <ShowcaseParagraph>The design aims to give energy and get you going.</ShowcaseParagraph>
            <ShowcaseImage>
              <NuxtImg
                preset="image"
                :src="KioskImage.overview"
                :srcset="getImageSrcSet(KioskImage.overview, [{ width: 1200 }])"
                class="w-full"
              />
            </ShowcaseImage>
            <div
              :class="`
              flex justify-between w-full
              ${getSpacing('space-x')}
            `"
            >
              <ShowcaseImage>
                <NuxtImg
                  preset="image"
                  :src="KioskImage.details"
                  :srcset="getImageSrcSet(KioskImage.details, [{ width: 600 }])"
                  class="w-full"
                />
              </ShowcaseImage>
              <ShowcaseImage>
                <NuxtImg
                  preset="image"
                  :src="KioskImage.membership"
                  :srcset="getImageSrcSet(KioskImage.membership, [{ width: 600 }])"
                  class="w-full"
                />
              </ShowcaseImage>
            </div>
          </div>
          <ShowcaseParagraph>
            The Kiosk is capable of some important things:
            <ul class="list-disc pl-4">
              <li>New customers can sign up to become a member</li>
              <li>Members can log in and change their memberships</li>
              <li>Members can buy a day pass</li>
              <li>
                New customers can start there membership using the voucher kit that was bought
                online.
              </li>
            </ul>
          </ShowcaseParagraph>
        </template>
      </ShowcaseBlock>
      <ShowcaseSection>
        <template #title>Offline</template>
        <template #content>
          <ShowcaseImage>
            <NuxtImg
              preset="image"
              :src="KioskImage.offline"
              :srcset="getImageSrcSet(KioskImage.offline, [{ width: 600 }])"
              class="w-full"
            />
          </ShowcaseImage>
          <ShowcaseParagraph>
            Signing up is the main feature of the kiosk, it needs to happen flawlessly and it should
            always work. To make this a reality we utilize the power of service workers using
            WorkBox, this allows the app to run even when there is no internet connection. During
            this offline period only signup is possible. All payments are postponed, and members
            will receive an email to complete the payment as soon the internet is back.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseBlock class="border-orange bg-gray-light">
        <template #title>Hardware Communication</template>
        <template #content>
          <ShowcaseImage>
            <NuxtImg
              preset="image"
              :src="KioskImage.payment"
              :srcset="getImageSrcSet(KioskImage.payment, [{ width: 1200 }])"
              class="w-full"
            />
          </ShowcaseImage>
          <ShowcaseParagraph>
            The kiosk uses a local .NET server to communicate with the hardware. We can interact
            with this server using a WebSocket running through SignalR. This allows us to send
            requests like making a payment, reading a barcode, or issuing a member card.
            <br />
            <br />
            It also allows us to listen to events, that way we can respond to errors and give
            feedback to the users.
          </ShowcaseParagraph>
          <div
            :class="`
              flex justify-between w-full
              ${getSpacing('space-x')}
            `"
          >
            <ShowcaseImage>
              <NuxtImg
                preset="image"
                :src="KioskImage.scanCard"
                :srcset="getImageSrcSet(KioskImage.scanCard, [{ width: 600 }])"
                class="w-full"
              />
            </ShowcaseImage>
            <ShowcaseImage>
              <NuxtImg
                preset="image"
                :src="KioskImage.scanError"
                :srcset="getImageSrcSet(KioskImage.scanError, [{ width: 600 }])"
                class="w-full"
              />
            </ShowcaseImage>
          </div>
        </template>
      </ShowcaseBlock>
      <ShowcaseSection>
        <template #title>Automated testing</template>
        <template #content>
          <ShowcaseParagraph>
            To prevent changes from breaking the codebase we have to write tests. Since this is not
            a regular website, we have decided to focus on the different flows the app holds. Every
            flow has a test that runs in Cypress before being built. These tests make sure that the
            flow can be interacted with from start till end without issues.

            <br />
            <br />
            On top of this, we have written Unit tests using Jest. These tests make sure our logic
            is working as it's supposed to and prevent unwanted bugs.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseSection class="bg-gray-light !pb-[100px]">
        <template #title>Monitoring, logging and errors</template>
        <template #content>
          <ShowcaseParagraph>
            Basic-Fit has over 2000 active kiosks running, so we want to make sure our application
            is running as it should everywhere. I created a Fastify app on top of NodeJS that allows
            us to push logs to a MongoDB instance. This allows us to see if all kiosks are for
            example running the latest version, or if they are offline.
            <br />
            <br />
            Running into errors is not something we want to happen, but running on over 2000 systems
            you run into some problems eventually. To handle these errors we have implemented Sentry
            into our App. Sentry shows us a trace from where in the code the error occurred and how
            often it occurs. This allows us to set priorities accordingly and find out the cause of
            bugs faster.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
    </div>
    <ShowcaseFooter company="basic-fit" />
  </div>
</template>
