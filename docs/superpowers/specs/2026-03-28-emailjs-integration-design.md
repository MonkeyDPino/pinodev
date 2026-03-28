# EmailJS Integration Design

**Date:** 2026-03-28
**Status:** Approved

## Summary

Wire up the existing Contact form to send emails via EmailJS using a `useEmailJS` custom hook. Credentials are stored as Vite env vars.

## Architecture

### Hook: `src/hooks/useEmailJS.ts`

- Exports `{ send, status }`.
- `status: 'idle' | 'loading' | 'success' | 'error'`
- `send(form: FormState): void` — calls `emailjs.send()` with the three env vars.
- Hook owns all async state; the component only reads `status` and calls `send`.

### Environment Variables

Stored in `.env.local` (gitignored). Vite exposes them via `import.meta.env`.

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

### Contact Component Changes (`src/components/Contact/Contact.tsx`)

- Import and call `useEmailJS`.
- `handleSubmit` calls `send(form)` instead of `console.log`.
- Submit button disabled and shows a spinner when `status === 'loading'`.
- Success message displayed below the form on `status === 'success'`.
- Error message displayed below the form on `status === 'error'`.
- Form fields reset to empty on success.

## Dependencies

- Install `@emailjs/browser`.

## Out of Scope

- Server-side proxy.
- Retry logic.
- Toast/notification library (plain inline message is sufficient).
