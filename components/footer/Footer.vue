<script lang="ts" setup>
import { submitForm } from '@formkit/core'

const { animationState } = useAnimationScroller([
  {
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'opacity-out-work'
  },
  {
    fromValue: 0,
    toValue: -20,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'translate-y-work'
  },
  {
    fromValue: 0,
    toValue: 1,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'opacity-in-footer-button'
  },
  {
    fromValue: 1,
    toValue: 0,
    scrollStart: 2.99,
    scrollEnd: 3,
    property: 'opacity-out-showcase'
  },
  {
    fromValue: 0,
    toValue: -25,
    scrollStart: 2.99,
    scrollEnd: 3,
    property: 'translate-y-out-showcase'
  },
  {
    fromValue: 0,
    toValue: 1,
    scrollStart: 2.99,
    scrollEnd: 3,
    property: 'opacity-in-submit'
  },
  {
    fromValue: 25,
    toValue: 0,
    scrollStart: 2.99,
    scrollEnd: 3,
    property: 'translate-y-submit'
  }
])

const { currentMenuIndex } = useMenu()
const { scrollToSection, scrollPosition } = useScroller()
const { stringToHash, scrollToHash } = useHash()
const { activeState: activeMenuState } = useMenuOverlay('work-item')
const workMenuIsOpen = () => activeMenuState.value === 'work-item'

const openShowCaseMenu = () => {
  const { menuState } = useMenuOverlay('work-item')
  menuState.value = !menuState.value
}

const onSubmitForm = () => {
  submitForm('contact-form')
}

const getNextSectionHash = () =>
  scrollPosition.value >= 3
    ? stringToHash(sections[0])
    : stringToHash(sections[currentMenuIndex.value + 1])

/**
 * Depending on the active state of the button, different actions need to be triggered
 * To make sure the whole button is clickable, we will handle the cases from the buttons onclick event
 * An `id` has been added to the text element to help us differentiate between them
 */
const onButtonClick = (e: MouseEvent) => {
  const currentTarget = e.currentTarget as HTMLButtonElement
  const actionTarget = currentTarget.querySelector('[id]')

  switch (actionTarget?.id) {
    case 'show-case':
      openShowCaseMenu()
      break
    case 'submit-form':
      onSubmitForm()
      break
    case 'view-my-work':
      scrollToSection('my-work')
      break
  }
}
</script>

<template>
  <footer class="flex w-full h-full flex-col pt-[15px]">
    <div class="flex items-center justify-between">
      <VisibilityWrapper
        id="footer-view-my-work"
        :visible="0"
        :hidden="2"
        class="duration-300 transition-[opacity,_transform]"
        :style="{
          opacity: animationState['opacity-out-work'],
          transform: `translateX(${animationState['translate-y-work']}px)`
        }"
      >
        <LinkWithArrow href="#my-work" class="text-[18px] md:text-[21px] lg:text-[25px]">
          View my work
        </LinkWithArrow>
      </VisibilityWrapper>
      <VisibilityWrapper
        id="view-showcase"
        :visible="2"
        class="justify-self-end !w-auto ml-auto duration-300 transition-opacity"
        :style="{
          opacity: animationState['opacity-in-footer-button']
        }"
      >
        <Button
          :class="`
            ml-auto relative shrink-0 w-[154px] h-[36px]
            lg:w-[180px] lg:h-[50px]
          `"
          @click.stop="onButtonClick"
        >
          <VisibilityWrapper
            id="show-case"
            :visible="2"
            :hidden="3"
            :class="`
              duration-300 transition-[opacity,_transform]
              ${animationState['opacity-out-showcase'] < 1 ? 'pointer-events-none' : ''}
            `"
            :style="{
              opacity: animationState['opacity-out-showcase'],
              transform: `translateY(${animationState['translate-y-out-showcase']}px)`
            }"
          >
            <span :aria-expanded="workMenuIsOpen()" aria-controls="work-item">
              <span
                :class="`
                  transition-opacity duration-200
                  absolute left-0 top-1/2 translate-y-[-50%] w-full text-center
                  ${workMenuIsOpen() ? 'opacity-100 delay-100' : 'opacity-0'}
                `"
              >
                Close showcase
              </span>
              <span
                :class="`
                transition-opacity duration-200
                absolute left-0 top-1/2 translate-y-[-50%] w-full text-center
                ${workMenuIsOpen() ? 'opacity-0' : 'opacity-100 delay-100'}
              `"
              >
                View showcase
              </span>
            </span>
          </VisibilityWrapper>
          <VisibilityWrapper
            id="submit-form"
            :class="`
              duration-300 transition-[opacity,_transform] absolute left-0 top-0 w-full text-center h-full flex items-center justify-center
              ${animationState['opacity-in-submit'] < 1 ? 'pointer-events-none' : ''}
            `"
            :visible="2.5"
            :style="{
              opacity: animationState['opacity-in-submit'],
              transform: `translateY(${animationState['translate-y-submit']}px)`
            }"
          >
            <span>Submit</span>
          </VisibilityWrapper>
        </Button>
      </VisibilityWrapper>
    </div>
    <div class="flex flex-grow justify-center items-center font-public-sans font-light">
      <a
        :class="`
         text-gray text-[14px] md:text-[16px] lg:text-[18px]
          cursor-pointer
        `"
        :href="getNextSectionHash()"
        @click.prevent="() => scrollToHash(getNextSectionHash())"
      >
        <span class="inline-flex items-center group">
          <Icon
            :icon="scrollPosition >= 3 ? 'ArrowDown' : 'ArrowUp'"
            :class="`
              text-[12px] lg:text-[13px] mr-[.6em]
              ${
                scrollPosition >= 3
                  ? 'group-hover:translate-y-[-2px]'
                  : 'group-hover:translate-y-[2px]'
              }
              duration-300 transition-transform
            `"
          />
          scroll {{ scrollPosition >= 3 ? 'to top' : 'down' }}
        </span>
      </a>
    </div>
  </footer>
</template>
