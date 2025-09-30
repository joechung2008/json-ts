# Dockerfile for api-koa
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-koa ./packages/api-koa/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-koa...
RUN pnpm --filter api-koa... run build

WORKDIR /app/packages/api-koa

ENV NODE_ENV=production
ENV PORT=3000

CMD ["pnpm", "start"]
