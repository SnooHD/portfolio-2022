<script lang="ts" setup>
const lastSection = computed<boolean>(() => {
  return false
})

const { activeState: activeMenuState } = useMenuOverlay('work-item')
console.log(activeMenuState.value)
const workMenuIsOpen = () => activeMenuState.value === 'work-item'

const moveToSection = () => {
  console.log('move')
}

const openShowCaseMenu = () => {
  const { menuState } = useMenuOverlay('work-item')
  console.log('sesam')
  menuState.value = !menuState.value
}

const { animationState } = useAnimationScroller([
  {
    property: 'opacity-out',
    fromValue: 1,
    toValue: 0,
    scrollStart: 1.1,
    scrollEnd: 1.5
  },
  {
    property: 'opacity-in',
    fromValue: 0,
    toValue: 1,
    scrollStart: 1.5,
    scrollEnd: 1.9
  },
  {
    property: 'translate',
    fromValue: 0,
    toValue: 10,
    scrollStart: 1.1,
    scrollEnd: 1.5
  },
  {
    property: 'translateY',
    fromValue: 10,
    toValue: 0,
    scrollStart: 1.5,
    scrollEnd: 1.9
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
          opacity: animationState['opacity-out'],
          transform: `translateX(-${animationState.translate}%)`
        }"
      >
        <Link href="#next">Contact me</Link>
      </VisibilityWrapper>
      <Button class="ml-auto w-[160px] relative h-[40px] shrink-0" @click.stop="onButtonClick">
        <VisibilityWrapper
          id="view-my-work"
          :show-on-touch="false"
          :hidden="1.5"
          :style="{
            opacity: animationState['opacity-out'],
            transform: `translateY(-${animationState.translate}px)`
          }"
        >
          View my work
        </VisibilityWrapper>
        <VisibilityWrapper
          id="show-case"
          :visible="1.5"
          :show-on-touch="false"
          :style="{
            opacity: animationState['opacity-in'],
            transform: `translateY(${animationState.translateY}px)`
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
      </Button>
    </div>
    <div
      onclick="moveToSection"
      class="flex justify-center font-palanquin font-light text-gray text-[14px]"
    >
      <span>scroll {{ lastSection ? 'up' : 'down' }}</span>
    </div>
  </footer>
</template>
