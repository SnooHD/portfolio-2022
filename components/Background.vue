<script lang="ts" setup>
const { introTextDone } = useIntroTransition()
const { scrollPosition } = useScroller()
const { animationState } = useAnimationScroller([
  {
    fromValue: 0.2,
    toValue: 0,
    scrollStart: 1.8,
    scrollEnd: 2,
    property: 'opacity'
  }
])

const componentReady = useState('background-component-ready', () => false)
onMounted(() => {
  componentReady.value = true
})
</script>

<template>
  <div class="w-full h-full bg-black relative z-0">
    <svg
      viewBox="0 0 1920 1080"
      height="100%"
      width="100%"
      preserveAspectRatio="xMidYMid slice"
      class="overflow-visible scale-[1.25] min-h-[800px] max-w-[1400px] absolute left-1/2 translate-x-[-50%]"
    >
      <defs>
        <g id="overlay-gradients">
          <mask id="bg-flare-mask" maskUnits="userSpaceOnUse">
            <rect fill="url(#bg-mask-gradient)" width="100%" height="100%" />
          </mask>
          <radialGradient id="bg-mask-gradient" gradientUnits="userSpaceOnUse" r="100%">
            <stop stop-color="#d9d9d9" />
            <stop offset="1" stop-color="white" />
          </radialGradient>
          <linearGradient
            id="bg-overlay-gradient"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90)"
          >
            <stop offset=".1" stop-color="#111" stop-opacity="0" />
            <stop offset=".5" stop-color="#111" stop-opacity="1" />
            <stop offset="1" stop-color="#111" stop-opacity="1" />
          </linearGradient>
        </g>

        <g id="flare-gradients">
          <radialGradient
            id="bg-flare-0"
            cx="750"
            cy="750"
            r="40%"
            fx="600"
            fy="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#00FFFF" />
            <stop offset="1" stop-color="#00FFFF" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="bg-flare-1"
            cx="1955.9084"
            cy="1849.957"
            r="0.935"
            fx="1955.0236"
            fy="1849.957"
            gradientTransform="matrix(297.638 515.5241 729.0981 -420.945 -1930500.875 -229028.7969)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#FFFF00" />
            <stop offset="1" stop-color="#FFFF00" stop-opacity="0" />
          </radialGradient>
        </g>
      </defs>
      <g id="flares">
        <rect width="100%" height="100%" fill="url(#bg-flare-1)" />
        <rect width="100%" height="100%" fill="url(#bg-flare-0)" />
      </g>
      <g id="overlay" class="translate-x-[-100%] scale-x-[3]" opacity=".99">
        <rect fill="#000" width="100%" height="100%" mask="url(#bg-flare-mask)" />
        <rect width="100%" height="100%" fill="url(#bg-overlay-gradient)" />
      </g>
    </svg>
    <div
      :class="`
        scale-y-[1.5] scale-x-[1.5] relative w-full h-full transition-opacity duration-[2000ms]
        ${componentReady ? 'opacity-[.2]' : 'opacity-0'}
        ${!introTextDone ? 'delay-[800ms]' : ''}
      `"
      :style="{
        opacity: componentReady ? animationState.opacity : undefined
      }"
    >
      <NuxtImg
        src="/images/fog.png"
        class="absolute top-0 left-0 z-10 w-full object-contain min-w-[1920px] animate-fog"
        preset="image"
        :style="{
          animationPlayState: scrollPosition >= 2 ? 'paused' : 'running'
        }"
      />
      <NuxtImg
        src="/images/fog.png"
        class="absolute top-0 left-0 z-10 w-full object-contain min-w-[1920px] animate-fog2"
        preset="image"
        :style="{
          animationPlayState: scrollPosition >= 2 ? 'paused' : 'running'
        }"
      />
    </div>
  </div>
</template>
