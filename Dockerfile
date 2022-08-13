FROM node:18.7.0-slim
WORKDIR /cartdrop
COPY /package.json .
RUN npm install
COPY . .
EXPOSE 5000