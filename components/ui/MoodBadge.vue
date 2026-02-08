<script setup lang="ts">
import type { MoodType } from '~/types/market'

const props = defineProps<{
  mood: MoodType
}>()

const { getMoodColors } = useMoodTheme()
const colors = computed(() => getMoodColors(props.mood))
</script>

<template>
  <span
    :class="['px-3 py-1 rounded-full text-sm font-medium', colors.badge]"
  >
    {{ mood.charAt(0).toUpperCase() + mood.slice(1) }}
  </span>
</template>
