<script lang="ts" setup>
/**
 * Firefox contains a bug where using blur on the background
 * causes artifacts on moving elements that overlap.
 * Disabling the blur for Firefox for now.
 */
const isFirefox = useState('is-firefox', () => false)
onMounted(() => {
  isFirefox.value = !!navigator.userAgent.match(/firefox|fxios/i)
})
</script>

<template>
  <div class="w-full h-full bg-black">
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

        <g v-if="!isFirefox" id="flare-blur">
          <filter id="bg-flare-blur" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </g>

        <g id="flare-gradients">
          <radialGradient
            id="bg-flare-0"
            cx="1959.6866"
            cy="1851.3885"
            r="0.9496"
            fx="1958.7529"
            fy="1851.3885"
            gradientTransform="matrix(231.462 548.433 775.6407 -327.3532 -1888876.25 -467937.1562)"
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
      <g id="flares" :filter="!isFirefox ? 'url(#bg-flare-blur)' : ''">
        <polygon fill="#000" points="1911.9,3188.1 -88,2566.1 738.8,-92.2 2738.7,529.8" />
        <polygon
          fill="url(#bg-flare-1)"
          class="translate-x-[100px] sm:translate-x-[0px]"
          points="855.4,-316.6 1412,647.5 48.6,1434.6 -508,470.6"
        />
        <polygon
          fill="url(#bg-flare-0)"
          points="1245.9,-69.9 1685.4,971.7 212.4,1593.4 -227.2,551.8"
        />
      </g>
      <g id="overlay" class="translate-x-[-100%] scale-x-[3]" opacity=".99">
        <rect fill="#000" width="100%" height="100%" mask="url(#bg-flare-mask)" />
        <rect width="100%" height="100%" fill="url(#bg-overlay-gradient)" />
      </g>
    </svg>
  </div>
</template>
