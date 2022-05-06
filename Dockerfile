FROM node:alpine
WORKDIR /netan/docker-new
COPY package*.json .
RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
RUN npm install
COPY . .
CMD ["npm", "start"]

