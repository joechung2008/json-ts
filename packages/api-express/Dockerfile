# Dockerfile for api-express
FROM node:22-alpine

WORKDIR /app

COPY ../../pnpm-workspace.yaml ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/api-express ./packages/api-express/
COPY ../../packages/parser ./packages/parser/

RUN npm install -g pnpm
RUN pnpm install --filter api-express...
RUN pnpm --filter api-express... run build

WORKDIR /app/packages/api-express

ENV NODE_ENV=production
ENV PORT=3000

CMD ["pnpm", "start"]
