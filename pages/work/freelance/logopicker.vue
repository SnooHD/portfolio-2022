<script lang="ts" setup>
definePageMeta({
  layout: 'showcase'
})

const { spacingSize } = useShowcaseClasses()
spacingSize.value = 'md'

const { getImageSrcSet } = useImages()
</script>

<template>
  <div class="font-manrope xl:py-[80px]">
    <ShowcaseHeader>
      <template #background>
        <NuxtPicture
          preset="image"
          src="images/showcase/logopicker/header-bg.png"
          :srcset="getImageSrcSet('images/showcase/logopicker/header-bg.png', [{ width: 900 }])"
          class="w-full h-full object-cover"
        />
      </template>
      <template #title>
        <span class="text-anthracite inline-block lg:mt-[40px]">Logopicker</span>
      </template>
      <template #role>
        <span class="text-anthracite inline-block lg:mb-[40px]">Role: Developer & co-designer</span>
      </template>
    </ShowcaseHeader>
    <ShowcaseSection>
      <template #title>Intro</template>
      <template #content>
        <ShowcaseParagraph>
          Logopicker is a personal project that Me and my wife have been working for quite some
          time. The project was brought into life with the idea to give interpreneurs the power to
          design their own logo. This project is still ongoing, and became a fun learning
          experience.
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Determine your style</template>
      <template #content>
        <ShowcaseParagraph>
          By asking some questions we can figure out what logo would match your business.
        </ShowcaseParagraph>
        <div class="flex">
          <ShowcaseImage>
            <NuxtPicture
              preset="image"
              src="images/showcase/logopicker/questionnaire.png"
              :srcset="
                getImageSrcSet('images/showcase/logopicker/questionnaire.png', [{ width: 900 }])
              "
              class="w-full"
            />
          </ShowcaseImage>
        </div>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Design your logo</template>
      <template #content>
        <ShowcaseParagraph>
          Tools like Photoshop or Illustrator are not very usable for the beginner. We aimed to
          create an easy to use tool that is still powerful enough to create the perfect logo for
          your brand.
        </ShowcaseParagraph>
        <ShowcaseImage class="w-full">
          <NuxtPicture
            preset="image"
            src="images/showcase/logopicker/tool.png"
            :srcset="getImageSrcSet('images/showcase/logopicker/tool.png', [{ width: 900 }])"
            class="w-full"
          />
        </ShowcaseImage>
      </template>
    </ShowcaseSection>
    <ShowcaseSection>
      <template #title>Development</template>
      <template #content>
        <ShowcaseParagraph>
          <template #title>Storing the logos</template>
          <template #content>
            SVG paths are just code, so we can easily store them in any database. However, they can
            be really long, and take quite a lot of space. The best course of action would be
            preventing to store the same path twice.
            <br />
            The logo’s are stored into an SQL database. When a logo gets fetched, it will have a
            reference to the paths it uses.
            <br />
            This setup allows us to save custom user made logo’s by just storing the path reference
            ids, and the specific customizations the user made. E.g. colors and shape position.
          </template>
        </ShowcaseParagraph>
        <ShowcaseParagraph>
          <template #title>Creating the Editor</template>
          <template #content>
            If you know SVG from a technical level, you know they can get complex pretty fast.
            Working on this project has allowed me to take a deep dive into how they work. Being
            able to work with any type of SVG in the front end means you need to normalize them.
            With the help of SVGO and some custom server logic, all shapes get converted to paths.
            We re-scale all paths to a predefined view box and make sure no paths fall outside of
            its bounds.
            <ShowcaseCodeBlock
              :content="`
                <path
                  fill-rule=&quot;evenodd&quot;
                  clip-rule=&quot;evenodd&quot;
                  d=&quot;M14.9545 5.63925C14.9602 5.65369 14.965 5.66812 14.9794 5.71231C14.9837 5.72808 14.9867 5.74467 14.9941 5.78554L14.9948 5.78887C14.9983 5.81425 15 5.8405 15 5.86719V10.1328C15 10.1591 14.9983 10.1853 14.9899 10.2374C14.9869 10.2544 14.9838 10.2711 14.9698 10.317C14.965 10.3314 14.9602 10.3463 14.9409 10.3901C14.9348 10.4036 14.9283 10.4167 14.9033 10.4579C14.8954 10.4706 14.8871 10.4824 14.8574 10.5204C14.8477 10.5314 14.8377 10.5428 14.8036 10.5764C14.7922 10.5865 14.7808 10.5961 14.7694 10.6053C14.7673 10.607 14.7651 10.6086 14.7628 10.6104C14.7555 10.616 14.7469 10.6226 14.7323 10.6333L8.33381 14.8989C8.23275 14.9663 8.11637 15 8 15C7.88362 15 7.76725 14.9663 7.66619 14.8989L1.26819 10.6333C1.26669 10.6324 1.26528 10.6313 1.26175 10.6286C1.25704 10.6249 1.24854 10.6183 1.231 10.6053C1.21919 10.5961 1.20781 10.5865 1.17281 10.5528C1.16231 10.5428 1.15225 10.5314 1.12206 10.4942C1.11331 10.4824 1.105 10.4706 1.07962 10.4303C1.07219 10.4167 1.06562 10.4036 1.04594 10.3612C1.03981 10.3463 1.035 10.3314 1.021 10.2877C1.01663 10.2711 1.01356 10.2544 1.00569 10.2116C1.00219 10.1853 1 10.1591 1 10.1328V5.86719C1 5.8405 1.00219 5.81425 1.0105 5.76263C1.01356 5.74556 1.01663 5.7285 1.03019 5.683C1.035 5.66813 1.03981 5.65369 1.05906 5.60994C1.06562 5.59594 1.07219 5.58281 1.09713 5.54213C1.105 5.52944 1.11331 5.51719 1.14306 5.47956C1.15225 5.46819 1.16231 5.45725 1.19687 5.42356C1.20781 5.4135 1.21919 5.40387 1.231 5.39469C1.23975 5.38769 1.2485 5.38069 1.26819 5.36669L7.66619 1.10106C7.86875 0.966313 8.13169 0.966313 8.33381 1.10106L14.7323 5.36669C14.7337 5.36762 14.7352 5.36872 14.7387 5.37144C14.7434 5.37509 14.7519 5.38166 14.7694 5.39469C14.7808 5.40387 14.7922 5.4135 14.8272 5.44675C14.8377 5.45725 14.8477 5.46819 14.8779 5.50537C14.8871 5.51719 14.8954 5.52944 14.9204 5.57012C14.9283 5.58281 14.9348 5.59594 14.9545 5.63925ZM13.3152 5.86806L8.60156 2.72593V5.53162L11.2099 7.27637L13.3152 5.86806ZM5.87244 8L8 9.42318L10.128 8L8 6.57681L5.87244 8ZM8.60156 13.2741V10.4684L11.2099 8.72406L13.3152 10.1319L8.60156 13.2741ZM12.2919 8L13.7969 9.00668V6.99331L12.2919 8ZM7.39844 13.2741L2.68481 10.1319L4.7905 8.72406L7.39844 10.4684V13.2741ZM3.70856 8L2.20312 6.99331V9.00668L3.70856 8ZM7.39844 2.72593V5.53162L4.7905 7.27637L2.68481 5.86806L7.39844 2.72593Z&quot;
                />
              `"
            />
            At first, I started with a tool that could directly interpret the SVGs. But SVGs are
            just code, which implied that anyone could just get the logo from the source code. And
            when the SVG became more complex (e.g. textures) the performance ended up taking a hit
            as well. This made me look more into canvas, which has some benefits (no code in the
            source) and is a lot more performant. But it doesn’t come without its flaws: It is more
            complex to use, not all SVG features work out of the box in canvas (e.g. text path), and
            importing or exporting an SVG will need custom logic.
            <br />
            <br />
            <b>Konva.js</b>
            <br />
            Meet Konva, it doesn’t solve the text path issue fully (not working with custom fonts),
            but it does come with a lot of useful tools. We get transform tools, can easily import
            SVGs (exporting still needs custom logic), and much more.
            <br />
            <br />
            <b>CSS Transforms</b>
            <br />
            When you apply transform: scale(.8) translateX(20%) it scales to 0.8, and from those new
            dimensions, it will translate 20%. This is not how Konva works. Konva objects allow one
            transform property, and the transforms are always calculated on the initial dimensions.
            To tackle this I build some logic that can transpile chained CSS into the actual
            transform results.
            <br />
            <br />
            A proof of concept can be found here:
            <NuxtLink
              class="text-blue-light underline"
              target="_blank"
              href="https://codepen.io/snoo/pen/OJjgXPe"
            >
              Codepen
            </NuxtLink>
          </template>
        </ShowcaseParagraph>
      </template>
    </ShowcaseSection>
    <ShowcaseFooter company="freelance" />
  </div>
</template>
