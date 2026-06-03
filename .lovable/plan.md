# Add Private Mode

## 1. `src/routes/index.tsx` — Private toggle on explainer page

- Import `useAuth` from `@/lib/auth-context` and `Lock` from `lucide-react`.
- Add state: `const [isPrivate, setIsPrivate] = useState(false);`
- Only render the toggle when `status === "authenticated"`.
- Place the toggle **above** the input card (inside `<main>`, before the `<section>`).
- Toggle UI: a pill-style segmented control with two buttons, "Standard" and "🔒 Private". Standard selected by default. Use existing teal token (`bg-teal text-teal-foreground` for the active option, muted styling for inactive), wrapped in a rounded-full container with `border` and `bg-muted/40`, matching the app's existing accent treatment.
- When `isPrivate` is true:
  - Add a teal accent border to the input card: conditionally apply `border-teal` (and slight ring) to the existing `<section>` classes (currently `border-border`).
  - Render helper text directly below the toggle: "Your document is analyzed privately and only visible to you." in `text-xs text-muted-foreground`.
- In `handleSubmit`, after building `body`, add `body.private = isPrivate;` (so it's `true` in Private mode, `false` in Standard).

## 2. `src/routes/history.tsx` — lock icon for private analyses

- Extend `HistoryItem` type with `is_private?: boolean;`.
- Import `Lock` from `lucide-react`.
- In the list item, render a small `<Lock />` icon (e.g., `h-3.5 w-3.5 text-teal`) inline next to the `summary_preview` text when `item.is_private` is true.

## Out of scope

No other behavior, layout, or styling changes. History fetch, auth flow, and request shape (besides the new `private` field) remain identical.
