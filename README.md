# Market Mood

A web application for sensing market sentiment.

## Setup

```bash
npm install
npm run dev
```

## Development

Add your API keys to `.env` (copy from `.env.example`):

```
NUXT_DEEPSEEK_API_KEY=your_key_here
NUXT_BRAVE_SEARCH_API_KEY=your_key_here
```

From there you can customize the sentiment analysis logic in `server/utils/sentimentAnalyzer.ts`, tune the market verticals to the sectors that matter to you, and build a vibrant mood board with the stories the market is telling right now.

![market-mood-prod](https://github.com/user-attachments/assets/c7ac83d8-cff7-4a84-a1d6-e5e31765528b)

