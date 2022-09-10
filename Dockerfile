#intrim build image
FROM node:14-slim as build
COPY . /usr/src/pw-fe
WORKDIR /usr/src/pw-fe
COPY ./react-loadable.json.sample ./react-loadable.json
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

#server image
FROM node:14-alpine
WORKDIR /usr/src/pw-fe
COPY ./package*.json ./
RUN npm install --production
COPY --from=build /usr/src/pw-fe/build build
COPY --from=build /usr/src/pw-fe/public public
