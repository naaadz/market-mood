<script setup lang="ts">
const { verticals, loading, error, refresh } = useMarketVerticals()

// Manual refresh only - user refreshes once daily
// No auto-refresh to minimize API costs
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Market Mood</h1>
          <p class="mt-2 text-gray-600">Real-time sentiment analysis across market sectors</p>
        </div>
        <button
          @click="refresh()"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Refreshing...' : 'Refresh All' }}
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-800">{{ error.message }}</p>
      </div>

      <!-- Dashboard Grid -->
      <DashboardGrid :verticals="verticals || []" :loading="loading" />
    </div>
  </div>
</template>