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
    <ShowcaseHeader>
      <template #background>
        <div class="bg-blue h-full w-full" />
      </template>
      <template #title>
        Abel & Co
        <br />
        Heath pomp check
      </template>
      <template #bottom>
        <div :class="`bg-orange py-[15px] w-full ${getSpacing('px')}`">
          <span class="text-white">Role: Medior developer</span>
        </div>
      </template>
    </ShowcaseHeader>
    <ShowcaseSection>
      <template #title>Intro</template>
      <template #content>
        <ShowcaseParagraph>
          Are you in need of a new boiler? Do you want to have annual maintenance carried out
          carefully? Or do you have other work that belongs to the specialized installer? Then
          Abel&co is where you need to be.
          <br />
          <br />
          Recently installing heath pomp has become more popular, but do you need one? That is the
          question Stijlbreuk set out to help answer. We designed and created a personalized
          questionnaire to help customers make this decision.
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Gathering information</template>
      <template #content>
        <ShowcaseParagraph>
          Through several questions based on your personal situation, we can predict the long-term
          return. First, we need to find out what your current situation is: What type of house do
          you live in? What is your current heating system? Is your house properly isolated?
          <br />
          <br />

          And we need to know if a heat pump makes sense: Do you have space to install one? How much
          gas and electricity do you yearly use?
        </ShowcaseParagraph>
        <div class="flex">
          <ShowcaseImage>
            <NuxtPicture
              preset="image"
              src="images/showcase/abel-co/questionnaire.png"
              :srcset="
                getImageSrcSet('images/showcase/abel-co/questionnaire.png', [{ width: 900 }])
              "
              class="w-full"
            />
          </ShowcaseImage>
        </div>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Personalized advice</template>
      <template #content>
        <ShowcaseParagraph>
          Based on the gathered information we provide the best solution for your scenario. The
          results are presented in an overview, giving an estimation of costs and long-term savings.
        </ShowcaseParagraph>
        <ShowcaseImage class="w-full">
          <NuxtPicture
            preset="image"
            src="images/showcase/abel-co/result.png"
            :srcset="getImageSrcSet('images/showcase/abel-co/result.png', [{ width: 900 }])"
            class="w-full"
          />
        </ShowcaseImage>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Download report</template>
      <template #content>
        <ShowcaseParagraph>
          When you leave the webpage, your results are gone. So naturally, we offer a way to receive
          your report. When you click on the download button and enter your information, an email
          will be sent your way with a detailed PDF. We created a REST API endpoint that generates
          this PDF loading a custom HTML template in Puppeteer.
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseFooter company="stijlbreuk" />
  </div>
</template>
