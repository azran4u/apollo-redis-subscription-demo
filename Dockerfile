FROM node:12-alpine
COPY . .
CMD node dist/server.js
