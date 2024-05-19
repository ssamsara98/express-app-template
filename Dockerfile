# syntax = docker/dockerfile:1

ARG IMAGE=node:20-alpine

# Common
FROM ${IMAGE} AS base
RUN npm install -g pm2 && pm2 update
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV PORT=4000
ENV DEBUG="app:*"
ENV DATABASE_URL="postgres://postgres:postgres@postgres:5432/express_app_template"
ENV JWT_ACCESS_SECRET="N0t5oSecret"
ENV JWT_REFRESH_SECRET="N0t5oFre5h"
EXPOSE 4000
EXPOSE 9229

# Install All
FROM base AS installall
RUN mkdir -p /tmp/dev
COPY --link package.json pnpm-lock.yaml /tmp/dev/
RUN cd /tmp/dev && pnpm install --frozen-lockfile

# Development
FROM base AS dev
COPY --from=installall /tmp/dev/node_modules node_modules
COPY --link . .

# Build
FROM dev AS build
RUN pnpm run build

# Install
FROM base AS install
RUN mkdir -p /tmp/prod
COPY --link package.json pnpm-lock.yaml /tmp/prod/
RUN cd /tmp/prod && pnpm install --frozen-lockfile --prod

# Production
FROM base AS prod
COPY --chown=node:node --from=install /tmp/prod/node_modules node_modules
COPY --chown=node:node --from=install /tmp/prod/package.json /tmp/prod/pnpm-lock.yaml ./
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/config config
COPY --chown=node:node --from=build /app/db db
COPY --chown=node:node --from=build /app/public public
COPY --chown=node:node --from=build /app/views views
COPY --chown=node:node --from=build /app/tsconfig.json /app/ecosystem.config.js /app/node /app/.sequelizerc ./

ENV NODE_ENV="production"
USER node
CMD [ "pnpm", "start:pm2" ]
