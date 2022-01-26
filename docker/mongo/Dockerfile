FROM mongo:4

ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD ***REMOVED***
ENV MONGO_INITDB_DATABASE portfolioapp

ENV TZ="Asia/***REMOVED***"
RUN echo $TZ > /etc/timezone

COPY init.js /docker-entrypoint-initdb.d/