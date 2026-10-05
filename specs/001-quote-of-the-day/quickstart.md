# Quickstart Validation: Quote of the Day

## Prerequisites

- A current web browser
- Node.js for the optional logic test command
- Python 3.11+ for a simple local server, or another static-file server

## Run

From the repository root:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/` in a browser. On systems where `python` is not on
PATH, use an installed Python executable or another local static-file server.

## Verify

1. On a first visit with no saved current quote, confirm exactly one built-in quote and author appear on load.
2. Click `New quote` 20 times. Each result must differ from the previous result.
3. Mark the current quote as a favorite. Confirm the button's visible and
   accessible pressed state changes.
4. Reload. Confirm the same quote appears immediately and is still marked.
   Unmark it, reload, and confirm the same quote appears unmarked.
5. Use Tab, Enter, and Space to operate both controls without a pointer.
6. Check a phone-width and desktop-width viewport for readability and horizontal scrolling.
7. Run the fake-storage logic tests for missing, invalid, stale, and unavailable
   saved IDs; each must fall back to a random built-in quote and stay usable.
8. Inspect the `prefers-reduced-motion` CSS rule in `styles.css`. If your browser
   supports emulating reduced motion, also confirm quote changes remain immediate.

Run logic checks if Node.js is available:

```powershell
node --test
```

The expected result is all quote-selection and favorite-state tests passing.
