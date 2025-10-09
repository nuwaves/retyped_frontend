# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Retyped** is a podcast discovery platform built with Next.js 15 and React 19. The application uses server-side rendering (SSR), Incremental Static Regeneration (ISR), Redux Toolkit with RTK Query for state management and API caching, and communicates with a Django backend via a Next.js API proxy.

## Development Commands

### Docker Development (Recommended)
```bash
# Start development environment
docker-compose up --build

# Stop development environment
docker-compose down

# View logs
docker-compose logs -f
```

The app runs on `http://localhost:3000` with hot-reload support.

### Local Development
```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Environment Setup
Copy `.env.dev.example` to `.env.dev` and configure:
- `DJANGO_BACKEND`: Backend API URL (default: `http://localhost:8000`)
- `NEXTAUTH_URL`: Frontend URL (default: `http://localhost:3000`)
- Social auth provider credentials (Google, Facebook, Twitter, Instagram)

## Architecture

### Route Organization

The app uses Next.js route groups for logical separation:
- `(app)/`: Main application routes (home, shows, episodes, search, trending)
- `(auth)/`: Authentication pages (login, signup)
- `(company)/`: Static pages (privacy, terms, contact)
- `api/`: API routes (NextAuth, backend proxy)

### Backend Communication Pattern

**Critical**: All client-side API calls go through a Next.js proxy route (`/api/proxy/[...path]`) that forwards requests to the Django backend. This pattern exists for three reasons:

1. **Django trailing slash requirement**: Django expects trailing slashes on URLs, but RTK Query's `fetchBaseQuery` removes them. The proxy detects the `X-Trailing-Slash` header and restores slashes.
2. **CORS and credential handling**: Centralizes backend communication through a single server-side endpoint.
3. **Authorization**: The `clientApi` custom base query (`app/_store/services/clientApi.ts`) automatically injects Bearer tokens from Redux auth state into request headers.

**Server components** use `app/_lib/serverApi.ts` which calls Django directly.
**Client components** use RTK Query APIs in `app/_store/services/` which route through `/api/proxy`.

### State Management

Redux store (`app/_store/store.ts`) includes:
- **Slices**: `ui`, `auth`, `podcasts`, `episodes`, `infiniteScroll`, `bookmarks`, `follows`
- **RTK Query**: `clientApi` with injected endpoints for podcasts, episodes, search, bookmarks, and follows
- **Cache tags**: `Episode`, `Podcast`, `User`, `Bookmark`, `Follow` for invalidation

API services inject endpoints into `clientApi`:
- `podcastsApi.ts`: Top/trending podcasts, podcast episodes
- `episodesApi.ts`: New/trending episodes, episode details
- `searchApi.ts`: Search functionality
- `bookmarksApi.ts`: Bookmark management
- `followsApi.ts`: Follow/unfollow functionality

### Component Organization

- `app/_components/common/`: Reusable UI components (Button, LoadingSpinner, SafeHTML, etc.)
- `app/_components/cards/`: Card components (EpisodeCard, ShowCard)
- `app/_components/modules/`: Feature-specific components (home, search, shows)
- `app/_components/layout/`: Layout components (Navbar, Footer, Analytics)
- `app/_components/auth/`: Authentication components (AuthCard, AuthLayout)
- **Co-located components**: Page-specific components live in `components/` folders next to their pages

### Type System

All types are centralized in `app/_types/`:
- `models/`: Domain models (Episode, Podcast, User, etc.)
- `api/`: API request/response types
- `index.ts`: Re-exports all types for convenience

Import pattern: `import { Episode, Podcast } from '@/app/_types'`

### Authentication Flow

1. NextAuth.js handles OAuth with social providers (Google, Facebook, Twitter, Instagram)
2. On successful OAuth, NextAuth converts the provider token to a Django backend token via `app/_lib/authClient.ts`
3. Backend token stored in NextAuth session as `session.backendToken`
4. Provider mapping in `app/api/auth/[...nextauth]/route.ts`:
   - `facebook` → `facebook`
   - `google` → `google-oauth2`
   - `twitter` → `twitter`
   - `instagram` → `instagram`

### Infinite Scroll Pattern

Pages with infinite scrolling (trending shows/episodes, new episodes) use:
- `useInfiniteScroll` hook (`app/_hooks/useInfiniteScroll.ts`) with IntersectionObserver
- `infiniteScrollSlice` Redux state to track page/offset per list type
- `InfiniteScrollTrigger` component to trigger loading
- RTK Query lazy queries (e.g., `useLazyGetTrendingPodcastsQuery`)

### Image Handling

Next.js Image optimization configured in `next.config.ts`:
- Accepts all HTTPS remote images (`hostname: "**"`)
- Custom device sizes and image sizes for responsive images
- Utility: `app/_utils/imageUrl.ts` for URL manipulation

### SEO Configuration

SEO optimizations in `next.config.ts`:
- **Bot-specific rendering**: `htmlLimitedBots` forces blocking metadata (no streaming) for search engines and social media crawlers to ensure proper `<head>` metadata
- **Sitemap rewrites**: Proxies `/sitemap.xml` and `/sitemap-{episodes|podcasts}:id.xml` to Django backend
- **Static files**: `robots.ts` and `sitemap.ts` for search engine directives

### Utilities

- `app/_utils/formatters.ts`: Date/time formatting, duration formatting
- `app/_utils/sanitizeHtml.ts`: HTML sanitization for user-generated content
- `app/_config/env.ts`: Environment variable normalization (removes trailing slashes from URLs)

## Key Patterns & Conventions

1. **Server vs Client Components**: Maximize server components for SSR. Use `'use client'` only when needed (hooks, interactivity, browser APIs).

2. **API Error Handling**: Custom `APIError` class in `serverApi.ts` includes status, message, and endpoint for debugging.

3. **Font Awesome**: Icons initialized in `app/_lib/fontawesome.ts`, used via `@fortawesome/react-fontawesome`.

4. **Path Aliases**: Use `@/` for absolute imports (e.g., `@/app/_components/...`).

5. **Docker Strategy**:
   - `Dockerfile.dev`: Development with volume mounts for hot reload
   - `Dockerfile`: Production multi-stage build with Next.js standalone output
   - Uses external network `retyped-local` to connect with backend

6. **Trailing Slash Workaround**: When adding new RTK Query endpoints that require trailing slashes, ensure URLs end with `/` - the custom base query will detect this and set the `X-Trailing-Slash` header.

## Common Gotchas

- **Django URL slashes**: Always include trailing slashes in API endpoint URLs when Django expects them.
- **Environment variables**: `DJANGO_BACKEND` is normalized to remove trailing slashes in `app/_config/env.ts`.
- **Proxy route**: Client-side API calls must go through `/api/proxy`, not directly to Django.
- **TypeScript paths**: Use `@/` prefix consistently (configured in `tsconfig.json`).
- **Docker network**: The `retyped-local` network must exist before running `docker-compose up`.
