export default defineEventHandler(async (event) => {
  // Example server API endpoint
  // You can make external API calls here
  
  return {
    mood: 'bullish',
    timestamp: new Date().toISOString(),
    indices: {
      sp500: 5800,
      nasdaq: 18500,
      dow: 42000
    }
  }
})
