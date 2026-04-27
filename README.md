# RaceBowl

> Street racing fast food experience — dark mode, orange accent, racing typography, gamified loop.

Monorepo Turborepo + Bun + Biome dengan Next.js 16 (App Router), React 19, Tailwind v4, Radix UI, tRPC v11, TanStack Query v5, Better Auth, Drizzle ORM (PostgreSQL via PGlite), Zod, dan next-intl.

## Stack

- **Monorepo / runtime / lint**: Turborepo, Bun 1.3.13, Biome
- **Frontend**: Next.js 16 App Router, React 19, Tailwind v4, Radix UI primitives, TanStack Table & Form, next-intl
- **API & data**: tRPC v11, TanStack Query v5
- **Auth**: Better Auth (Drizzle adapter)
- **Database**: Drizzle ORM + PostgreSQL via PGlite (file-backed, no external DB)
- **Validation**: Zod

## Getting started

```bash
bun install
bun run dev      # Next.js di http://localhost:3000
bun run build    # Production build (semua workspace)
bun run lint     # Biome check
bun run typecheck
```

Variabel environment opsional:

- `RACEBOWL_DB_DIR` — direktori PGlite (default: `<cwd>/.data/pglite`)
- `BETTER_AUTH_URL` — base URL untuk Better Auth
- `BETTER_AUTH_SECRET` — secret produksi (wajib di-set untuk deploy)

## Layout

```
apps/web              # Next.js App Router
packages/api          # tRPC router
packages/auth         # Better Auth setup
packages/db           # Drizzle + PGlite + seed data
packages/ui           # Radix-based primitives (Button, Card, Progress, MobileShell)
```

## Halaman utama

- `/` — Home dengan hero, shortcut grid, stat strip, menu Ngebut, refer & earn
- `/menu/customize` — multi-step customize bowl
- `/race-points` — total point, riwayat, hadiah
- `/missions` — daftar misi
- `/voucher` — daftar voucher
- `/events` — event listing
- `/wheel` — spin wheel
- `/profile` — profil & metode pembayaran
