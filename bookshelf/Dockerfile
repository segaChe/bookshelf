FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD ["yarn", "production"]
