<script lang="ts" setup>
const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    property: 'opacity',
    fromValue: 0,
    toValue: 1,
    scrollStart: 0.5,
    scrollEnd: 1
  }
])
</script>

<template>
  <div
    v-if="scrollPosition > 0.5"
    class="font-palanquin font-light text-white leading-[28px] text-[16px]"
    :style="{
      opacity: `${animationState.opacity}`
    }"
  >
    <p>
      <Text size="md">
        I am a Senior front-end developer from Holland. I'm unapologetically a web generalist, but I
        particularly love diving deep into front-end development and UX design.
      </Text>
    </p>
    <br />
    <p>
      <Text size="md">
        I develop from a strategic perspective of telling stories through visual and interactive
        systems. I find great joy in pressing buttons, but I also take great responsibility for how
        I press them.
      </Text>
    </p>
  </div>
</template>
