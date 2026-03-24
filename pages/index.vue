<template>
  <div
    class="flex flex-col gap-10 lg:gap-30 py-10 lg:py-20 min-h-screen justify-center"
  >
    <header
      class="max-w-6xl w-full mx-auto px-10 flex flex-col lg:flex-row justify-between gap-6 items-center"
    >
      <div class="logo flex flex-col gap-2 items-center lg:items-start">
        <h1 class="font-display flex gap-2 text-3xl sm:text-5xl">
          <span>Market</span><span class="font-bold">Mood</span>
        </h1>
        <span
          class="uppercase text-sm sm:text-lg tracking-[.5rem] text-light/70 text-center lg:text-left"
          >Sentiment Sensor</span
        >
      </div>
      <div class="stats flex flex-col sm:flex-row items-center gap-6">
        <div class="flex-col text-right hidden lg:flex">
          <span>Hello, Nadia</span>
          <a
            v-if="lastRefreshed"
            href="/api/report"
            target="_blank"
            rel="noopener noreferrer"
            title="View report"
            class="underline"
            >Last refresh: {{ lastRefreshed }}</a
          >
        </div>
        <button
          class="button secondary"
          :disabled="loading"
          @click="handleRefresh"
        >
          Refresh
        </button>
      </div>
    </header>
    <main>
      <div
        v-if="error"
        class="flex flex-col justify-center items-center gap-4 p-14 text-center border-light border-2 w-[90%] sm:w-1/2 rounded-3xl mx-auto"
      >
        <p class="text-xl">Failed to load market data</p>
        <p class="text-sm">
          {{ error.message || 'An unexpected error occurred.' }}
        </p>
      </div>
      <div v-else class="cards-wrap flex justify-center">
        <TransitionGroup
          tag="div"
          appear
          name="card-fade"
          class="cards flex gap-8 items-center"
        >
          <mood-card
            v-for="(vertical, i) in enrichedVerticals"
            :key="vertical.id"
            :mood="vertical.mood"
            :class="{ alt: vertical.isAlt }"
            :style="{
              '--mood-bg-pos': vertical.bgPos,
              '--delay': `${i * 0.12}s`,
            }"
          >
            <span
              class="badge self-start text-sm rounded-full py-1 px-3 capitalize"
              :data-mood="vertical.mood"
              :data-confidence="vertical.confidence"
            >
              {{ vertical.mood }} {{ vertical.confidence }}%
            </span>
            <span class="tickers flex gap-2">
              <span
                v-for="ticker in vertical.topTickers.slice(0, 3)"
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
            </span>
            <span class="title font-display text-4xl">{{
              vertical.title
            }}</span>

            <span class="factors mt-25 flex flex-col gap-4 flex-1 justify-end">
              <a
                v-for="(article, i) in vertical.news.slice(
                  0,
                  vertical.newsCount
                )"
                :key="i"
                :href="article.url"
                target="_blank"
                rel="noopener noreferrer"
                class="line-clamp-2 underline"
              >
                {{ article.title }}
              </a>
            </span>
          </mood-card>
        </TransitionGroup>
      </div>
    </main>
    <footer
      class="text-light/50 flex flex-col sm:flex-row justify-center items-center gap-2"
    >
      <span>MarketMood 2026</span>
      <span class="hidden sm:block">|</span>
      <a class="underline" href="#">Contact our team</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { verticals, loading, error, refresh } = useMarketVerticals();

const handleRefresh = () => {
  if (!import.meta.dev) {
    alert('Demo only in Production.');
    return;
  }
  refresh();
};

const breakpoints = useBreakpoints({ md: 1380 });
const isMobile = breakpoints.smaller('md');

const MOOD_ORDER = { bullish: 0, mixed: 1, bearish: 2 } as const;

const sortedVerticals = computed(() =>
  [...(verticals.value ?? [])].sort((a, b) => {
    const moodDiff = MOOD_ORDER[a.mood] - MOOD_ORDER[b.mood];
    if (moodDiff !== 0) return moodDiff;
    return b.confidence - a.confidence;
  })
);

const enrichedVerticals = computed(() => {
  const moodCounts: Record<string, number> = {};
  const moodIndex: Record<string, number> = {};
  for (const v of sortedVerticals.value) {
    moodCounts[v.mood] = (moodCounts[v.mood] ?? 0) + 1;
  }

  return sortedVerticals.value.map((vertical, i) => {
    const idx = moodIndex[vertical.mood] ?? 0;
    moodIndex[vertical.mood] = idx + 1;
    const total = moodCounts[vertical.mood];
    const bgPos =
      total === 1 ? '0%' : `${Math.round((idx / (total - 1)) * 100)}%`;

    return {
      ...vertical,
      isAlt: vertical.mood === 'mixed' && idx >= total - (total >= 4 ? 2 : 1),
      bgPos,
      newsCount: isMobile.value ? 3 : i % 2 === 0 ? 3 : 5,
    };
  });
});

const lastRefreshed = computed(() => {
  const ts = verticals.value?.[0]?.lastUpdated;
  if (!ts) return null;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ts));
});

// Manual refresh only - user refreshes once daily
// No auto-refresh to minimize API costs
</script>

<style scoped>
/* ── Card fade-in transition ── */
.card-fade-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: var(--delay, 0s);
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
.card-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* ── Mobile swipe slider ── */
@media (max-width: 1380px) {
  /* .cards-wrap becomes the scroll container so .cards has no overflow
     constraints — the card glows (::before, inset:-10px, blur:20px) can
     then overflow .cards freely and only need to fit inside .cards-wrap's
     vertical padding, avoiding any forced clipping. */
  .cards-wrap {
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    /* Vertical padding > glow visual spread (inset:10px + blur:20px ≈ 50px) */
    padding: 50px 1rem;
    scroll-padding-left: 1rem;
  }

  .cards-wrap::-webkit-scrollbar {
    display: none;
  }

  .cards {
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 1rem;
  }

  /* Targets MoodCard's root .pod-wrap — Vue 3 allows parent scoped CSS
     to style a child component's root element without :deep() */
  .pod-wrap {
    --card-w: 250px;
    width: 250px;
    min-width: 250px;
    flex-shrink: 0;
    scroll-snap-align: start;
  }
}

@media (min-width: 1381px) {
  .cards:has(.pod-wrap:hover) {
    .pod-wrap {
      &::after {
        opacity: 0.7;
      }

      &::before {
        opacity: 0;
      }

      &:hover {
        &::after {
          opacity: 0;
        }
        &::before {
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
