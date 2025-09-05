# Retyped

A Next.js application running in a containerized development environment.

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

### Production Build with Docker

The project includes an optimized production Dockerfile that uses Next.js standalone mode for deployment:

```bash
# Build the production image
docker build -t retyped-production .

# Run the container
docker run -p 3000:3000 retyped-production
```

#### Production Dockerfile Benefits

- **Standalone Mode**: Reduces image size by ~70% (210MB vs 700MB+)
- **Multi-stage Build**: Separates build dependencies from runtime
- **Production Optimized**: Uses `next build` for optimized bundles and `node server.js` for minimal runtime
- **Security**: Runs with minimal dependencies, reducing attack surface
- **Performance**: Faster startup times and lower memory usage (~50-70% reduction)
- **ECS Ready**: Compatible with AWS ECS deployment pipeline
