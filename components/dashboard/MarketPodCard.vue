<script setup lang="ts">
import type { MarketVertical } from '~/types/market'

const props = defineProps<{
  vertical: MarketVertical
}>()

const { getMoodColors } = useMoodTheme()
const colors = computed(() => getMoodColors(props.vertical.mood))

const timeAgo = computed(() => {
  const ms = Date.now() - new Date(props.vertical.lastUpdated).getTime()
  const minutes = Math.floor(ms / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
})
</script>

<template>
  <div
    :class="[
      'rounded-lg shadow-md p-6 border-l-4 transition-all hover:shadow-lg',
      colors.border,
      colors.bg
    ]"
  >
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-xl font-bold text-gray-900">
        {{ vertical.title }}
      </h3>
      <UiMoodBadge :mood="vertical.mood" />
    </div>

    <p class="text-gray-700 mb-4 text-sm leading-relaxed">
      {{ vertical.summary }}
    </p>

    <div class="flex items-center justify-between text-xs text-gray-500">
      <span>Confidence: {{ vertical.confidence }}%</span>
      <span>{{ timeAgo }}</span>
    </div>
  </div>
</template>
