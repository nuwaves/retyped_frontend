# Retyped Frontend

Next.js frontend for [retyped.xyz](https://retyped.xyz), a podcast discovery platform. Talks to the Django API in [`nuwaves/retyped_processing`](https://github.com/nuwaves/retyped_processing) (set via `DJANGO_BACKEND`).

## Stack

- Next.js 15 (App Router, `output: "standalone"`), React 19, TypeScript, Tailwind CSS 4 (versions in `package.json`)
- Redux Toolkit + redux-persist (`app/_store/`), axios, NextAuth v4 (`next-auth`), framer-motion, Font Awesome, react-markdown, sanitize-html
- Imports use the `@/*` alias, which maps to the repo root (`tsconfig.json`)

## Commands

```bash
npm ci                           # install exactly what package-lock.json says (CI uses this)
npm run dev                      # next dev --turbopack
npm run build                    # next build
npm run start                    # next start (after build)
npm run lint                     # eslint (flat config in eslint.config.mjs)
npm run lint -- --max-warnings 0 # what CI runs: warnings fail
npx tsc --noEmit                 # type-check, also run by CI
npm run analyze                  # ANALYZE=true npm run build (bundle analyzer)
```

There is no test runner and no test script. Verify changes with lint, `tsc --noEmit` and `npm run build`.

Local run in Docker: `cp .env.dev.example .env.dev`, then `docker-compose up --build` (`Dockerfile.dev`). Note: `docker-compose.yml` reads `.env.local`, while the README says `.env.dev` (verify which one it needs).

## Code style

- ESLint extends `next/core-web-vitals` and `next/typescript`; `react/no-unescaped-entities` forbids `>` and `}`.
- CI fails on any lint warning and on any type error. Fix both before pushing.
- No Prettier config exists in the repo; match the surrounding file's formatting.

## Layout

```
app/
  (app)/ (auth)/ (company)/   # route groups: pages with co-located components/
  api/auth/[...nextauth]/     # NextAuth route
  api/proxy/[...path]/        # API proxy route (verify target)
  api/revalidate-episode/     # ISR revalidation
  _components/ _hooks/ _lib/ _providers/ _config/ _types/
  _store/                     # store.ts, features/*Slice, services/* (RTK Query)
```

- Page-specific components live next to their page; shared UI is in `app/_components/`.
- Env access is centralised in `app/_config/env.ts`.
- Auth: `app/_lib/authOptions.ts`, `app/_lib/authClient.ts`, `app/_store/features/auth`.
- Podcast ownership claims: `app/(app)/verify-claim/`, `app/_store/services/podcastClaimsApi.ts`, `app/_hooks/usePodcastClaim.ts`.

## Environment

Copy `.env.dev.example` as a template (names only: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `DJANGO_BACKEND`, `DJANGO_BACKEND_CLIENT_ID`, `SA_*` OAuth keys, `NEXT_PUBLIC_SITE_URL`). `.env*` is gitignored except `.env.dev.example`. `DJANGO_BACKEND` is baked into the sitemap rewrites at build time; `NEXTAUTH_SECRET` is runtime only.

## Branches and deployment

- `main` is the default branch. **Every push to `main` deploys to production**: `.github/workflows/deploy.yml` runs `checks.yml`, builds and pushes a GHCR image, then deploys to the Hetzner server over Tailscale.
- Work on a branch and open a PR into `main`. PRs run lint, `tsc --noEmit` and a Docker build (`.github/workflows/checks.yml`).
- Never push to `main` directly. Never commit `.env*` files or secrets.

## Ask before changing

These areas are high-risk. Ask the maintainer before editing them:

- Podcast ownership claim flow (verify-claim page, `podcastClaims*`, `usePodcastClaim`)
- Auth: NextAuth config (`app/_lib/authOptions.ts`, `app/api/auth/`), `authClient`, auth slice, the `api/proxy` route
- Feed/episode data ingest and revalidation (`app/api/revalidate-episode/`); ingest itself lives in `retyped_processing`
- Deploy and CI: `.github/workflows/*`, `Dockerfile`, `Dockerfile.dev`, `next.config.ts` (rewrites, redirects, headers)
- Database migrations: none in this repo; they belong to `retyped_processing`

## Gotchas

- `README.md` lists older versions (Next 15.1.3, Node 20); `package.json`, the Dockerfile (Node 24) and CI are the source of truth.
- Production strips `console.log` (`compiler.removeConsole`).
