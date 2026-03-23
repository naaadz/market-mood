import { MARKET_VERTICALS } from '~/server/config/verticals';
import type { MoodType, VerticalDetail } from '~/types/market';
import { readCache, writeCache } from '~/server/utils/fileStore';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const forceRefresh = query.refresh === 'true';

  // Always try to read from cache first
  const cached = await readCache();

  // If not force refresh, return cached data (even if empty)
  if (!forceRefresh) {
    return cached;
  }

  // Only fetch fresh data when explicitly requested (refresh=true)
  console.log('🔄 Force refresh requested - fetching fresh data...');
  const results: VerticalDetail[] = [];

  for (const config of MARKET_VERTICALS) {
    try {
      console.log(`Analyzing ${config.id}...`);
      const analysis = await analyzeSentiment(config.id, config);
      results.push(analysis);
    } catch (error) {
      console.error(`Error analyzing ${config.id}:`, error);
      // Return fallback data on error
      results.push({
        id: config.id,
        title: config.title,
        description: config.description,
        mood: 'mixed' as MoodType,
        summary: 'Analysis temporarily unavailable. Please try again.',
        confidence: 0,
        lastUpdated: new Date().toISOString(),
        overallAnalysis: 'Analysis failed. Please try refreshing.',
        keyFactors: [],
        news: [],
        socialBuzz: {
          platform: 'N/A',
          mentions: 0,
          sentiment: 'mixed' as MoodType,
          topPosts: [],
        },
        topTickers: [],
      });
    }
  }

  // Write results to cache file
  await writeCache(results);

  return results;
});
