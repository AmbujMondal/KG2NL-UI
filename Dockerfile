# Stage 1
FROM node:12.16.1-alpine as build-step
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
# COPY . .
RUN npm run build --prod
# Stage 2
FROM nginx:1.15.8-alpine
# COPY --from=build-step /usr/src/app /usr/share/nginx/html
COPY --from=build-step /usr/src/app/dist/kg2nl-ui /usr/share/nginx/html
