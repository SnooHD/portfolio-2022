<script lang="ts" setup>
import { submitForm } from '@formkit/core'

const lastSection = computed<boolean>(() => {
  return false
})

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

const { animationState } = useAnimationScroller([
  {
    property: 'opacity-out-work',
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.1,
    scrollEnd: 1.5
  },
  {
    property: 'opacity-in-showcase',
    fromValue: 0,
    toValue: 1,
    scrollStart: 1.5,
    scrollEnd: 1.9
  },
  {
    property: 'opacity-out-showcase',
    fromValue: 1,
    toValue: 0,
    scrollStart: 2.1,
    scrollEnd: 2.4
  },
  {
    property: 'opacity-in-submit',
    fromValue: 0,
    toValue: 1,
    scrollStart: 2.4,
    scrollEnd: 2.9
  },
  {
    property: 'translate-y-work',
    fromValue: 0,
    toValue: -10,
    scrollStart: 1.1,
    scrollEnd: 1.5
  },
  {
    property: 'translate-y-in-showcase',
    fromValue: 10,
    toValue: 0,
    scrollStart: 1.5,
    scrollEnd: 1.9
  },
  {
    property: 'translate-y-out-showcase',
    fromValue: 0,
    toValue: -10,
    scrollStart: 2.1,
    scrollEnd: 2.5
  },
  {
    property: 'translate-y-submit',
    fromValue: 10,
    toValue: 0,
    scrollStart: 2.5,
    scrollEnd: 2.9
  }
])

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
  <footer class="flex w-full flex-col py-[15px] justify-between relative z-[99]">
    <div class="flex items-center justify-between">
      <VisibilityWrapper
        :hidden="1.5"
        :style="{
          opacity: animationState['opacity-out-work'],
          transform: `translateX(${animationState['translate-y-work']}%)`
        }"
      >
        <Link href="#next" class="text-[16px] xs:text-[18px] md:text-[21px] lg:text-[24px]">
          View my work
        </Link>
      </VisibilityWrapper>
      <VisibilityWrapper id="view-my-work" :show-on-touch="false" :visible="1.5">
        <Button class="ml-auto w-[160px] relative h-[40px] shrink-0" @click.stop="onButtonClick">
          <VisibilityWrapper
            id="show-case"
            :visible="1.5"
            :hidden="2.5"
            :show-on-touch="false"
            :style="{
              opacity:
                animationState['opacity-in-showcase'] === 1
                  ? animationState['opacity-out-showcase']
                  : animationState['opacity-in-showcase'],
              transform: `translateY(${
                animationState['translate-y-in-showcase'] === 0
                  ? animationState['translate-y-out-showcase']
                  : animationState['translate-y-in-showcase']
              }px)`
            }"
          >
            <span
              :class="`
              flex flex-col transition-transform duration-400
              ${workMenuIsOpen() ? 'translate-y-[0%]' : 'translate-y-[-50%]'}
            `"
              :aria-expanded="workMenuIsOpen()"
              aria-controls="work-item"
            >
              <span
                :class="`
                transition-opacity duration-200
                ${workMenuIsOpen() ? 'opacity-100 delay-100' : 'opacity-0'}
              `"
              >
                Close showcase
              </span>
              <span
                :class="`
                transition-opacity duration-200
                ${workMenuIsOpen() ? 'opacity-0' : 'opacity-100 delay-100'}
              `"
              >
                View showcase
              </span>
            </span>
          </VisibilityWrapper>
          <VisibilityWrapper
            id="submit-form"
            :show-on-touch="false"
            :visible="2.5"
            :style="{
              opacity: animationState['opacity-in-submit'],
              transform: `translateY(${animationState['translate-y-submit']}px)`
            }"
          >
            Submit
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
