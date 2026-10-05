# Week 2 writeup: Quote of the Day

## Spec Kit prompts and review decisions

| Stage | Prompt or decision | Result |
| --- | --- | --- |
| Constitution | `Create principles focused on code quality, testing, and maintainability.` | Constitution written and approved in chat. |
| Specify | `A quote-of-the-day page: one random quote from a built-in list, a "New quote" button, and favoriting that persists across reloads.` | Feature spec and requirements checklist written. |
| Specify refinement | `Always show a different quote.` | FR-003 and SC-002 require New quote to differ from the current quote. |
| Plan | `Use plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage.` | Static architecture and browser-storage plan written. |
| Plan refinement | `Check any other features and design and testing approach that are out of the box.` | Editorial quote-card design, reduced-motion support, controlled-random tests, and storage-failure tests added while retaining assignment scope. |
| Tasks | `Generate tasks from the reviewed spec and plan.` | Dependency-ordered tasks grouped by the three user stories. |
| Second specification refinement | `Return to where I left off`: first visit random, later reload restores the last displayed quote and its favorite state. | FR-002, FR-010, SC-003, acceptance checks, data model, plan, quickstart, and tasks updated before implementation. |
| Implement | `Implement the reviewed tasks for the quote page.` | Plain HTML/CSS/JavaScript page and logic tests. |
| Converge | `Assess the page against the spec, plan, tasks, and constitution; add any remaining work as tasks.` | First pass found a pending writeup outcome and added T021; the second pass found no remaining gaps. |

## A specification refinement that changed the output

**Before:** FR-002 said a random quote appears on every load. A saved favorite
would still exist after reload, but verifying it could require repeated New quote
actions until that quote appeared again.

**Change:** We refined FR-002 and SC-003, added FR-010 and an invalid-ID edge
case, then updated the plan and tasks before changing code. The data model gained
a stored current-quote ID next to the favorite IDs.

**After:** Reloading now shows the same quote with its saved favorite state
immediately. The quickstart check changed from repeated clicks to a single
reload. Tests also cover missing, malformed, stale, and inaccessible stored IDs.

The earlier New quote refinement also changed the selection function: it now
selects among the other quotes, so it never immediately repeats the current one.

## Verification

- `node --test`: 8 tests passed, 0 failed (2026-10-05).
- Browser: marking a favorite and reloading restored the same marked quote.
- Browser: 20 New quote actions yielded 0 immediate repeats and visited all 6
  built-in quotes in that run.
- Browser: Enter activated New quote; at a 390 px viewport, both controls remained
  visible and the page had no horizontal overflow. At 1280 px, the page also had
  no horizontal overflow.
- Browser: five save/reload checks and five remove/reload checks passed; each
  reload showed the same quote and correct favorite state immediately.
- Browser-storage failure is covered by fake-storage logic tests rather than a
  browser with storage disabled. The reduced-motion CSS rule was inspected, but
  the operating-system preference was not manually switched during this run.

## Convergence outcome

**Converged.** The first pass found one partial documentation gap: the outcome
section was still pending. It appended T021 to the task list. After completing
T020 and T021, the second pass found no remaining gaps against the spec, plan,
tasks, or constitution. All 8 automated tests passed, and the browser checks
above verified the main interaction and reload behavior.

## Reflection

Writing the constitution and several documents felt like overhead for a page
with only two buttons. The spec paid off when we noticed that verifying a saved
favorite after reload required searching for the same quote again. Changing the
requirement first made the storage rule, tests, and expected page behavior clear.
The final implementation was easier to check because the acceptance scenarios
described exactly what should be visible after each action.
