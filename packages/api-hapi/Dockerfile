# Dockerfile for api-hapi
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-hapi ./packages/api-hapi/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-hapi...
RUN pnpm --filter api-hapi... run build

WORKDIR /app/packages/api-hapi

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["pnpm", "start"]
