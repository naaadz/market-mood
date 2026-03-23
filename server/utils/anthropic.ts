import Anthropic from '@anthropic-ai/sdk';

export const getAnthropicClient = () => {
  const config = useRuntimeConfig();
  const apiKey = config.anthropicApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'ANTHROPIC_API_KEY not configured',
    });
  }

  return new Anthropic({ apiKey });
};

export const SEARCH_TOOL_DEFINITION = {
  name: 'search_web',
  description:
    'Search the web for recent news articles, social media posts, and market discussions. Use this to gather information about current market sentiment, news, and social buzz.',
  input_schema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'The search query (e.g., "NVDA stock news", "AI market sentiment reddit")',
      },
      hours: {
        type: 'number',
        description: 'How many hours back to search (default: 48)',
      },
    },
    required: ['query'],
  },
};

export const getModel = () => {
  const config = useRuntimeConfig();
  return config.claudeModel || 'claude-sonnet-4-6';
};
