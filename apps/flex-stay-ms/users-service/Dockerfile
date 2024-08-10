FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY nx.json tsconfig.base.json ./

RUN npm ci

COPY . .

RUN npx nx build flex-stay-ms-users-service
