FROM node:alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./src ./

COPY --chown=node:node ./src ./

USER node

CMD ["node", "index.js"]
