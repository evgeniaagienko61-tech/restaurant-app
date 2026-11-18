# Docker-образ REST API застосунку для ресторану (ЛР №2, Express + MongoDB)
FROM node:20-alpine

LABEL maintainer="Yevheniia Ahiienko" \
      version="1.0" \
      description="REST API ресторану DineEasy: Express + MongoDB (лабораторна №2)"

WORKDIR /app

# Спочатку лише файли залежностей — шар з node_modules кешується між збірками
COPY package*.json ./
RUN npm ci --omit=dev

# Решта коду застосунку
COPY . .

ENV PORT=3000
EXPOSE 3000

# Процес у контейнері працює від не-root користувача
USER node

CMD ["node", "server.js"]
