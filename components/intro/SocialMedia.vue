<script lang="ts" setup>
import { IconType } from '~/types/icons.types'

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
    icon: 'Email',
    text: 'Email'
  },
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
  <ul
    class="space-y-[20px] md:space-y-[28px] lg:space-y-[36px] font-public-sans text-white text-[24px] flex flex-col justify-center"
    :style="{
      opacity: animationState.opacity
    }"
  >
    <li v-for="({ link, icon, text }, index) in socials" :key="`intro-social-list-${index}`">
      <a :href="link" target="_blank" class="group inline-block">
        <Text>
          <Icon
            :icon="icon"
            :class="`
                transition-[color,_transform] duration-400
                translate-y-[3px] scale-[1.4]
                group-hover:scale-[1.5] group-hover:rotate-[2deg] group-hover:text-blue-light
              `"
          />
          <span
            :class="`
                  ml-[15px] md:ml-[25px]
                  after:w-full after:h-[2px] after:bg-white after:scale-x-[0]
                  after:absolute after:left-0 after:bottom-[-1px] after:block after:transition-transform
                  after:duration-400 after:origin-left group-hover:after:scale-x-[1]
                  relative inline-block
              `"
          >
            <span
              class="transition-transform duration-400 inline-block group-hover:translate-y-[-3px] inline-block"
            >
              {{ text }}
            </span>
          </span>
        </Text>
      </a>
    </li>
  </ul>
</template>
