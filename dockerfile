FROM node:16.04

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG EnvironmentVariable

CMD ["ts-node", "index.js"]

ENTRYPOINT /app/