# Retyped

A Next.js application running in a containerized development environment.

## Tech Stack

- **Next.js** 15.5.2 with Turbopack
- **React** 19.1.0
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **Node.js** 20 (Alpine Linux)
- **Docker** & Docker Compose

## Getting Started

### Docker Setup

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
