# Quote of the Day

A small static quote page built for Week 2 of AI-Augmented Software Engineering.
The page starts with a random built-in quote, offers a different quote on each
**New quote** action, and saves favorites and the last displayed quote in the
same browser. Reloading returns to the last quote and its favorite state.

## Run

From this directory, start any static-file server. For example:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`. There is no build step or runtime dependency.
Opening `index.html` directly may give inconsistent browser-storage behavior,
so a local server is recommended.

## Test

With Node.js installed:

```powershell
node --test
```

For browser checks, follow
[`specs/001-quote-of-the-day/quickstart.md`](specs/001-quote-of-the-day/quickstart.md).

## Spec Kit artifacts

The project constitution is in `.specify/memory/constitution.md`. The feature
specification, plan, research, data model, contract, checklist, task list, and
quickstart are in `specs/001-quote-of-the-day/`. The implementation follows the
reviewed refinement: a valid last displayed quote ID is restored on reload;
invalid or unavailable stored data falls back safely to a random quote.
