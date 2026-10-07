FROM node:20-alpine AS builder
WORKDIR /app

# Secrets (NEXTAUTH_SECRET, OAuth keys) are not build args: they would be baked
# into the image. Provide them as runtime environment variables instead.
ARG DJANGO_BACKEND
ARG NEXTAUTH_URL

ENV DJANGO_BACKEND=$DJANGO_BACKEND
ENV NEXTAUTH_URL=$NEXTAUTH_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

ARG DJANGO_BACKEND
ARG NEXTAUTH_URL

ENV NODE_ENV=production
ENV DJANGO_BACKEND=$DJANGO_BACKEND
ENV NEXTAUTH_URL=$NEXTAUTH_URL

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["node", "server.js"]