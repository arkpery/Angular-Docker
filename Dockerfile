FROM node:12.14.1-alpine3.9 as development
VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app
EXPOSE 4200/tcp
COPY . .
RUN apk add git && \
    npm install -g @angular/cli
RUN npm install
CMD ["ng", "serve", "--host", "0.0.0.0"]


FROM node:12.14.1-alpine3.9 as build
VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app
COPY . .
RUN apk add git && \
    npm install -g @angular/cli
RUN npm install
CMD ["ng", "build"]

FROM nginx as production
EXPOSE 80/tcp
VOLUME [ "/usr/share/nginx/html" ]
COPY --from=build /home/node/app/dist/* /usr/share/nginx/html/
