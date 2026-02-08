import type { MoodType } from '~/types/market'

export function useMoodTheme() {
  const getMoodColors = (mood: MoodType) => {
    switch (mood) {
      case 'bullish':
        return {
          border: 'border-green-500',
          bg: 'bg-green-50',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800'
        }
      case 'bearish':
        return {
          border: 'border-red-500',
          bg: 'bg-red-50',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800'
        }
      case 'mixed':
        return {
          border: 'border-yellow-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800'
        }
    }
  }

  return { getMoodColors }
}
