# Data Model: Quote of the Day

## Quote

| Field | Meaning | Rule |
| --- | --- | --- |
| `id` | Stable quote identity | Unique, non-empty string |
| `text` | Quote shown to the visitor | Non-empty string |
| `author` | Attribution shown with the quote | Non-empty string |

The built-in collection contains at least five distinct quote records. The current
quote is identified by one ID from the collection.

## Favorite choice

A favorite choice is the membership of a quote ID in a set of saved IDs. Each
quote has independent favorite state. Toggling adds an absent ID or removes a
present ID; the visible pressed state follows membership.

## Persistence

The browser stores a JSON array of favorite quote IDs under a versioned key and the
last displayed quote ID under a second versioned key. Loading favorites keeps
only known string IDs and discards duplicates. Missing, invalid, or inaccessible
favorite data yields an empty set without preventing quote display. On page load,
a valid saved current ID selects that quote; a missing, malformed, stale, or
inaccessible ID falls back to a random built-in quote. The current ID is saved
after the initial selection and each New quote action. If a write fails, the
in-memory state still reflects the visitor's action for that visit.

## State transitions

| Event | Current quote | Favorite set |
| --- | --- | --- |
| First page load or invalid saved ID | Random item from collection; save its ID if possible | Loaded and validated, or empty |
| Page load with valid saved ID | Restore matching item | Loaded and validated, or empty |
| New quote | Random item excluding current item; save its ID if possible | Unchanged |
| Favorite toggle | Unchanged | Current ID added or removed |
