FROM node:16-alpine as client-builder
WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf 
COPY --from=client-builder /app/dist /usr/share/nginx/html