# Dockerfile for cli
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/cli ./packages/cli/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter cli...
RUN pnpm --filter cli... run build

WORKDIR /app/packages/cli

ENV NODE_ENV=production

ENTRYPOINT ["pnpm", "start"]
