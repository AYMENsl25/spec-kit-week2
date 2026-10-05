# Quote Page Constitution

## Core Principles

### I. Clear Behavior
Every user-facing behavior MUST have an observable result and an acceptance criterion.
Requirements MUST describe what the user sees and does without prescribing implementation
details. This prevents an agent from filling gaps with inconsistent assumptions.

### II. Small, Readable Code
Implementation MUST favor plain, focused functions and descriptive names. Duplication or
abstraction MUST be justified by a concrete need. This keeps a small project understandable
and easy to change.

### III. Testable Requirements
Each functional requirement MUST have a manual or automated verification step, including
normal use and relevant edge cases. A passing build alone MUST NOT count as proof that a
requirement works.

### IV. Durable User State
User choices that the specification says must persist MUST survive a page reload. Stored
data MUST be read and written consistently, and invalid stored data MUST fail safely so
the page remains usable.

### V. Accessible Interaction
Interactive controls MUST have visible labels, keyboard support, and a discernible state.
Text MUST remain readable at common mobile and desktop widths. These checks protect the
basic usability of the page.

## Quality Constraints
The project MUST remain small enough to run locally without a paid service. Every added
dependency MUST have a stated purpose. Secrets and user tracking MUST NOT be introduced.
Documentation MUST explain how to run and verify the page.

## Development Workflow
Work MUST proceed through specification, plan, tasks, implementation, and convergence.
Each artifact MUST be reviewed for consistency with the previous stage before work
continues. When requirements change, update the relevant spec or plan first, then
adjust tasks and code. Verification evidence MUST be recorded before declaring work done.

## Governance
This constitution governs the project and takes precedence over informal implementation
preferences. An amendment requires a documented reason, an impact review of existing
artifacts, and a version update. Use semantic versioning: MAJOR for incompatible changes
to principles, MINOR for new principles or sections, and PATCH for clarifications. Each
stage review MUST check compliance; exceptions MUST be documented with a reason.

**Version**: 1.0.0 | **Ratified**: 2026-10-05 | **Last Amended**: 2026-10-05
