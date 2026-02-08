import { retryWithBackoff } from './rateLimit'

interface BraveSearchResult {
  title: string
  url: string
  description: string
  age?: string
}

export async function executeSearch(
  query: string,
  hours: number = 48
): Promise<BraveSearchResult[]> {
  const config = useRuntimeConfig()
  const apiKey = config.braveSearchApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'BRAVE_SEARCH_API_KEY not configured'
    })
  }

  const url = new URL('https://api.search.brave.com/res/v1/web/search')
  url.searchParams.set('q', query)
  url.searchParams.set('count', '10')

  // Use retry logic to handle rate limits
  return await retryWithBackoff(async () => {
    const response = await $fetch<any>(url.toString(), {
      headers: {
        'X-Subscription-Token': apiKey,
        'Accept': 'application/json'
      }
    })

    return response.web?.results?.map((r: any) => ({
      title: r.title,
      url: r.url,
      description: r.description,
      age: r.age
    })) || []
  })
}
