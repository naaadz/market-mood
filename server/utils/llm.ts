import OpenAI from 'openai';

export const getDeepSeekClient = () => {
  const config = useRuntimeConfig();
  const apiKey = config.deepseekApiKey as string;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'DEEPSEEK_API_KEY not configured',
    });
  }

  return new OpenAI({ apiKey, baseURL: 'https://api.deepseek.com' });
};

export const SEARCH_TOOL_DEFINITION: OpenAI.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'search_web',
    description:
      'Search the web for recent news articles, social media posts, and market discussions. Use this to gather information about current market sentiment, news, and social buzz.',
    parameters: {
      type: 'object',
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
  },
};

export const getModel = () => 'deepseek-chat';
