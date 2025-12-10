FROM node:22 AS build

COPY package.json /frontend/
COPY package-lock.json /frontend/
COPY tsconfig.json /frontend/
COPY tsconfig.app.json /frontend/
COPY angular.json /frontend/
COPY ./public/ /frontend/public/
COPY ./src/ /frontend/src/

WORKDIR /frontend

RUN npm ci

RUN npm run build

FROM nginx:alpine AS prod

COPY --from=build /webapp/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
