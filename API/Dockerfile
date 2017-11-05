FROM node:latest

RUN apt-get update && apt-get install -y build-essential python
RUN npm install -g nodemon && npm install -g node-pre-gyp
#USER node
WORKDIR /usr/src/app