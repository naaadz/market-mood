<template>
  <div class="flex flex-col gap-30 py-20 min-h-screen justify-center">
    <header class="max-w-6xl w-full mx-auto flex justify-between">
      <div class="logo flex flex-col gap-2">
        <h1 class="font-display flex gap-2 text-5xl">
          <span>Market</span><span class="font-bold">Mood</span>
        </h1>
        <span class="uppercase text-lg tracking-[.5rem] text-light/70"
          >Sentiment Sensor</span
        >
      </div>
      <div class="stats flex items-center gap-6">
        <div class="flex flex-col text-right">
          <span>Hello, Nadia</span>
          <span>Last refresh: Mar 3, 12:45pm</span>
        </div>
        <button class="button secondary">Refresh</button>
      </div>
    </header>
    <main>
      <div class="cards-wrap flex justify-center">
        <div class="cards flex gap-8 items-center">
          <mood-card
            v-for="vertical in enrichedVerticals"
            :key="vertical.id"
            :mood="vertical.mood"
            :class="{ alt: vertical.isAlt }"
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

            <span class="factors mt-20 flex flex-col gap-4">
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
        </div>
      </div>
    </main>
    <footer class="text-light/80 flex justify-center gap-2">
      <span>MarketMood 2026</span>
      <span>|</span>
      <a class="underline" href="#">Contact our team</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { verticals, loading, error, refresh } = useMarketVerticals();

const MOOD_ORDER = { bullish: 0, mixed: 1, bearish: 2 } as const;

const sortedVerticals = computed(() =>
  [...(verticals.value ?? [])].sort((a, b) => {
    const moodDiff = MOOD_ORDER[a.mood] - MOOD_ORDER[b.mood];
    if (moodDiff !== 0) return moodDiff;
    return b.confidence - a.confidence;
  })
);

const enrichedVerticals = computed(() => {
  let mixedCount = 0;
  return sortedVerticals.value.map((vertical, i) => {
    let isAlt = false;
    if (vertical.mood === 'mixed') {
      isAlt = mixedCount >= 2;
      mixedCount++;
    }
    return { ...vertical, isAlt, newsCount: i % 2 === 0 ? 3 : 5 };
  });
});

// Manual refresh only - user refreshes once daily
// No auto-refresh to minimize API costs
</script>

<style scoped>
/* Distribute mixed cards across the blue→purple gradient automatically.
   Each successive .mixed sibling overrides --mix-pos to a later position. */
.pod-wrap.mixed ~ .pod-wrap.mixed {
  --mix-pos: 50%;
}
.pod-wrap.mixed ~ .pod-wrap.mixed ~ .pod-wrap.mixed {
  --mix-pos: 100%;
}
</style>
