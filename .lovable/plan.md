## PlainDocs — Build Plan

A single-page tool that explains legal documents in plain language. Clean, minimal, professional.

### Scope

One route (`/`) replacing the placeholder in `src/routes/index.tsx`. No backend work — calls the existing API directly from the browser.

### Layout

- **Header**: "PlainDocs" wordmark + tagline "Understand any document in minutes".
- **Input card**:
  - Tabs (shadcn `Tabs`): "Paste text" / "Upload PDF".
  - Text tab: large `Textarea` (paste document).
  - PDF tab: file input (accept `application/pdf`), shows selected filename.
  - Language `Select` dropdown (default English) — options: English, Spanish, French, German, Portuguese, Japanese, Chinese, Yoruba, Krio.
  - "Explain This" primary button (disabled while loading or when input empty; shows spinner).
- **Results section** (renders after success):
  - Summary (paragraph).
  - Key Rights, Key Risks, Watch Out For — always shown if returned.
  - Other Notable Terms — only if array non-empty.
  - Each list item: bullet, **bold label** — description.

### API integration

- Endpoint: `https://6tbzx4c751.execute-api.us-east-1.amazonaws.com/explain` (POST, JSON).
- Text mode body: `{ text, language }`.
- PDF mode: read file via `FileReader.readAsDataURL`, strip `data:...;base64,` prefix, send `{ document: <base64>, language }`.
- Language sent as the human-readable name (e.g. "English").
- Handle errors with a toast (sonner) + inline error message; clear results on new submit.
- Client-side validation: require non-empty text or a selected PDF; cap PDF size (to 4 MB) to avoid huge payloads.

### Design

- Use existing semantic tokens in `src/styles.css` (neutral light theme already configured — works well for a professional doc tool). Generous whitespace, max-width ~3xl container, subtle card borders, no gradients/chatbot vibes.
- shadcn primitives: `Tabs`, `Textarea`, `Select`, `Button`, `Card`, `Label`, `Sonner` toaster.
- Route `head()` updated with proper title/description/OG tags for SEO.

### Files

- Edit `src/routes/index.tsx` — replace placeholder with the full PlainDocs UI + submit logic.
- Edit `src/routes/__root.tsx` — mount `<Toaster />` from `@/components/ui/sonner` (if not already), update default title.
- Possibly extract a small `ResultsSection` component inline in the same file (kept simple, no new files unless it grows).

### Out of scope

- No auth, no persistence, no history of past explanations.
- No streaming — single request/response.
- No server-side proxy (API is public and CORS-enabled per spec).