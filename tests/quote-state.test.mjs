import test from 'node:test';
import assert from 'node:assert/strict';
import { quotes } from '../src/quotes.js';
import {
  CURRENT_QUOTE_KEY,
  FAVORITES_KEY,
  chooseInitialQuote,
  chooseNextQuote,
  readCurrentQuote,
  readFavorites,
  toggleFavorite,
  writeCurrentQuote,
  writeFavorites
} from '../src/quote-state.js';

function fakeStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
    removeItem: (key) => { values.delete(key); }
  };
}

test('built-in quotes have distinct, complete records', () => {
  assert.ok(quotes.length >= 5);
  assert.equal(new Set(quotes.map((quote) => quote.id)).size, quotes.length);
  for (const quote of quotes) {
    assert.ok(quote.id.trim());
    assert.ok(quote.text.trim());
    assert.ok(quote.author.trim());
  }
});

test('initial selection uses random lower and upper boundaries', () => {
  assert.equal(chooseInitialQuote(quotes, () => 0), quotes[0]);
  assert.equal(chooseInitialQuote(quotes, () => 0.999999), quotes.at(-1));
  assert.equal(chooseInitialQuote([], () => 0), null);
  assert.equal(chooseInitialQuote([quotes[0]], () => 0), quotes[0]);
});

test('New quote never immediately repeats the current quote', () => {
  for (const current of quotes) {
    for (const random of [0, 0.25, 0.5, 0.75, 0.999999]) {
      const next = chooseNextQuote(quotes, current.id, () => random);
      assert.notEqual(next.id, current.id);
      assert.ok(quotes.includes(next));
    }
  }
  assert.equal(chooseNextQuote([quotes[0]], quotes[0].id), quotes[0]);
  assert.equal(chooseNextQuote([], 'missing'), null);
});

test('favorite toggle is per quote and reversible', () => {
  const first = toggleFavorite(new Set(), quotes[0].id);
  assert.deepEqual([...first], [quotes[0].id]);
  const second = toggleFavorite(first, quotes[1].id);
  assert.ok(second.has(quotes[0].id));
  assert.ok(second.has(quotes[1].id));
  const third = toggleFavorite(second, quotes[0].id);
  assert.ok(!third.has(quotes[0].id));
  assert.ok(third.has(quotes[1].id));
});

test('favorite IDs survive reload and invalid entries are ignored', () => {
  const storage = fakeStorage();
  assert.equal(writeFavorites(storage, new Set([quotes[0].id, quotes[1].id])), true);
  assert.deepEqual(readFavorites(storage, quotes), new Set([quotes[0].id, quotes[1].id]));
  storage.setItem(FAVORITES_KEY, JSON.stringify([quotes[0].id, quotes[0].id, 'stale', 42]));
  assert.deepEqual(readFavorites(storage, quotes), new Set([quotes[0].id]));
  storage.setItem(FAVORITES_KEY, '{broken');
  assert.deepEqual(readFavorites(storage, quotes), new Set());
  storage.removeItem(FAVORITES_KEY);
  assert.deepEqual(readFavorites(storage, quotes), new Set());
});

test('last displayed quote survives reload and updates after New quote', () => {
  const storage = fakeStorage();
  assert.equal(readCurrentQuote(storage, quotes), null);
  assert.equal(writeCurrentQuote(storage, quotes[0].id), true);
  assert.equal(readCurrentQuote(storage, quotes), quotes[0]);
  const next = chooseNextQuote(quotes, quotes[0].id, () => 0);
  assert.equal(writeCurrentQuote(storage, next.id), true);
  assert.equal(readCurrentQuote(storage, quotes), next);
});

test('missing, malformed and stale current IDs trigger random fallback', () => {
  for (const saved of [null, '', 'stale', '["not-an-id"]']) {
    const storage = fakeStorage(saved === null ? {} : { [CURRENT_QUOTE_KEY]: saved });
    const restored = readCurrentQuote(storage, quotes);
    assert.equal(restored, null);
    assert.equal(restored ?? chooseInitialQuote(quotes, () => 0.999999), quotes.at(-1));
  }
});

test('storage read and write failures leave quote selection usable', () => {
  const broken = {
    getItem() { throw new Error('unavailable'); },
    setItem() { throw new Error('unavailable'); }
  };
  assert.deepEqual(readFavorites(broken, quotes), new Set());
  assert.equal(readCurrentQuote(broken, quotes), null);
  assert.equal(writeFavorites(broken, new Set([quotes[0].id])), false);
  assert.equal(writeCurrentQuote(broken, quotes[0].id), false);
  assert.ok(chooseInitialQuote(quotes, () => 0));
  assert.notEqual(chooseNextQuote(quotes, quotes[0].id, () => 0).id, quotes[0].id);
});
