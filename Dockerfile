FROM node:7.10.0-alpine
MAINTAINER Matheus Fidelis <msfidelis01@gmail.com>

# RUN apk add --update nodejs npm 
# RUN npm install npm@latest -g
RUN npm install -g nodemon

RUN mkdir -p /app
WORKDIR /app

COPY src /app

RUN npm install

CMD ["nodemon", "index.js"]
