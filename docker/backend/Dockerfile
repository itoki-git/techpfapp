FROM golang:1.15.2-alpine

WORKDIR /go/src/app

ENV GO111MODULE=on

COPY ./backend /go/src/app

RUN apk add --no-cache \
    alpine-sdk \
    git \
    && go get github.com/pilu/fresh

EXPOSE 8080

CMD ["fresh"]
