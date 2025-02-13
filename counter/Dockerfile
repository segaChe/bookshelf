FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install
COPY ./src ./src/

CMD ["yarn", "production"]
