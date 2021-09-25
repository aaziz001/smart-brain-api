FROM node:16.9-alpine3.11

WORKDIR /usr/src/smart-brain-api

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN apk update && apk add bash

CMD ["/bin/bash"]