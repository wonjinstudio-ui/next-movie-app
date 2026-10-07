const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const root = process.env.DAY40_PROJECT_DIR || path.resolve(__dirname, '..');
const projectRequire = createRequire(path.join(root, 'package.json'));
const ts = projectRequire('typescript');
const source = fs.readFileSync(path.join(root, 'src/lib/tmdb.ts'), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function loadTmdb(fetch, token = 'test-token') {
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: projectRequire,
    fetch,
    process: { env: { TMDB_TOKEN: token } },
  });
  return module.exports;
}

test('a missing movie triggers Next.js Not Found', async () => {
  const tmdb = loadTmdb(async () => new Response(null, { status: 404 }));
  await assert.rejects(tmdb.getMovieDetail('999999999'), error =>
    error.digest === 'NEXT_HTTP_ERROR_FALLBACK;404');
});

test('an existing movie returns its details', async () => {
  const movie = {
    id: 123, title: 'Test movie', overview: 'Overview', poster_path: null,
    vote_average: 7, release_date: '2026-01-01', runtime: 90, genres: [],
  };
  const tmdb = loadTmdb(async () => Response.json(movie));
  assert.deepEqual(await tmdb.getMovieDetail('123'), movie);
});

test('a server failure remains an ordinary error', async () => {
  const tmdb = loadTmdb(async () => new Response(null, { status: 500 }));
  await assert.rejects(tmdb.getMovieDetail('123'), error =>
    error.message === '영화 상세 정보를 불러오지 못했습니다.' && !error.digest);
});

test('an authentication failure remains an ordinary error', async () => {
  const tmdb = loadTmdb(async () => new Response(null, { status: 401 }));
  await assert.rejects(tmdb.getMovieDetail('123'), error =>
    error.message === '영화 상세 정보를 불러오지 못했습니다.' && !error.digest);
});

test('a network failure remains an ordinary error', async () => {
  const tmdb = loadTmdb(async () => { throw new TypeError('fetch failed'); });
  await assert.rejects(tmdb.getMovieDetail('123'), /fetch failed/);
});
