import type { VerticalDetail } from '~/types/market'
import { executeWithRateLimit } from './rateLimit'

export async function analyzeSentiment(
  verticalId: string,
  verticalConfig: any
): Promise<VerticalDetail> {
  const client = getAnthropicClient()

  const systemPrompt = `You are a financial sentiment analyzer. Your task is to:

1. Search for recent news and social media discussions about ${verticalConfig.title}
2. Identify the most mentioned stock tickers from your search results
3. Analyze the sentiment based on what you find
4. Determine if the market mood is bullish, bearish, or mixed
5. Provide confidence level based on data consistency and volume

Use the search_web tool to gather information. Search for:
- Recent news about the sector
- Social media discussions (Reddit, Twitter/X)
- Trending tickers and stock mentions

DO NOT use pre-defined tickers. Discover the most relevant tickers from the search results.

Return your analysis as JSON matching this structure:
{
  "mood": "bullish" | "bearish" | "mixed",
  "confidence": 0-100,
  "summary": "2-3 sentence summary of current sentiment",
  "overallAnalysis": "detailed paragraph about market sentiment",
  "keyFactors": ["factor 1", "factor 2", "factor 3"],
  "topTickers": [
    {"ticker": "SYMBOL", "sentiment": "bullish|bearish|mixed", "confidence": 0-100, "mentions": 123}
  ],
  "news": [
    {"title": "headline", "source": "source name", "url": "https://...", "publishedAt": "2024-01-01", "snippet": "preview text"}
  ],
  "socialBuzz": {
    "platform": "reddit/twitter",
    "mentions": 123,
    "sentiment": "bullish|bearish|mixed",
    "topPosts": ["post 1", "post 2"]
  }
}`

  const userPrompt = `Analyze current market sentiment for ${verticalConfig.title}.

${verticalConfig.description}

Search for recent news and social media discussions from the past 48 hours. Identify the most mentioned tickers and provide your sentiment analysis.`

  let messages: any[] = [{ role: 'user', content: userPrompt }]

  // Tool calling loop
  while (true) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      tools: [SEARCH_TOOL_DEFINITION],
      messages
    })

    // Check if Claude wants to use the search tool (could be multiple parallel calls)
    const toolUses = response.content.filter((block: any) => block.type === 'tool_use')

    if (toolUses.length > 0) {
      console.log(`[${verticalId}] Claude requested ${toolUses.length} searches`)

      // Execute searches sequentially with 1 second delay (Brave API rate limit: 1 req/sec)
      const searchTasks = toolUses.map((toolUse: any) => async () => {
        console.log(`[${verticalId}] Searching: "${toolUse.input.query}"`)
        const searchResults = await executeSearch(
          toolUse.input.query,
          toolUse.input.hours || 48
        )
        console.log(`[${verticalId}] Found ${searchResults.length} results for "${toolUse.input.query}"`)

        return {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(searchResults)
        }
      })

      const toolResults = await executeWithRateLimit(searchTasks, 1000)

      // Add all tool results to messages
      messages.push(
        { role: 'assistant', content: response.content },
        { role: 'user', content: toolResults }
      )

      continue // Continue the loop for Claude to process results
    }

    // No more tool calls - extract final response
    const textBlock = response.content.find((block: any) => block.type === 'text')
    if (textBlock) {
      const analysis = parseClaudeResponse(textBlock.text)

      return {
        id: verticalId,
        title: verticalConfig.title,
        description: verticalConfig.description,
        lastUpdated: new Date().toISOString(),
        ...analysis
      }
    }

    break
  }

  throw createError({
    statusCode: 500,
    message: 'Failed to get analysis from Claude'
  })
}

function parseClaudeResponse(text: string): Partial<VerticalDetail> {
  // Extract JSON from Claude's response (may be wrapped in markdown)
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in Claude response')
  }

  return JSON.parse(jsonMatch[0])
}
