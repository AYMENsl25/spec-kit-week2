# UI Contract: Quote Page

## Initial view

- Exactly one quote text and author are visible when the page opens.
- A first visit shows a random built-in quote; a reload restores the last displayed quote when its saved ID is valid.
- A labeled `New quote` button and a labeled favorite toggle are visible.
- The favorite toggle's visible state and `aria-pressed` value agree.

## New quote action

- Activating the button displays exactly one built-in quote and its author.
- When at least two quotes exist, the new quote differs from the previous one.
- Favorite state updates to match the newly displayed quote.
- The new quote becomes the last displayed quote for the next reload when storage works.
- The changed quote is announced to assistive technology.

## Favorite action

- Activating the toggle marks or unmarks the current quote.
- The state change is visible and reflected in `aria-pressed`.
- The choice survives reloads in the same browser when storage is available.
- Reloading shows the last displayed quote with its favorite state immediately.
- Storage failure does not stop either button from working in the current visit.

## Input and layout

- Both controls work by keyboard and pointer.
- At common phone and desktop widths, content remains readable without horizontal scrolling.
