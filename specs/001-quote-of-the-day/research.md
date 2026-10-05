# Research: Quote of the Day

## Built-in quotes and identity

**Decision**: Keep a small built-in array of quote records with stable IDs, text, and
author. Store only IDs in the favorites set.

**Rationale**: Stable IDs keep favorite choices tied to the same quote if display
order changes. The page needs no external quote service.

**Alternatives considered**: Storing entire quote objects duplicates static content
and risks stale favorites after text changes. Fetching quotes adds an unnecessary
service dependency.

## Favorite persistence and failure handling

**Decision**: Serialize favorite IDs under a versioned browser-storage key. On read,
accept only an array of known string IDs. If storage is invalid or unavailable, use
an in-memory set for the current visit and keep the page functional.

**Rationale**: `localStorage` persists across sessions in a browser, but access can
fail, and `file:` URL behavior is not defined consistently. A local web server is
the recommended way to run the page. See [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
and [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

**Alternatives considered**: Assuming storage always works would make a small
optional feature break the whole page. Storing raw, unvalidated values could leave
incorrect favorite states after data corruption.

## Restoring the last displayed quote

**Decision**: Store the last displayed stable quote ID under a second versioned
browser-storage key. Restore it only if it matches a built-in record; otherwise
choose a random quote and save the new ID when possible.

**Rationale**: Reloading immediately shows the quote the visitor just marked,
making the saved favorite visible without repeated New quote actions. Keeping the
current ID separate from favorite IDs lets either stored value fail independently.

**Alternatives considered**: Saving the whole quote duplicates built-in content.
Making the last quote a favorite implicitly would change the meaning of favorites.

## Nonrepeating random selection

**Decision**: With `n >= 2`, choose a uniform random integer among `n - 1` other
indices, then skip the current index. The resulting quote always differs from the
current quote.

**Rationale**: This has bounded work and preserves an even selection among the
other items. [MDN Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
documents the random source and integer mapping pattern.

**Alternatives considered**: Repeatedly drawing until the quote differs can take
an unpredictable number of draws. Cycling in fixed order is not random.

## Accessible controls and updates

**Decision**: Use native buttons for New quote and Favorite. Express favorite state
with a visible label and `aria-pressed`. Announce dynamic quote changes through a
polite live region.

**Rationale**: Native buttons provide expected keyboard behavior, and live regions
make dynamic updates perceivable. See [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
and [MDN live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions).

**Alternatives considered**: Clickable non-button elements would need extra keyboard
and focus behavior without adding value.
