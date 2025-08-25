# Notes Frontend

A minimalistic, light-themed Next.js app for personal notes. Features:
- User authentication (demo, client-side localStorage)
- Create, read, update, delete notes
- Search and filter by text or tag
- Tagging notes
- Responsive layout with sidebar, top bar, and main content area

## Tech
- Next.js App Router
- TypeScript
- Tailwind v4 (utility classes) with custom CSS variables for theming

## Run locally

Install deps and start dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Usage

- Sign up or login (no real backend; email only persisted in localStorage).
- Create notes via the New button (top-right or on empty state).
- Search by text; filter by tag from dropdown or visit Tags page.
- Edit or delete notes on their detail page.

## Styling

The color palette is set via CSS variables in `src/app/globals.css`:

- Primary: #2d3748
- Secondary: #4a5568
- Accent: #48bb78
- Background: #ffffff

## Notes

This frontend runs entirely client-side. Replace the auth and notes store in `src/lib/auth.tsx` and `src/lib/store.ts` with real services when integrating a backend.
