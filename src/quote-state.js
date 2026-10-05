export const FAVORITES_KEY = 'quote-page:favorites:v1';
export const CURRENT_QUOTE_KEY = 'quote-page:current:v1';

function randomIndex(length, random = Math.random) {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('Random source must return a number from 0 up to, but not including, 1');
  }
  return Math.floor(value * length);
}

export function chooseInitialQuote(quotes, random = Math.random) {
  if (quotes.length === 0) return null;
  return quotes[randomIndex(quotes.length, random)];
}

export function chooseNextQuote(quotes, currentId, random = Math.random) {
  if (quotes.length === 0) return null;
  if (quotes.length === 1) return quotes[0];
  const currentIndex = quotes.findIndex((quote) => quote.id === currentId);
  if (currentIndex < 0) return chooseInitialQuote(quotes, random);
  const otherIndex = randomIndex(quotes.length - 1, random);
  return quotes[otherIndex >= currentIndex ? otherIndex + 1 : otherIndex];
}

export function toggleFavorite(favorites, quoteId) {
  const next = new Set(favorites);
  if (next.has(quoteId)) next.delete(quoteId);
  else next.add(quoteId);
  return next;
}

export function readFavorites(storage, quotes) {
  try {
    const saved = storage?.getItem(FAVORITES_KEY);
    if (saved === null || saved === undefined) return new Set();
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return new Set();
    const known = new Set(quotes.map((quote) => quote.id));
    return new Set(parsed.filter((id) => typeof id === 'string' && known.has(id)));
  } catch {
    return new Set();
  }
}

export function writeFavorites(storage, favorites) {
  try {
    storage?.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    return Boolean(storage);
  } catch {
    return false;
  }
}

export function readCurrentQuote(storage, quotes) {
  try {
    const id = storage?.getItem(CURRENT_QUOTE_KEY);
    return quotes.find((quote) => quote.id === id) ?? null;
  } catch {
    return null;
  }
}

export function writeCurrentQuote(storage, quoteId) {
  try {
    storage?.setItem(CURRENT_QUOTE_KEY, quoteId);
    return Boolean(storage);
  } catch {
    return false;
  }
}
