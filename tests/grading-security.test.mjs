import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { transformWithEsbuild } from 'vite';

const root = new URL('../', import.meta.url);
const gradePath = new URL('src/components/tabs/GradeTab.jsx', root);
const expected = [
  {
    "name": "議題背景",
    "weight": 15,
    "description": "議題說明清楚、有時事佐證"
  },
  {
    "name": "經濟概念應用",
    "weight": 35,
    "description": "正確使用至少 2 章概念分析"
  },
  {
    "name": "圖表分析",
    "weight": 15,
    "description": "圖表正確、說明清楚"
  },
  {
    "name": "結論與建議",
    "weight": 15,
    "description": "有自己觀點、邏輯合理"
  },
  {
    "name": "AI 使用反思",
    "weight": 20,
    "description": "說明工具使用、有批判思考"
  }
];

async function sourceFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) files.push(...await sourceFiles(path));
    else if (/\.(jsx?|tsx?|html)$/.test(entry.name)) files.push(path);
  }
  return files;
}

test('client source contains no provider secret access or paid API authorization', async () => {
  const files = [...await sourceFiles(new URL('src/', root)), new URL('vite.config.js', root), new URL('index.html', root)];
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    assert.doesNotMatch(source, /import\.meta\.env|api\.openai\.com|OPENAI_API_KEY|Authorization|Bearer\s|dangerouslyAllowBrowser/i, file.pathname);
  }
});

test('grading module imports and renders offline with no upload or student identity form', async () => {
  const originalFetch = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = () => { requests++; throw new Error('Network access is forbidden in grading'); };
  try {
    const source = await readFile(gradePath, 'utf8');
    assert.doesNotMatch(source, /fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|pdfjs|useEffect/);
    const result = await transformWithEsbuild(source, gradePath.pathname, {
      loader: 'jsx', jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
    });
    const code = result.code.replace(/from (['"])react\1/g, `from ${JSON.stringify(import.meta.resolve('react'))}`);
    const { default: GradeTab } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
    const html = renderToStaticMarkup(React.createElement(GradeTab));
    assert.match(html, /role="status"/);
    assert.match(html, /AI 評分暫時無法使用/);
    assert.match(html, /最終成績以老師批改為準/);
    assert.match(html, /創課系統/);
    assert.doesNotMatch(html, /<(?:input|textarea|button|form)\b|AI 評分結果|AI 評分中|上傳後將自動/);
    assert.equal((html.match(/scope="row"/g) || []).length, 5);
    for (const item of expected) {
      assert.ok(html.includes(item.name), item.name);
      assert.ok(html.includes(item.description), item.description);
      assert.ok(html.includes(`${item.weight} 分`));
    }
    assert.equal(expected.reduce((sum, item) => sum + item.weight, 0), 100);
    assert.equal(requests, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('grading navigation describes the offline rubric', async () => {
  const tools = await readFile(new URL('src/data/tools.js', root), 'utf8');
  assert.match(tools, /id: 'grade', label: '🤖 AI 評分', subtitle: '暫停評分・查看標準'/);
});


test('build scanner fails closed for synthetic leaks and missing artifacts', async () => {
  const { mkdtemp, writeFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const dir = await mkdtemp(join(tmpdir(), 'grading-security-'));
  const scanner = fileURLToPath(new URL('scripts/check-client-build.mjs', root));
  const run = (target) => spawnSync(process.execPath, [scanner, target], { encoding: 'utf8' });
  try {
    assert.notEqual(run(dir).status, 0, 'empty build must fail');
    assert.notEqual(run(join(dir, 'missing')).status, 0, 'missing build must fail');
    const asset = join(dir, 'asset.js');
    for (const marker of ['LOCAL_SECURITY_CANARY_20261017_NOT_A_REAL_KEY', 'api.openai.com', 'Authorization', 'Bearer fake', 'VITE_OPENAI_API_KEY']) {
      await writeFile(asset, marker);
      assert.notEqual(run(dir).status, 0, 'synthetic leak must fail');
    }
    await writeFile(asset, 'safe offline rubric');
    assert.equal(run(dir).status, 0, 'clean build should pass');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});


test('all seven teaching tabs and both task weeks render without runtime errors', async () => {
  const tabs = ['QuestTab', 'MapTab', 'GearTab', 'BossTab', 'GradeTab', 'SampleTab', 'NpcTab'];
  for (const name of tabs) {
    const path = new URL(`src/components/tabs/${name}.jsx`, root);
    const source = await readFile(path, 'utf8');
    const result = await transformWithEsbuild(source, path.pathname, { loader: 'jsx', jsx: 'automatic' });
    const code = result.code.replace(/from (['"])([^'"]+)\1/g, (_, quote, specifier) => {
      const resolved = specifier.startsWith('.')
        ? new URL(specifier + (/\.\w+$/.test(specifier) ? '' : '.js'), path).href
        : import.meta.resolve(specifier);
      return `from ${JSON.stringify(resolved)}`;
    });
    const { default: Tab } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
    for (const activeWeek of name === 'MapTab' ? [1, 2] : [1]) {
      const html = renderToStaticMarkup(React.createElement(Tab, {
        activeWeek, completedTasks: [], setActiveWeek() {}, toggleTask() {},
      }));
      assert.ok(html.length > 500, `${name} week ${activeWeek} should render content`);
      assert.match(html, /<(?:div|section)\b/);
    }
  }
});
