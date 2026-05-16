FROM node:23-alpine

WORKDIR /api

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
