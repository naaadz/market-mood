

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Market Mood</h1>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div v-if="pending" class="text-gray-600">Loading market data...</div>
        
        <div v-else-if="error" class="text-red-600">
          Error loading data: {{ error.message }}
        </div>
        
        <div v-else>
          <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ marketData }}</pre>
          <button 
            @click="refresh()"
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data: marketData, pending, error, refresh } = await useFetch('/api/market')
</script>