FROM node:20-alpine AS dependencies
WORKDIR /var/app
COPY package*.json tsconfig.json ./
RUN npm install

FROM node:20-alpine AS build
ENV NODE_ENV=production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN npm run build

FROM node:20-alpine AS prod-dependencies
WORKDIR /var/app
COPY package*.json ./
RUN npm install --production


FROM node:20-alpine AS runtime
ARG APP_VERSION="0.0.1"
ENV APP_VERSION=$APP_VERSION
ARG COMMIT
ENV COMMIT=$COMMIT
ENV NODE_ENV=production
WORKDIR /var/app
USER node
COPY --chown=node:node --from=build /var/app/dist dist/
COPY --chown=node:node --from=prod-dependencies /var/app/node_modules node_modules/
COPY --chown=node:node . .
CMD ["node", "dist/index.js"]