<script lang="ts" setup>
import { MyBasicFitImage } from '@/types/images.types'

definePageMeta({
  layout: 'showcase'
})

const { getImageSrcSet } = useImages()
const { pictureRef, onImageLoad, isImageLoaded } = useImagePreloader()
</script>

<template>
  <div class="xl:my-[80px] font-heading-pro">
    <div
      :class="`
        transition-opacity duration-1000
        ${isImageLoaded('head-image') ? 'opacity-100' : 'opacity-0'}  
      `"
    >
      <ShowcaseHeader class="!pr-0 relative">
        <template #background>
          <div class="w-full h-full bg-orange-gradient" />
        </template>
        <template #title>My Basic-Fit</template>
        <template #role>
          <span class="text-white">Role: Senior developer</span>
        </template>
        <template #image>
          <NuxtImg
            ref="pictureRef"
            :src="MyBasicFitImage.header"
            :srcset="getImageSrcSet(MyBasicFitImage.header, [{ width: 400 }])"
            preset="image"
            :class="`
                w-2/6 xs:w-2/5 absolute right-0 bottom-0 translate-y-[18.5%] translate-x-[11%]
            `"
            @load="onImageLoad"
          />
        </template>
      </ShowcaseHeader>
      <ShowcaseSection>
        <template #title>Intro</template>
        <template #content>
          <ShowcaseParagraph>
            My Basic-Fit is a React-based app that serves as a self-help dashboard system that
            members can use to make changes to their accounts. The platform's main intention is to
            remove workload from customer service (changing membership, buying add-ons, etc.). On
            top of that, it also contains some premium features like inviting a friend.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseBlock class="border-mint bg-gray-light relative">
        <template #title>Task at hand</template>
        <template #content>
          <ShowcaseParagraph>
            During my time at Basic-Fit, new branding style guides were introduced. That implied
            that My Basic-Fit needed to get a new layout. Together with two other team members, we
            set out to make this happen
          </ShowcaseParagraph>
          <ShowcaseImage>
            <NuxtImg
              preset="image"
              :src="MyBasicFitImage.redesign"
              :srcset="getImageSrcSet(MyBasicFitImage.redesign, [{ width: 600 }])"
              class="w-full"
            />
          </ShowcaseImage>
          <div class="absolute bottom-0 right-0">
            <NuxtImg
              preset="image"
              :src="MyBasicFitImage.waveArtifact"
              :srcset="getImageSrcSet(MyBasicFitImage.waveArtifact, [{ width: 100 }])"
              class="w-[40px] xs:w-[60px] sm:w-[80px] md:w-[150px] translate-x-[20%] sm:translate-x-[40%] translate-y-[30%]"
            />
          </div>
        </template>
      </ShowcaseBlock>
      <ShowcaseSection>
        <template #title>Getting Started</template>
        <template #content>
          <ShowcaseParagraph>
            When we started, the code of this project was inconsistent, slow, and complex. That made
            the re-branding the perfect opportunity to refactor the codebase and make it more
            performant. We divided the designs into small segments, allowing us to work on small
            digestible tasks to create reusable components.
            <br />
            <br />
            We set off by adding Storybook, allowing us to share our components with other teams.
            After that, we implemented Tailwind and Typescript.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseBlock class="border-mint bg-gray-light relative">
        <template #title>Performance</template>
        <template #content>
          <ShowcaseParagraph>
            <template #title>Hooks</template>
            <template #content>
              In React, it is important to use hooks like useEffect, useCallback, useState, and
              useContext. This way, we can control what logic runs during re-renders and when
              re-renders happen. But clean code does not necessarily mean performance. We used
              Lighthouse to nail down the pain points and incrementally worked our way up.
            </template>
          </ShowcaseParagraph>
          <ShowcaseParagraph>
            <template #title>Caching</template>
            <template #content>
              The main performance killer was caching, to solve this problem we implement SWR. This
              package handles caching for all outgoing API calls and makes sure the same calls are
              never going out twice.
            </template>
          </ShowcaseParagraph>
          <ShowcaseParagraph>
            <template #title>Load what you need</template>
            <template #content>
              All data was always fetched globally, but most users directly enter My Basic-Fit on
              one specific page, which does not use most data. We separated the API calls on a
              per-route basis. That does imply that data can be re-fetched on every page change.
              That is where SWR comes into play: if the API call was already done, it would return
              the cached data.
            </template>
          </ShowcaseParagraph>
          <ShowcaseParagraph>
            <template #title>Translations</template>
            <template #content>
              The backend was doing several asynchronous tasks that blocked the content from being
              returned quickly. For that reason, we started looking into serving translations using
              static files. We implemented I18Next and configured it to use static files and a
              caching mechanism using the session storage.
            </template>
          </ShowcaseParagraph>
          <ShowcaseImage>
            <NuxtImg
              preset="image"
              :src="MyBasicFitImage.performance"
              :srcset="getImageSrcSet(MyBasicFitImage.performance, [{ width: 600 }])"
              class="w-full"
            />
          </ShowcaseImage>
          <div class="absolute bottom-0 right-0">
            <NuxtImg
              preset="image"
              :src="MyBasicFitImage.circleArtifact"
              :srcset="getImageSrcSet(MyBasicFitImage.circleArtifact, [{ width: 100 }])"
              class="w-[40px] xs:w-[60px] sm:w-[80px] md:w-[150px] translate-y-[52%] translate-x-[-2%] sm:translate-x-[43%] sm:translate-y-[18%]"
            />
          </div>
        </template>
      </ShowcaseBlock>
      <ShowcaseSection>
        <template #title>Automated testing</template>
        <template #content>
          <ShowcaseParagraph>
            To prevent changes from breaking the codebase, we wrote tests. Unit tests allow us to
            make sure that complex logic always gives the expected outcome. E2E tests help us makes
            sure that all web pages and user flows work as intended.
            <br />
            <br />
            These tests are run before every commit using a pipeline. When a test fails in the
            pipeline, the merge will not be allowed until the developer solves the problem.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
      <ShowcaseSection class="bg-gray-light !pb-[100px]">
        <template #title>Monitoring</template>
        <template #content>
          <ShowcaseParagraph>
            My Basic-Fit has 10.000s users every day, which creates a lot of unforeseen problems. We
            implemented New Relic for both the front end and the back end.

            <br />
            <br />
            With New Relic, we can see all traffic, errors, and browser details. That helps us to
            find and solve a problem quickly.
          </ShowcaseParagraph>
        </template>
      </ShowcaseSection>
    </div>
    <ShowcaseFooter company="basic-fit" />
  </div>
</template>
