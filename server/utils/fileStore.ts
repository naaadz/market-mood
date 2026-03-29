import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { VerticalDetail } from '~/types/market';

const CACHE_DIR = join(process.cwd(), '.cache');
const CACHE_FILE = join(CACHE_DIR, 'market-data.json');

interface CacheData {
  verticals: VerticalDetail[];
  lastUpdated: string;
}

/**
 * Read cached data from file.
 * On Netlify, falls back to the bundled server asset since the runtime
 * filesystem is ephemeral and the .cache dir cannot be written persistently.
 */
export async function readCache(): Promise<VerticalDetail[]> {
  // Try the runtime filesystem first (works locally)
  try {
    if (existsSync(CACHE_FILE)) {
      const content = await readFile(CACHE_FILE, 'utf-8');
      const data: CacheData = JSON.parse(content);
      return data.verticals || [];
    }
  } catch (error) {
    console.error('Error reading cache from filesystem:', error);
  }

  // Fall back to the bundled server asset (works on Netlify)
  try {
    const storage = useStorage('assets:cache');
    const data = await storage.getItem<CacheData>('market-data.json');
    return data?.verticals || [];
  } catch (error) {
    console.error('Error reading cache from server assets:', error);
    return [];
  }
}

/**
 * Write data to cache file (local only — no-op on Netlify ephemeral runtime).
 */
export async function writeCache(verticals: VerticalDetail[]): Promise<void> {
  try {
    if (!existsSync(CACHE_DIR)) {
      await mkdir(CACHE_DIR, { recursive: true });
    }

    const data: CacheData = {
      verticals,
      lastUpdated: new Date().toISOString(),
    };

    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✓ Cache written to ${CACHE_FILE}`);
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

/**
 * Get a single vertical from cache
 */
export async function getCachedVertical(
  verticalId: string
): Promise<VerticalDetail | null> {
  const verticals = await readCache();
  return verticals.find((v) => v.id === verticalId) || null;
}
