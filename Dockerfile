FROM node:12-alpine
COPY . .
CMD node dist/index.js
