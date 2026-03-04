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
        <div class="cards flex gap-4">
          <mood-card mood="bullish" />
          <mood-card mood="mixed" />
          <mood-card mood="mixed" />
          <mood-card mood="mixed-2" />
          <mood-card mood="bearish" />
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

// Manual refresh only - user refreshes once daily
// No auto-refresh to minimize API costs
</script>
