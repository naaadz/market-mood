import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async () => {
  const cwd = process.cwd();
  const cacheDir = join(cwd, '.cache');
  const cacheFile = join(cacheDir, 'market-data.json');

  return {
    cwd,
    cacheDirExists: existsSync(cacheDir),
    cacheFileExists: existsSync(cacheFile),
    cacheDirContents: existsSync(cacheDir) ? readdirSync(cacheDir) : [],
  };
});
