FROM node:20-alpine AS dependencies
WORKDIR /var/app
COPY package*.json tsconfig.json ./
RUN npm install

FROM node:20-alpine AS development
ARG APP_VERSION="0.0.1"
ENV APP_VERSION=$APP_VERSION
ARG COMMIT
ENV COMMIT=$COMMIT
ENV NODE_ENV=development
WORKDIR /var/app
USER node
COPY --chown=node:node --from=dependencies /var/app/node_modules node_modules/
COPY --chown=node:node . .
CMD ["npm", "run", "dev"]