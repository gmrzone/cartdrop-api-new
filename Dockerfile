FROM node:18.7.0-slim
WORKDIR /cartdrop
COPY /package-lock.json .
COPY /package.json .
RUN npm install