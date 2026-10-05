import { quotes } from './quotes.js';
import {
  chooseInitialQuote,
  chooseNextQuote,
  readCurrentQuote,
  readFavorites,
  toggleFavorite,
  writeCurrentQuote,
  writeFavorites
} from './quote-state.js';

const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const quoteNumber = document.querySelector('#quote-number');
const newQuoteButton = document.querySelector('#new-quote');
const favoriteButton = document.querySelector('#favorite');
const favoriteSymbol = document.querySelector('#favorite-symbol');
const favoriteLabel = document.querySelector('#favorite-label');

let storage = null;
try { storage = window.localStorage; } catch { /* The page still works in memory. */ }

let favorites = readFavorites(storage, quotes);
let currentQuote = readCurrentQuote(storage, quotes) ?? chooseInitialQuote(quotes);

function render() {
  if (!currentQuote) {
    quoteText.textContent = 'No quotes are available yet.';
    quoteAuthor.textContent = '';
    newQuoteButton.disabled = true;
    favoriteButton.disabled = true;
    return;
  }

  quoteText.textContent = `“${currentQuote.text}”`;
  quoteAuthor.textContent = currentQuote.author;
  quoteNumber.textContent = String(quotes.findIndex((quote) => quote.id === currentQuote.id) + 1).padStart(2, '0');

  const isFavorite = favorites.has(currentQuote.id);
  favoriteButton.setAttribute('aria-pressed', String(isFavorite));
  favoriteSymbol.textContent = isFavorite ? '★' : '☆';
  favoriteLabel.textContent = isFavorite ? 'Remove favorite' : 'Save favorite';
}

if (currentQuote) writeCurrentQuote(storage, currentQuote.id);
render();

newQuoteButton.addEventListener('click', () => {
  currentQuote = chooseNextQuote(quotes, currentQuote?.id);
  if (currentQuote) writeCurrentQuote(storage, currentQuote.id);
  render();
});

favoriteButton.addEventListener('click', () => {
  if (!currentQuote) return;
  favorites = toggleFavorite(favorites, currentQuote.id);
  writeFavorites(storage, favorites);
  render();
});
