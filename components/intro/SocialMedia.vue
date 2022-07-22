<script lang="ts" setup>
import { IconType } from '~~/types/icons.types'
const { scrollPosition } = useScroller()

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
    v-if="scrollPosition <= 0.5"
    class="font-merriweather text-white text-[18px] leading-[21px] h-[50%]"
  >
    <div
      :class="`
      before:inline-block before:align-middle before:h-full h-full
    `"
    >
      <ul class="space-y-[20px] inline-block align-middle">
        <li v-for="({ link, icon, text }, index) in socials" :key="`intro-social-list-${index}`">
          <a
            :href="link"
            target="_blank"
            :class="`
          text-white text-[12px] font-palanquin font-normal
        `"
          >
            <Text size="sm">
              <Icon :icon="icon" class="translate-y-[3px] scale-[1.2] mr-[10px]" />
              {{ text }}
            </Text>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
