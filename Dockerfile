FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app ./app

COPY public ./public

EXPOSE 3000

CMD ["npm", "run", "dev"]