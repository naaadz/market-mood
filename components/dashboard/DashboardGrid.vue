<script setup lang="ts">
import type { MarketVertical } from '~/types/market'

defineProps<{
  verticals: MarketVertical[]
  loading?: boolean
}>()
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
      <div
        v-for="n in 4"
        :key="n"
        class="h-48 bg-gray-200 animate-pulse rounded-lg"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
    >
      <DashboardMarketPodCard
        v-for="vertical in verticals"
        :key="vertical.id"
        :vertical="vertical"
      />
    </div>
  </div>
</template>
