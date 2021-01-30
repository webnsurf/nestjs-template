FROM node:12.16.0-alpine as build

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:12.16.0-alpine

WORKDIR /app/

COPY *.json ./

RUN npm install

COPY --from=build /app/dist/ ./dist/

CMD [ "npm", "run", "start:prod"]

EXPOSE 3000
