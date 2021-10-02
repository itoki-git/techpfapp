FROM golang:1.15.2-alpine

COPY ./backend /go/src/app

RUN apk update && apk add git

WORKDIR /go/src/app
ADD . /go/src/app