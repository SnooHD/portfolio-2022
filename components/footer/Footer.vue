<script lang="ts" setup>
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
const { scrollPosition } = useScroller()
const { stringToHash, scrollToHash } = useHash()
const { activeState: activeMenuState } = useMenuOverlay('work-item')
const workMenuIsOpen = () => activeMenuState.value === 'work-item'

const { activeState } = useMenuOverlay('work-item')
const openShowCaseMenu = () => {
  const { menuState } = useMenuOverlay('work-item')
  menuState.value = !menuState.value
}

const { isSubmitting, submit, submitSuccess, submitError } = useFormSubmit()

const getNextSectionHash = () =>
  scrollPosition.value >= 3
    ? stringToHash(sections[0])
    : stringToHash(sections[currentMenuIndex.value + 1])
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
            @click.stop="() => openShowCaseMenu()"
          >
            <span
              :aria-expanded="workMenuIsOpen()"
              :aria-controls="activeState === 'work-item' ? 'work-item' : undefined"
            >
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
            @click.stop="() => submit()"
          >
            <span
              :class="`
                transition-opacity duration-300 absolute
                ${!isSubmitting && !submitSuccess && !submitError ? 'opacity-100' : 'opacity-0'}
              `"
            >
              Send message
            </span>
            <div
              :class="`
                transition-opacity duration-100 absolute flex items-center
                ${isSubmitting ? 'opacity-100' : 'opacity-0'}
              `"
            >
              <span>Sending</span>
              <div
                :class="`
                  animate-spin
                  ml-[.5em] w-[1em] h-[1em] rounded-full border-[2px] border-white/30 border-t-white
                `"
              />
            </div>
            <div
              :class="`
                transition-opacity duration-100 absolute
                ${submitError ? 'opacity-100' : 'opacity-0'}
              `"
            >
              <span>Error</span>
              <Icon
                icon="Warning"
                :class="`
                  text-red-600
                  ml-[.5em] text-[16px] translate-y-[2px]
                `"
              />
            </div>
            <div
              :class="`
                transition-opacity duration-100 absolute
                ${submitSuccess ? 'opacity-100' : 'opacity-0'}
              `"
            >
              <span>Message sent</span>
              <Icon
                icon="Check"
                :class="`
                  ml-[.5em] text-[14px] translate-y-[1px]
                `"
              />
            </div>
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
