<script lang="ts" setup>
import { submitForm } from '@formkit/core'

const lastSection = computed<boolean>(() => {
  return false
})

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
    scrollStart: 2.8,
    scrollEnd: 3,
    property: 'opacity-out-showcase'
  },
  {
    fromValue: 0,
    toValue: -25,
    scrollStart: 2.8,
    scrollEnd: 3,
    property: 'translate-y-out-showcase'
  },
  {
    fromValue: 0,
    toValue: 1,
    scrollStart: 2.8,
    scrollEnd: 3,
    property: 'opacity-in-submit'
  },
  {
    fromValue: 25,
    toValue: 0,
    scrollStart: 2.8,
    scrollEnd: 3,
    property: 'translate-y-submit'
  }
])

const { activeState: activeMenuState } = useMenuOverlay('work-item')
const workMenuIsOpen = () => activeMenuState.value === 'work-item'

const moveToSection = () => {
  console.log('move')
}

const openShowCaseMenu = () => {
  const { menuState } = useMenuOverlay('work-item')
  menuState.value = !menuState.value
}

const onSubmitForm = () => {
  submitForm('contact-form')
}

/**
 * Depending on the active state of the button, different actions need to be triggered
 * To make sure the whole button is clickable, we will handle the cases from the buttons onclick event
 * An `id` has been added to the text element to help us differentiate between them
 */
const onButtonClick = (e: MouseEvent) => {
  const currentTarget = e.currentTarget as HTMLButtonElement
  const actionTarget = currentTarget.querySelector('[id]')

  switch (actionTarget.id) {
    case 'show-case':
      openShowCaseMenu()
      break
    case 'submit-form':
      onSubmitForm()
      break
    case 'view-my-work':
      // code block
      break
  }
}
</script>

<template>
  <footer class="flex w-full flex-col py-[15px] justify-between">
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
        <LinkWithArrow href="#next" class="text-[18px] md:text-[21px] lg:text-[25px]">
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
        <Button class="ml-auto w-[180px] relative h-[50px] shrink-0" @click.stop="onButtonClick">
          <VisibilityWrapper
            id="show-case"
            :visible="2"
            :hidden="3"
            class="duration-300 transition-[opacity,_transform]"
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
            class="duration-300 transition-[opacity,_transform] absolute left-0 top-0 w-full text-center h-full flex items-center justify-center"
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
    <div
      onclick="moveToSection"
      class="flex justify-center font-public-sans font-light text-gray text-[14px] md:text-[16px] lg:text-[18px]"
    >
      <span>scroll {{ lastSection ? 'up' : 'down' }}</span>
    </div>
  </footer>
</template>
