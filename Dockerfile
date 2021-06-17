FROM node:12.14.1-alpine3.9 as angular
VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app
EXPOSE 4200/tcp
COPY . .
RUN apk add git && \
    npm install -g @angular/cli
RUN npm install

FROM angular as development
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM angular as build
RUN ng build --output-path=dist

FROM nginx as production
EXPOSE 80/tcp
VOLUME [ "/usr/share/nginx/html" ]
COPY --from=build /home/node/app/dist/* /usr/share/nginx/html/
