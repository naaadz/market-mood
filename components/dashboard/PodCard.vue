<template>
  <div class="pod-wrap" :class="[mood, `pos-${position}`, `of-${groupSize}`]">
    <!-- Curve overlay — sibling to .card so opacity changes on .card don't affect it -->
    <div class="pod-curve" aria-hidden="true">
      <!-- Fill: CSS gradient clipped to the curve shape via mask -->
      <div class="pod-curve-fill"></div>
      <!-- Stroke: SVG for the visible border line only -->
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
const props = defineProps<{
  mood: 'bullish' | 'mixed' | 'bearish';
  position: number;
  groupSize: number;
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

/* Stroke transform — tune --curve-x/y/scale on .pod-wrap in devtools */
.pod-curve-stroke {
  position: absolute;
  width: 100%;
  height: auto;
  transform: translate(var(--curve-x, -10%), var(--curve-y, -20%))
    scale(var(--curve-scale, 1.6));
  transform-origin: top left;
}
.pod-curve-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    in oklch to bottom right,
    var(--curve-fill-color) 0%,
    oklch(from var(--curve-fill-color) l c h / 0) 65%
  );
  mask: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1161.5 682.05'><path d='M1161.49,224.18c.03-19.99,0-44.07-.02-62.39-.41-14.21.52-30.86-8.59-37.4-7.06-5.08-16.48-4.4-24.54-2.41-17.97,4.44-34.38,16.41-52.96,6.61-15.79-8.33-27.16-20.57-39.08-33.41-7.78-8.37-17.28-12.92-28.59-9.16s-20.23,12.71-31.75,16.06c-60.53,17.62-57.51-56.53-85.7-87.44-56.1-61.5-93.22,91.56-148.46,73.92-21.37-6.82-28.13-27.35-36.3-45.56-25.83-57.55-62.56-6.81-77.4,26.98-3.9,8.88-8.35,17.78-12.81,25.78-18.54,34.66-49.58,22.9-78.12,9.46-20.72-9.75-29.51-1.23-43.84,13.8-11.55,12.12-21.79,20.56-39.28,20.02-21.21-.66-37.21-7.69-53.84,9.3-11.9,12.15-17.18,29.35-28.95,41.64-10.94,11.42-26.77,29.26-44.1,26.36-19.48-3.27-32.14-26.24-40.13-41.97-8.36-16.45-20.39-39.57-42.96-33.85-29.76,7.55-39.51,62.07-53.84,84.84-11.43,18.15-32.47,20.27-50.41,15.36-13.87-4.03-26.59-18.05-41.11-17.61-14.24-.12-21.88,15.58-32.69,25.64-2.53,2.46-5.19,4.72-8,6.65-20.41,14.69-37.69.82-49.32,7.34l-.06.04C-.49,269.34.44,285.98.03,300.19c-.01,18.32-.05,42.4-.02,62.39-.02,14.06.02,255.4,0,269.21.12,12.46-.66,32.4,4.37,39.54,6.15,9.48,18.25,9.34,28.12,10.08,9.82.44,22.56.1,31.42.23,171.89-.67,608.73,1.1,771.55-.33,0,.16.01.32.02.48,86.59-.09,163.81-.11,216.32.09,8.86-.13,67.36.44,77.18,0,9.87-.74,21.97-.6,28.12-10.08,5.03-7.14,4.25-27.08,4.37-39.54-.02-13.81.02-394.03,0-408.09Z'/></svg>")
    var(--mask-x, 0px) var(--mask-y, 0px) / var(--mask-size, 300%) auto
    no-repeat;
}

/* ================================
   Mood — color vars + curve position
   All tweakable in devtools on .pod-wrap
   ================================ */
.pod-wrap.bullish {
  --color-from: var(--color-green);
  --color-to: var(--color-blue);
  --color-stroke: var(--color-green);
  --curve-fill-color: var(--color-green);
  /* Stroke transform */
  --curve-x: -2%;
  --curve-y: 11%;
  --curve-scale: 3.6;
  /* Fill mask: translate(-2%,11%) scale(3.6) on 1161.5:682.05 element */
  --mask-x: calc(-0.02 * var(--card-w));
  --mask-y: calc(0.0646 * var(--card-w));
  --mask-size: 360%;
}

.pod-wrap.mixed {
  --color-from: var(--color-blue);
  --color-mid: var(--color-purple);
  --color-to: var(--color-pink);
  --color-stroke: oklch(from var(--color-blue) calc(l + 0.25) c h);
  --curve-fill-color: var(--color-blue);
  /* Stroke transform */
  --curve-x: -44%;
  --curve-y: 60%;
  --curve-scale: 3;
  /* Fill mask: translate(-44%,60%) scale(3) on 1161.5:682.05 element */
  --mask-x: calc(-0.44 * var(--card-w));
  --mask-y: calc(0.3524 * var(--card-w));
  --mask-size: 300%;
}

.pod-wrap.bearish {
  --color-from: var(--color-pink);
  --color-to: var(--color-orange);
  --color-stroke: var(--color-orange);
  --curve-fill-color: var(--color-orange);
  /* Stroke transform */
  --curve-x: -198%;
  --curve-y: 48%;
  --curve-scale: 3;
  /* Fill mask: translate(-198%,48%) scale(3) on 1161.5:682.05 element */
  --mask-x: calc(-1.98 * var(--card-w));
  --mask-y: calc(0.2819 * var(--card-w));
  --mask-size: 300%;
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
  opacity: 0.7;
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.card :slotted(*) {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: oklch(100% 0 0 / 0.85);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ================================
   Mood — set color vars on pod-wrap
   (inherited by .card and .pod-curve)
   ================================ */
.pod-wrap.bullish {
  --color-from: var(--color-green);
  --color-to: var(--color-blue);
}

.pod-wrap.mixed {
  --color-from: var(--color-blue);
  --color-mid: var(--color-purple);
  --color-to: var(--color-pink);
}

.pod-wrap.bearish {
  --color-from: var(--color-pink);
  --color-to: var(--color-orange);
}

/* ================================
   Group sizes — gradient spans full group width
   More cards = hold --color-from longer
   ================================ */
.pod-wrap.of-1 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-to) 100%
  );
  background-size: var(--card-w) 100%;
}

.pod-wrap.of-2 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-from) 33%,
    var(--color-to) 100%
  );
  background-size: calc(2 * (var(--card-w) + var(--card-gap)) - var(--card-gap))
    100%;
}

.pod-wrap.of-3 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-from) 50%,
    var(--color-to) 100%
  );
  background-size: calc(3 * (var(--card-w) + var(--card-gap)) - var(--card-gap))
    100%;
}

.pod-wrap.of-4 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-from) 60%,
    var(--color-to) 100%
  );
  background-size: calc(4 * (var(--card-w) + var(--card-gap)) - var(--card-gap))
    100%;
}

.pod-wrap.of-5 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-from) 70%,
    var(--color-to) 100%
  );
  background-size: calc(5 * (var(--card-w) + var(--card-gap)) - var(--card-gap))
    100%;
}

/* ================================
   Mixed overrides — 3-stop gradient
   ================================ */
.pod-wrap.mixed.of-3 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-mid) 50%,
    var(--color-to) 100%
  );
}

.pod-wrap.mixed.of-4 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-mid) 55%,
    var(--color-to) 100%
  );
}

.pod-wrap.mixed.of-5 .card {
  background-image: linear-gradient(
    to right in oklch,
    var(--color-from) 0%,
    var(--color-mid) 60%,
    var(--color-to) 100%
  );
}

/* ================================
   Card positions — bg-image offset
   ================================ */
.pod-wrap.pos-1 .card {
  background-position: 0px center;
}
.pod-wrap.pos-2 .card {
  background-position: calc(-1 * (var(--card-w) + var(--card-gap))) center;
}
.pod-wrap.pos-3 .card {
  background-position: calc(-2 * (var(--card-w) + var(--card-gap))) center;
}
.pod-wrap.pos-4 .card {
  background-position: calc(-3 * (var(--card-w) + var(--card-gap))) center;
}
.pod-wrap.pos-5 .card {
  background-position: calc(-4 * (var(--card-w) + var(--card-gap))) center;
}
</style>
