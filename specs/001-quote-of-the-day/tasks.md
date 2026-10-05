---
description: "Implementation tasks for the quote-of-the-day page"
---

# Tasks: Quote of the Day

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md),
[data-model.md](data-model.md), [UI contract](contracts/ui.md)

**Tests**: Logic tests and browser walkthrough requested in the plan review.

**Organization**: Tasks are grouped by user story, then final validation.

## Phase 1: Setup

**Purpose**: Create the small static project structure.

- [X] T001 Create `package.json` with ES modules and a `node --test` script, without runtime dependencies.
- [X] T002 [P] Create the page skeleton in `index.html` with one quote region, author, `New quote` button, and favorite button.
- [X] T003 [P] Create the editorial layout in `styles.css` with phone and desktop widths, clear focus styles, and reduced-motion support.

## Phase 2: Foundational

**Purpose**: Define built-in quote data and shared state rules.

- [X] T004 Create at least five distinct built-in records in `src/quotes.js`, each with a unique non-empty string `id`, non-empty `text`, and non-empty `author`.
- [X] T005 Define pure state-helper exports in `src/quote-state.js` for initial selection, different-next selection, and favorite membership.

**Checkpoint**: The data and state rules are ready for all user stories.

## Phase 3: User Story 1 — Read a quote (P1) MVP

**Goal**: Show one quote and author immediately on page load, randomly when no valid last quote is saved.

**Independent Test**: Open the page with empty storage and see exactly one built-in quote and author.

- [X] T006 [US1] Add controlled-random tests for initial selection and collection boundaries in `tests/quote-state.test.mjs`.
- [X] T007 [US1] Implement initial random selection in `src/quote-state.js` and make T006 pass.
- [X] T008 [US1] Render the initial quote and author in `src/app.js` and connect it to `index.html`.

**Checkpoint**: A visitor can read one quote without taking an action.

## Phase 4: User Story 2 — Request another quote (P2)

**Goal**: New quote always selects a different built-in quote.

**Independent Test**: Activate New quote repeatedly; every next item differs from the previous one.

- [X] T009 [US2] Add controlled-random tests covering every current index and the lower and upper random boundaries in `tests/quote-state.test.mjs`.
- [X] T010 [US2] Implement bounded nonrepeating selection in `src/quote-state.js` and make T009 pass.
- [X] T011 [US2] Wire the New quote button and polite announcement region in `src/app.js` and `index.html`.

**Checkpoint**: A visitor can always request a different quote.

## Phase 5: User Story 3 — Save and remove a favorite (P3)

**Goal**: A visitor can toggle and persist per-quote favorite state and return to the last displayed quote.

**Independent Test**: Mark a quote, reload, and immediately see the same marked quote; remove the mark and confirm removal persists after another reload.

- [X] T012 [US3] Add tests for favorite toggling and valid, missing, malformed, stale-ID, read-error, and write-error storage cases in `tests/quote-state.test.mjs`.
- [X] T013 [US3] Implement validated favorite loading, toggling, and in-memory fallback in `src/quote-state.js` and make T012 pass.
- [X] T014 [US3] Wire favorite state to visible button text and `aria-pressed` in `src/app.js` and `index.html`.
- [X] T015 [US3] Add tests in `tests/quote-state.test.mjs` for restoring a valid current quote ID and random fallback when the saved ID is missing, malformed, stale, or unreadable.
- [X] T016 [US3] Implement saving the current quote ID after initial selection and each New quote action, restoring it on reload, and handling storage failure in `src/quote-state.js` and `src/app.js`; make T015 pass.

**Checkpoint**: Favorite state belongs to each quote and survives reloads when storage works.

## Phase 6: Polish and Validation

**Purpose**: Verify the complete page and document how to run it.

- [X] T017 [P] Write `README.md` with local run, test, and feature instructions.
- [X] T018 Run `node --test` and record results in `writeup.md`.
- [X] T019 Run the browser scenarios in `specs/001-quote-of-the-day/quickstart.md`, including immediate restore after reload, keyboard use, phone and desktop widths, and 20 nonrepeating clicks; verify storage failure with fake-storage tests and the reduced-motion CSS rule; record results in `writeup.md`.
- [X] T020 Complete `writeup.md` with each Spec Kit prompt, the reviewed spec refinement and its effect on plan/output, convergence outcome, and a 3–4 sentence reflection.

## Dependencies & Execution Order

`T001–T003` → `T004–T005` → `T006–T008` → `T009–T011` → `T012–T016` → `T017–T020`.
T002 and T003 can proceed in parallel because they touch different files. User Story 1
is the MVP; User Stories 2 and 3 each have independent acceptance checks but build
on the shared quote display and state foundation.

## Parallel Opportunities

- T002 (`index.html`) and T003 (`styles.css`) touch separate files.
- T017 (`README.md`) can be drafted alongside story work after run commands are known.

## Implementation Strategy

Complete the setup and foundation, then implement and verify one user story at a
time in priority order. Run the full test suite and manual checks after all three
stories. If convergence finds a gap, add a task and repeat implementation and
convergence until no gaps remain.

## Phase 7: Convergence

- [X] T021 Complete the pending convergence outcome and verification summary in `writeup.md` per T020 (partial).
