import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const cacheFile = join(process.cwd(), '.cache', 'market-data.json');

  if (!existsSync(cacheFile)) {
    throw createError({ statusCode: 404, message: 'No report available yet' });
  }

  const content = await readFile(cacheFile, 'utf-8');
  setHeader(event, 'Content-Type', 'application/json');
  return JSON.parse(content);
});
