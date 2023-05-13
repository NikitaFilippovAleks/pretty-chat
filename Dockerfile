FROM --platform=linux/amd64 node:16.15.1-alpine

WORKDIR /app

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "startServer" ]
