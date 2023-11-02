FROM node:18-alpine
WORKDIR /wearables/client
COPY . .
RUN apk -U upgrade
RUN apk add curl
RUN npm install
CMD ["npm", "start"]
