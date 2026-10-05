# Feature Specification: Quote of the Day

**Feature Branch**: `001-quote-of-the-day`

**Created**: 2026-10-05

**Status**: Reviewed

**Input**: User description: "A quote-of-the-day page: one random quote from a built-in list, a New quote button, and favoriting that persists across reloads."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a quote (Priority: P1)

A visitor opens the page and immediately sees one readable quote and its author. A
returning visitor sees the quote that was last displayed in the same browser.

**Why this priority**: Seeing a quote is the page's core purpose and requires no setup.

**Independent Test**: Open the page and confirm one complete quote and author are visible.

**Acceptance Scenarios**:

1. **Given** a fresh visit, **When** the page opens, **Then** exactly one quote and its author are visible without another action.
2. **Given** the page is open, **When** the viewport is narrow or wide, **Then** the quote and controls remain readable and usable.
3. **Given** a quote was displayed in this browser, **When** the page reloads, **Then** that same quote and its author are visible without another action.

---

### User Story 2 - Request another quote (Priority: P2)

A visitor can press New quote to see another selection from the built-in collection.

**Why this priority**: It makes the page useful after the first quote is read.

**Independent Test**: Activate New quote repeatedly and confirm the displayed quote is always from the built-in collection.

**Acceptance Scenarios**:

1. **Given** a quote is visible, **When** the visitor activates New quote, **Then** a different quote and its author from the collection are displayed.
2. **Given** New quote is available, **When** the visitor uses a keyboard to activate it, **Then** it has the same effect as a pointer activation.

---

### User Story 3 - Save and remove a favorite (Priority: P3)

A visitor can mark the current quote as a favorite and later remove that mark. A saved
favorite and the last displayed quote are restored after a page reload.

**Why this priority**: Persistence is the feature that lets a visitor keep a personal choice.

**Independent Test**: Mark a quote, reload, and confirm the same quote is immediately marked; then remove the mark and repeat.

**Acceptance Scenarios**:

1. **Given** an unmarked quote, **When** the visitor marks it as favorite, **Then** the control visibly reports the saved state.
2. **Given** a marked quote, **When** the visitor removes the favorite, **Then** the control visibly reports the unsaved state.
3. **Given** a saved favorite, **When** another quote appears and the visitor later returns to the saved quote, **Then** it remains marked.
4. **Given** a quote is visible, **When** a different quote appears, **Then** the favorite control reflects the newly displayed quote's own state.
5. **Given** a quote is marked as favorite, **When** the page reloads, **Then** the same quote is displayed and still shows as marked, without any further action.

---

### Edge Cases

- New quote must select a different quote when the collection has at least two items.
- If saved favorite data is unavailable or invalid, the page remains usable and starts with no favorites for that visit.
- If the collection contains fewer than two quotes, New quote still leaves one valid quote displayed.
- If the remembered quote is missing, invalid, or no longer in the collection, the page chooses a random built-in quote and remains usable.
- If browser storage is unavailable, each load chooses a random built-in quote as on a first visit.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST contain at least five distinct built-in quotes, each with text and author.
- **FR-002**: On the first visit, the page MUST show exactly one randomly selected quote and its author. On later loads in the same browser, the page MUST show the quote that was last displayed, with its favorite state.
- **FR-003**: A New quote control MUST randomly select a quote other than the one currently displayed and show exactly one quote and author after activation, provided the collection has at least two items.
- **FR-004**: A favorite control MUST let the visitor mark or unmark the currently visible quote.
- **FR-005**: The favorite control MUST visibly and accessibly express whether the current quote is marked.
- **FR-006**: Favorite choices MUST persist across page reloads in the same browser and reflect each quote independently.
- **FR-007**: If favorite data cannot be read, the page MUST still display quotes and allow New quote to work.
- **FR-008**: Both controls MUST be operable by keyboard and have clear labels.
- **FR-009**: The page MUST remain readable and operable at common phone and desktop widths.
- **FR-010**: If the remembered quote is missing, invalid, or no longer in the collection, the page MUST fall back to a random quote and remain usable.

### Key Entities *(include if feature involves data)*

- **Quote**: A fixed collection item with a stable identity, text, and author.
- **Favorite choice**: A visitor's marked or unmarked state associated with one quote.
- **Last displayed quote**: The identity of the quote to restore on the next load in the same browser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a fresh visit, one quote and author are visible without user action in 100% of manual checks.
- **SC-002**: In 20 repeated New quote activations, every displayed item belongs to the built-in collection, exactly one item is visible each time, and it differs from the previous item.
- **SC-003**: In five mark-then-reload checks, the same quote reappears marked immediately; in five unmark-then-reload checks, it reappears unmarked.
- **SC-004**: A keyboard-only visitor can use both controls and determine the current favorite state in one attempt.
- **SC-005**: At phone and desktop widths, text and controls remain readable with no horizontal page scrolling.

## Assumptions

- This is a single-visitor page; accounts, sharing, and a separate favorites list are outside scope.
- Quotes are provided with the page; visitors do not add or edit them.
- With at least two built-in quotes, New quote never immediately repeats the current quote.
- Persistence is expected only in the same browser on the same device.

## Review Refinements

- The first reviewed version allowed New quote to repeat the visible quote. Human
  review clarified that it must always differ when at least two quotes exist.
- The next reviewed version randomly selected a quote on every load. Human review
  identified that a saved favorite was inconvenient to find after reloading.
  FR-002 and SC-003 now restore the last displayed quote; FR-010 defines the
  invalid-ID fallback. The plan, data model, tests, and UI were updated from
  this requirement before implementation.
