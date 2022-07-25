<script lang="ts" setup>
const lastSection = computed<boolean>(() => {
  return false
})

const moveToSection = () => {
  console.log('move')
}

const { scrollPosition } = useScroller()
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
</script>

<template>
  <footer class="flex w-full flex-col py-[15px] justify-between relative z-[99]">
    <div class="flex items-center justify-between">
      <div
        v-if="scrollPosition <= 1.5"
        :style="{
          opacity: animationState['opacity-out'],
          transform: `translateX(-${animationState.translate}%)`
        }"
      >
        <Link href="#next">Contact me</Link>
      </div>
      <Button class="ml-auto w-[40%]">
        <span
          v-if="scrollPosition <= 1.5"
          class="inline-block"
          :style="{
            opacity: animationState['opacity-out'],
            transform: `translateY(-${animationState.translate}px)`
          }"
        >
          View my work
        </span>
        <span
          v-if="scrollPosition > 1.5"
          class="inline-block"
          :style="{
            opacity: animationState['opacity-in'],
            transform: `translateY(${animationState.translateY}px)`
          }"
        >
          View showcase
        </span>
      </Button>
    </div>
    <div class="flex justify-center font-palanquin font-light text-gray text-[14px]">
      <span onclick="moveToSection">scroll {{ lastSection ? 'up' : 'down' }}</span>
    </div>
  </footer>
</template>
