FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
COPY ./src ./src/
RUN yarn build
COPY ./dist ./dist/

CMD ["yarn", "production"]
