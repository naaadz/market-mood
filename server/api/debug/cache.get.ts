import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async () => {
  const cwd = process.cwd();
  const cacheDir = join(cwd, '.cache');
  const cacheFile = join(cacheDir, 'market-data.json');

  // Test Nitro server asset storage
  let storageKeys: string[] = [];
  let storageData: unknown = null;
  let storageError: string | null = null;
  try {
    const storage = useStorage('assets:cache');
    storageKeys = await storage.getKeys();
    storageData = await storage.getItem('market-data.json');
  } catch (e: unknown) {
    storageError = e instanceof Error ? e.message : String(e);
  }

  return {
    cwd,
    cacheDirExists: existsSync(cacheDir),
    cacheFileExists: existsSync(cacheFile),
    cacheDirContents: existsSync(cacheDir) ? readdirSync(cacheDir) : [],
    storageKeys,
    storageHasData: storageData !== null,
    storageError,
  };
});
