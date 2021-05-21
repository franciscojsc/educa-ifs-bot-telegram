FROM node:alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

USER node

CMD ["npm", "start"]
