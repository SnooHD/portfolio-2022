<script lang="ts" setup>
import { IconType } from '~/types/icons.types'

interface SocialMediaProps {
  link: string
  text: string
  icon: IconType
}

const socials: SocialMediaProps[] = [
  {
    link: 'mailto:snoohd@gmail.com',
    icon: 'Email',
    text: 'Email'
  },
  {
    link: 'https://www.linkedin.com/in/snoo/',
    icon: 'Linkedin',
    text: 'Linkedin'
  },
  {
    link: 'https://codepen.io/snoo',
    icon: 'Codepen',
    text: 'Codepen'
  },
  {
    link: 'https://codesandbox.io/u/snoohd',
    icon: 'Codesandbox',
    text: 'Codesandbox'
  }
]

const { animationState } = useAnimationScroller([
  {
    fromValue: 1,
    toValue: 0,
    scrollStart: 0,
    scrollEnd: 0.8,
    property: 'opacity-out'
  }
])
</script>

<template>
  <div>
    <ul
      :class="`
        space-y-[20px] md:space-y-[26px] lg:space-y-[32px] font-public-sans text-white
        text-[16px] xs:text-[18px] lg:text-[21px] flex flex-col justify-center
      `"
      :style="{
        opacity: animationState['opacity-out']
      }"
    >
      <li v-for="({ link, icon, text }, index) in socials" :key="`intro-social-list-${index}`">
        <NuxtLink :href="link" target="_blank" class="group inline-block">
          <Text>
            <Icon
              :icon="icon"
              :class="`
                transition-[color,_transform] duration-300
                translate-y-[3px] scale-[1.25]
                group-hover:scale-[1.4] group-hover:rotate-[2deg] group-hover:text-blue-light
              `"
            />
            <span
              :class="`
                  ml-[15px] md:ml-[25px]
                  after:w-full after:h-[2px] after:bg-white after:scale-x-[0]
                  after:absolute after:left-0 after:bottom-[-1px] after:block after:transition-transform
                  after:duration-300 after:origin-left group-hover:after:scale-x-[1]
                  relative inline-block
              `"
            >
              <span
                class="transition-transform duration-300 group-hover:translate-y-[-3px] inline-block"
              >
                {{ text }}
              </span>
            </span>
          </Text>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
