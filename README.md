# TP01

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

# Build

## Build Docker

`docker build -f Dockerfile.angular -t my/ng-cli .`

## Build Front-end

```docker run -ti -w /home/node/app -v `pwd`:/home/node/app my/ng-cli ng build```

# Run

`docker-compose up --build`
