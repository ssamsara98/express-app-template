# syntax = docker/dockerfile:1

ARG IMAGE=node:20-alpine

FROM ${IMAGE} AS env
WORKDIR /app
ENV PORT=4000
ENV DEBUG="app:*"
ENV DATABASE_URL="postgres://postgres:postgres@postgres:5432/express_app_template"
ENV JWT_ACCESS_SECRET="N0t5oSecret"
ENV JWT_REFRESH_SECRET="N0t5oFre5h"
EXPOSE 4000
EXPOSE 9229

# Common
FROM env AS base
RUN npm install -g pm2 && pm2 update

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --link package.json pnpm-lock.yaml ./

# Install All
FROM base AS installall
RUN mkdir -p /tmp/dev
COPY --from=base --link /app/package.json /app/pnpm-lock.yaml /tmp/dev/
RUN cd /tmp/dev && pnpm install --frozen-lockfile

# Prerelease
FROM base AS prerelease
COPY --from=installall /tmp/dev/node_modules node_modules
COPY --link . .

# Development
FROM base as development
COPY --from=prerelease --link . .
RUN rm -rf node_modules
COPY --from=prerelease --link /app/node_modules node_modules

# Build
FROM prerelease AS build
RUN pnpm run build

# Install
FROM base AS install
RUN mkdir -p /tmp/prod
COPY --from=base --link /app/package.json /app/pnpm-lock.yaml /tmp/prod/
RUN cd /tmp/prod && pnpm install --frozen-lockfile --prod

# Release
FROM base AS release
COPY --chown=node:node --from=install /tmp/prod/node_modules node_modules
COPY --chown=node:node --from=install /tmp/prod/package.json /tmp/prod/pnpm-lock.yaml ./
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/db db
COPY --chown=node:node --from=build /app/public public
COPY --chown=node:node --from=build /app/views views
COPY --chown=node:node --from=build /app/tsconfig.json /app/ecosystem.config.js /app/node /app/.sequelizerc ./

ENV NODE_ENV="production"
USER node
CMD [ "pnpm", "start:pm2" ]
