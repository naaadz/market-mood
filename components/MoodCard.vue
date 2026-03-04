<template>
  <div class="pod-wrap" :class="mood">
    <!-- Curve overlay -->
    <div class="pod-curve" aria-hidden="true">
      <div class="pod-curve-fill"></div>
      <svg
        class="pod-curve-stroke"
        viewBox="0 0 1161.5 682.05"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fill="none"
          stroke="var(--color-stroke, var(--color-from))"
          stroke-width="4"
          d="M1161.49,224.18c.03-19.99,0-44.07-.02-62.39-.41-14.21.52-30.86-8.59-37.4-7.06-5.08-16.48-4.4-24.54-2.41-17.97,4.44-34.38,16.41-52.96,6.61-15.79-8.33-27.16-20.57-39.08-33.41-7.78-8.37-17.28-12.92-28.59-9.16s-20.23,12.71-31.75,16.06c-60.53,17.62-57.51-56.53-85.7-87.44-56.1-61.5-93.22,91.56-148.46,73.92-21.37-6.82-28.13-27.35-36.3-45.56-25.83-57.55-62.56-6.81-77.4,26.98-3.9,8.88-8.35,17.78-12.81,25.78-18.54,34.66-49.58,22.9-78.12,9.46-20.72-9.75-29.51-1.23-43.84,13.8-11.55,12.12-21.79,20.56-39.28,20.02-21.21-.66-37.21-7.69-53.84,9.3-11.9,12.15-17.18,29.35-28.95,41.64-10.94,11.42-26.77,29.26-44.1,26.36-19.48-3.27-32.14-26.24-40.13-41.97-8.36-16.45-20.39-39.57-42.96-33.85-29.76,7.55-39.51,62.07-53.84,84.84-11.43,18.15-32.47,20.27-50.41,15.36-13.87-4.03-26.59-18.05-41.11-17.61-14.24-.12-21.88,15.58-32.69,25.64-2.53,2.46-5.19,4.72-8,6.65-20.41,14.69-37.69.82-49.32,7.34l-.06.04C-.49,269.34.44,285.98.03,300.19c-.01,18.32-.05,42.4-.02,62.39-.02,14.06.02,255.4,0,269.21.12,12.46-.66,32.4,4.37,39.54,6.15,9.48,18.25,9.34,28.12,10.08,9.82.44,22.56.1,31.42.23,171.89-.67,608.73,1.1,771.55-.33,0,.16.01.32.02.48,86.59-.09,163.81-.11,216.32.09,8.86-.13,67.36.44,77.18,0,9.87-.74,21.97-.6,28.12-10.08,5.03-7.14,4.25-27.08,4.37-39.54-.02-13.81.02-394.03,0-408.09Z"
        />
      </svg>
    </div>

    <div class="card">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mood: 'bullish' | 'mixed' | 'mixed-2' | 'bearish';
}>();
</script>

<style scoped>
/* ================================
   Pod wrapper
   ================================ */
.pod-wrap {
  position: relative;
  width: var(--card-w);
  height: 100%;
}

.pod-curve {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.pod-curve-stroke {
  position: absolute;
  width: 100%;
  height: auto;
  transform: translate(
      calc(var(--curve-x, -0.1) * 100%),
      calc(var(--curve-y, -0.2) * 100%)
    )
    scale(var(--curve-scale, 1.6));
  transform-origin: top left;
}

.pod-curve-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    159deg,
    var(--curve-fill-color) 0%,
    color-mix(in srgb, var(--curve-fill-color) 70%, transparent) 0%,
    color-mix(in srgb, var(--curve-fill-color) 40%, transparent) 47%,
    color-mix(in srgb, var(--curve-fill-color) 10%, transparent) 66%,
    transparent 76%
  );
  mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1161.5 682.05'><path d='M1161.49,224.18c.03-19.99,0-44.07-.02-62.39-.41-14.21.52-30.86-8.59-37.4-7.06-5.08-16.48-4.4-24.54-2.41-17.97,4.44-34.38,16.41-52.96,6.61-15.79-8.33-27.16-20.57-39.08-33.41-7.78-8.37-17.28-12.92-28.59-9.16s-20.23,12.71-31.75,16.06c-60.53,17.62-57.51-56.53-85.7-87.44-56.1-61.5-93.22,91.56-148.46,73.92-21.37-6.82-28.13-27.35-36.3-45.56-25.83-57.55-62.56-6.81-77.4,26.98-3.9,8.88-8.35,17.78-12.81,25.78-18.54,34.66-49.58,22.9-78.12,9.46-20.72-9.75-29.51-1.23-43.84,13.8-11.55,12.12-21.79,20.56-39.28,20.02-21.21-.66-37.21-7.69-53.84,9.3-11.9,12.15-17.18,29.35-28.95,41.64-10.94,11.42-26.77,29.26-44.1,26.36-19.48-3.27-32.14-26.24-40.13-41.97-8.36-16.45-20.39-39.57-42.96-33.85-29.76,7.55-39.51,62.07-53.84,84.84-11.43,18.15-32.47,20.27-50.41,15.36-13.87-4.03-26.59-18.05-41.11-17.61-14.24-.12-21.88,15.58-32.69,25.64-2.53,2.46-5.19,4.72-8,6.65-20.41,14.69-37.69.82-49.32,7.34l-.06.04C-.49,269.34.44,285.98.03,300.19c-.01,18.32-.05,42.4-.02,62.39-.02,14.06.02,255.4,0,269.21.12,12.46-.66,32.4,4.37,39.54,6.15,9.48,18.25,9.34,28.12,10.08,9.82.44,22.56.1,31.42.23,171.89-.67,608.73,1.1,771.55-.33,0,.16.01.32.02.48,86.59-.09,163.81-.11,216.32.09,8.86-.13,67.36.44,77.18,0,9.87-.74,21.97-.6,28.12-10.08,5.03-7.14,4.25-27.08,4.37-39.54-.02-13.81.02-394.03,0-408.09Z'/></svg>")
    calc(var(--curve-x, 0) * var(--card-w))
    calc(var(--curve-y, 0) * 0.5873 * var(--card-w)) / var(--mask-size, 300%)
    auto no-repeat;
}

/* ================================
   Card base
   ================================ */
.card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 0 center;
  opacity: 0.5;
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

/* ================================
   Bullish — green → blue
   Left: --color-green at full opacity
   Right: --color-blue at 75% opacity, stop extends past card edge
   ================================ */
.pod-wrap.bullish {
  --color-from: var(--color-green);
  --color-to: var(--color-blue);
  --color-stroke: var(--color-green);
  --curve-fill-color: var(--color-green);
  --curve-x: -0.02;
  --curve-y: 0.11;
  --curve-scale: 3.6;
  --mask-size: 360%;
}

.pod-wrap.bullish .card {
  background-image: linear-gradient(
    to right,
    var(--color-green) 0%,
    color-mix(in srgb, var(--color-blue) 75%, transparent) 120%
  );
}

/* ================================
   Mixed — blue → purple → pink
   Left: --color-blue at full opacity
   Mid: --color-purple at 90% opacity
   Right: --color-pink at 80% opacity, stop extends past card edge
   ================================ */
.pod-wrap.mixed {
  --color-from: var(--color-blue);
  --color-to: var(--color-purple);
  --color-stroke: #72d9f3;
  --curve-fill-color: #72d9f3;
  --curve-x: -0.44;
  --curve-y: 0.6;
  --curve-scale: 3;
  --mask-size: 300%;
}

.pod-wrap.mixed .card {
  background-image: linear-gradient(
    to right,
    var(--color-blue) 0%,
    var(--color-purple) 100%
  );
}

/* ================================
   Mixed-2 — purple → pink
   ================================ */
.pod-wrap.mixed-2 {
  --color-from: var(--color-purple);
  --color-to: var(--color-pink);
  --color-stroke: var(--color-pink);
  --curve-fill-color: var(--color-pink);
  --curve-x: -0.44;
  --curve-y: 0.6;
  --curve-scale: 3;
  --mask-size: 300%;
}

.pod-wrap.mixed-2 .card {
  background-image: linear-gradient(
    to right,
    var(--color-purple) 37%,
    var(--color-pink) 120%
  );
}

/* ================================
   Bearish — pink → orange
   Left: --color-pink at full opacity
   Right: --color-orange at 80% opacity, stop extends past card edge
   ================================ */
.pod-wrap.bearish {
  --color-from: var(--color-pink);
  --color-to: var(--color-orange);
  --color-stroke: var(--color-orange);
  --curve-fill-color: var(--color-orange);
  --curve-x: -1.98;
  --curve-y: 0.75;
  --curve-scale: 3;
  --mask-size: 300%;
}

.pod-wrap.bearish .card {
  background-image: linear-gradient(
    to right,
    var(--color-pink) -50%,
    color-mix(in srgb, var(--color-orange) 75%, transparent) 100%
  );
}
</style>
