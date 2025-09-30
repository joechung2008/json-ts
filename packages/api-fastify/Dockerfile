# Dockerfile for api-fastify
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-fastify ./packages/api-fastify/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-fastify...
RUN pnpm --filter api-fastify... run build

WORKDIR /app/packages/api-fastify

ENV NODE_ENV=production
ENV PORT=3000

CMD ["pnpm", "start"]
