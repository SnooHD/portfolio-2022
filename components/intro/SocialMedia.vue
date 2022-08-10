<script lang="ts" setup>
import { IconType } from '~/types/icons.types'

const { scrollPosition, isTouching } = useScroller()
const { animationState } = useAnimationScroller([
  {
    property: 'opacity',
    fromValue: 1,
    toValue: 0,
    scrollStart: 0.25,
    scrollEnd: 0.5
  }
])

interface SocialMediaProps {
  link: string
  text: string
  icon: IconType
}

const socials: SocialMediaProps[] = [
  {
    link: '',
    icon: 'Linkedin',
    text: 'Linkedin'
  },
  {
    link: '',
    icon: 'Codepen',
    text: 'Codepen'
  },
  {
    link: '',
    icon: 'Codesandbox',
    text: 'Codesandbox'
  }
]
</script>

<template>
  <div
    v-show="scrollPosition <= 0.5"
    v-if="isTouching || scrollPosition <= 0.5"
    class="font-merriweather text-white text-[18px] leading-[21px] h-[50%] pt-[150px] xs:pt-[120px]"
    :style="{
      opacity: animationState.opacity
    }"
  >
    <ul class="space-y-[20px] lg:space-y-[30px]">
      <li v-for="({ link, icon, text }, index) in socials" :key="`intro-social-list-${index}`">
        <a :href="link" target="_blank" class="group inline-block">
          <Text>
            <Icon
              :icon="icon"
              :class="`
                transition-[color,_transform] duration-400
                translate-y-[3px] scale-[1.2] mr-[10px] lg:mr-[15px]
                group-hover:scale-[1.3] group-hover:rotate-[2deg] group-hover:text-blue-light
              `"
            />
            <div
              :class="`
                after:w-full after:h-[2px] after:bg-white after:scale-x-[0]
                after:absolute after:left-0 after:bottom-[-1px] after:block after:transition-transform
                after:duration-400 after:origin-left group-hover:after:scale-x-[1]
                relative inline-block
              `"
            >
              <div
                class="transition-transform duration-400 inline-block group-hover:translate-y-[-3px]"
              >
                {{ text }}
              </div>
            </div>
          </Text>
        </a>
      </li>
    </ul>
  </div>
</template>
