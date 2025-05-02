FROM node:18-alpine as builder

RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build
