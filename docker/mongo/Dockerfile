FROM mongo:4

ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD T2bvfiRz!!
ENV MONGO_INITDB_DATABASE portfolioapp

ENV TZ="Asia/Tokyo"
RUN echo $TZ > /etc/timezone

COPY init.js /docker-entrypoint-initdb.d/