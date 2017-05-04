FROM node:latest
MAINTAINER Matheus Fidelis <msfidelis01@gmail.com>

RUN npm install -g nodemon

RUN mkdir -p /app
WORKDIR /app

COPY src /app

RUN npm install

CMD ["nodemon", "index.js"]
