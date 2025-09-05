# Retyped

A high-performance podcast discovery platform built with Next.js 15 and React 19. The application leverages Incremental Static Regeneration (ISR) for optimal caching strategies, implements server components for reduced JavaScript bundle sizes, and utilizes Redux Toolkit for predictable state management. Designed with a mobile-first responsive approach using Tailwind CSS 4, the platform ensures fast page loads through optimized Core Web Vitals and SEO-friendly server-side rendering.

## Tech Stack

- **Next.js** 15.5.2 with Turbopack
- **React** 19.1.0
- **TypeScript** 5.x
- **Redux Toolkit** 2.8.2 & **React-Redux** 9.2.0 (State Management)
- **Tailwind CSS** 4.x
- **Node.js** 20 (Alpine Linux)
- **Docker** & Docker Compose

### Additional Libraries

- **Framer Motion** 12.23.12 - Animation library for React
- **Font Awesome** 7.0.0 - Icon library with React components

## Getting Started

### Development with Docker Compose

1. Create your environment file:

```bash
cp .env.dev.example .env.dev
```

2. Build and start the development environment:

```bash
docker-compose up --build
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. To stop the development environment:

```bash
docker-compose down
```

### Docker Structure

The project uses different Docker configurations for development and production:

- **`Dockerfile.dev`**: Development container with hot-reload support via volume mounting
- **`Dockerfile`**: Production-optimized multi-stage build using Next.js standalone mode
- **`docker-compose.yml`**: Orchestrates the development environment with volume mounts and environment variables
