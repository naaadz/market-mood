/**
 * Delay utility for rate limiting
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute promises sequentially with delay between each
 * Brave Search API: 1 request per second limit
 */
export async function executeWithRateLimit<T>(
  tasks: (() => Promise<T>)[],
  delayMs: number = 1000 // Brave API: 1 req/sec
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < tasks.length; i++) {
    if (i > 0) {
      // Wait between requests to respect rate limit
      await delay(delayMs);
    }
    results.push(await tasks[i]());
  }

  return results;
}

/**
 * Retry with exponential backoff for 429 errors
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 2000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Retry on rate limit errors and transient network errors
      const isRateLimit = error?.statusCode === 429 || error?.status === 429;
      const isNetworkError =
        error?.cause?.code === 'ECONNRESET' ||
        error?.message === 'terminated' ||
        error?.cause?.message?.includes('ECONNRESET');

      if (isRateLimit || isNetworkError) {
        const delayMs = initialDelayMs * Math.pow(2, i);
        const reason = isRateLimit ? 'Rate limited' : 'Network error';
        console.log(
          `${reason}, retrying in ${delayMs}ms... (attempt ${i + 1}/${maxRetries})`
        );
        await delay(delayMs);
      } else {
        // Don't retry on other errors
        throw error;
      }
    }
  }

  throw lastError;
}
