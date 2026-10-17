import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

// Use only this deliberately fake value; never pass a real key to this check.
export const CANARY = 'LOCAL_SECURITY_CANARY_20261017_NOT_A_REAL_KEY';
const root = resolve(process.argv[2] || 'dist');
let count = 0;
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await scan(path);
    else {
      const bytes = await readFile(path);
      assert.ok(!bytes.includes(Buffer.from(CANARY)), `Synthetic canary leaked into ${path}`);
      assert.doesNotMatch(bytes.toString('utf8'), /VITE_OPENAI_API_KEY|OPENAI_API_KEY|api\.openai\.com|Authorization|Bearer\s|dangerouslyAllowBrowser/i, `Provider configuration in ${path}`);
      count++;
    }
  }
}
await scan(root);
assert.ok(count > 0, 'No build files found');
console.log(`PASS: ${count} build files scanned; no synthetic canary or provider authorization found.`);
