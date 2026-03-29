<template>
  <div
    ref="wrapRef"
    class="tickers-wrap"
    :class="{ overflowing: isOverflowing, hovering: isHovering }"
  >
    <div ref="trackRef" class="tickers-track">
      <span
        v-for="ticker in tickers"
        :key="ticker.ticker"
        class="ticker-item flex gap-1"
      >
        {{ ticker.ticker
        }}<span class="ticker-caret" :class="ticker.sentiment">{{
          ticker.sentiment === 'bearish'
            ? '▼'
            : ticker.sentiment === 'mixed'
              ? '—'
              : '▲'
        }}</span>
      </span>
      <span
        v-for="ticker in tickers"
        :key="`dup-${ticker.ticker}`"
        class="ticker-item flex gap-1"
        aria-hidden="true"
      >
        {{ ticker.ticker
        }}<span class="ticker-caret" :class="ticker.sentiment">{{
          ticker.sentiment === 'bearish'
            ? '▼'
            : ticker.sentiment === 'mixed'
              ? '—'
              : '▲'
        }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import type { TickerSentiment } from '~/types/market';

const props = defineProps<{
  tickers: TickerSentiment[];
  hovering?: boolean;
}>();

const wrapRef = useTemplateRef('wrapRef');
const trackRef = useTemplateRef('trackRef');

const isOverflowing = ref(false);
const isHovering = computed(() => props.hovering ?? false);

useResizeObserver(wrapRef, () => {
  const wrap = wrapRef.value;
  const track = trackRef.value;
  if (wrap && track) {
    // track contains duplicated items so scrollWidth is 2x actual content;
    // overflow exists when half the track width exceeds the container
    isOverflowing.value = track.scrollWidth / 2 > wrap.clientWidth;
  }
});
</script>

<style scoped>
.tickers-wrap {
  overflow: hidden;
  width: 100%;
  --fade-left: black;
  --fade-right: black;
  mask-image: linear-gradient(
    to right,
    var(--fade-left) 0%,
    black 8%,
    black 80%,
    var(--fade-right) 100%
  );
}

/* No overflow: no mask at all */
.tickers-wrap:not(.overflowing) {
  --fade-left: black;
  --fade-right: black;
  mask-image: none;
}

/* Overflowing, not yet hovering: only right fade visible */
.tickers-wrap.overflowing:not(.hovering) {
  --fade-left: black;
  --fade-right: transparent;
}

/* Overflowing + hovering: both fades visible */
.tickers-wrap.overflowing.hovering {
  --fade-left: transparent;
  --fade-right: transparent;
}

.tickers-track {
  display: flex;
  gap: 0.5rem;
  width: max-content;
}

.tickers-wrap.overflowing.hovering .tickers-track {
  animation: ticker-scroll 5s linear infinite;
}

@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
