# Proop Summit — event landing page

A single-page event landing/promo site built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Run it

```bash
pnpm dev     # dev server at http://localhost:3000
pnpm build   # production build (fully static)
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Edit the content

All copy, dates, speakers, agenda, and ticket tiers live in one file:

```
src/lib/event.ts
```

Change the values there and every section updates. Key fields:

- `startsAt` — ISO 8601 datetime with offset; drives the hero countdown.
- `agenda`, `speakers`, `tickets`, `faqs` — arrays rendered by their sections.

## Structure

```
src/
  app/
    layout.tsx        # fonts (Bricolage Grotesque + Geist + Geist Mono), metadata
    page.tsx          # composes the sections
    globals.css       # design tokens (Cobalt & Coral palette) + utilities
  lib/event.ts        # ← all event content
  components/
    site-nav.tsx      # sticky nav w/ mobile menu
    countdown.tsx     # live countdown (client component)
    sections/         # hero, marquee, about, agenda, speakers, register, faq, footer
```

## Design

- **Palette (Cobalt & Coral):** cool porcelain `#F1F3F8`, cool ink `#10131A`, cobalt `#1D3FE0`, coral `#FF5C38`.
- **Type:** Bricolage Grotesque (display) · Geist Sans (body) · Geist Mono (times/data).
- **Signature:** the live countdown in the hero.

## Not wired up yet (by design)

Ticket "Select" buttons are `mailto:` placeholders. Wire them to a real payment/registration
provider (Stripe, Tito, Luma, etc.) in `src/components/sections/register.tsx`. A backend was
intentionally deferred — add Next.js route handlers or a BaaS when ready.
