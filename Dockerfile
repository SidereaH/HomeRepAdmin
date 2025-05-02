FROM node:18-alpine as builder

RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]