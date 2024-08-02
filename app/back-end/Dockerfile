FROM node:18-alpine

WORKDIR /api

COPY . .

RUN npm run build

USER node

CMD ["node", "dist/app/index.js"]