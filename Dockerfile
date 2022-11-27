# Step 1
FROM node:18-alpine as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# Step 2
FROM nginx:1.23.2-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-step /app/dist/word-puzzle-game /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 4200:80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
