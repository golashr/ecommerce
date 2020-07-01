FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual .build-deps \
    git \
    bash \
    curl \
    ca-certificates \
    && update-ca-certificates

RUN mkdir -p /ecommerce/ecommerceserver/logs/ecommerce
ADD . /ecommerce/ecommerceserver/
WORKDIR /ecommerce/ecommerceserver/

RUN npm install pm2 -g
RUN npm install
RUN npm run build

CMD ["pm2-runtime", "dist/service.js", "-i", "0"]
