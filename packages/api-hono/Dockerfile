# Dockerfile for api-hono
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-hono ./packages/api-hono/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-hono...
RUN pnpm --filter api-hono... run build

WORKDIR /app/packages/api-hono

ENV NODE_ENV=production
ENV PORT=3000

CMD ["pnpm", "start"]
