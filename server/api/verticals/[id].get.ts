import { MARKET_VERTICALS } from '~/server/config/verticals'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const query = getQuery(event)
  const forceRefresh = query.refresh === 'true'

  // Return stored data if available and not force refresh
  if (!forceRefresh) {
    const stored = getStored(id!)
    if (stored) {
      return stored
    }
  }

  // Find vertical config
  const config = MARKET_VERTICALS.find(v => v.id === id)
  if (!config) {
    throw createError({
      statusCode: 404,
      message: `Vertical ${id} not found`
    })
  }

  // Fresh analysis
  const analysis = await analyzeSentiment(id!, config)
  setStored(id!, analysis)

  return analysis
})
