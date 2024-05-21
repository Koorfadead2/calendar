FROM alpine:latest
RUN apk add nodejs npm && mkdir /opt/app
WORKDIR /opt/app
COPY dist .
ENTRYPOINT ["npx", "vite", "--host"]
