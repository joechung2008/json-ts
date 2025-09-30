# Dockerfile for api-nestjs
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-nestjs ./packages/api-nestjs/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-nestjs...
RUN pnpm --filter api-nestjs... run build

WORKDIR /app/packages/api-nestjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["pnpm", "start"]
