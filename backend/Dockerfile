# stage 1: build the application
FROM node:22.21.1-alpine3.21 AS build

WORKDIR /app

COPY package*.json ./

# Ensure lockfile does not reference a private registry unavailable in Docker build environment.
RUN sed -i 's|http://npm.msk.avito.ru/|https://registry.npmjs.org/|g' package-lock.json && npm ci

COPY . .

# stage 2: run the application
FROM node:22.21.1-alpine3.21

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start"]