export type MoodType = 'bullish' | 'bearish' | 'mixed'

export interface MarketVertical {
  id: string                    // e.g., "ai-stocks"
  title: string                 // e.g., "AI Stocks"
  description: string           // Brief description
  mood: MoodType
  summary: string               // 2-3 sentence sentiment summary
  confidence: number            // 0-100
  lastUpdated: string           // ISO timestamp
  topTickers?: TickerSentiment[] // Tickers discovered by Claude (optional until analyzed)
}

export interface VerticalDetail extends MarketVertical {
  keyFactors: string[]          // Main sentiment drivers
  news: NewsItem[]
  topTickers: TickerSentiment[]
}

export interface NewsItem {
  title: string
  url: string
}

export interface TickerSentiment {
  ticker: string
  sentiment: MoodType
}
