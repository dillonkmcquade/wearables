FROM node:18-alpine
WORKDIR /wearables
COPY . .
RUN apk -U upgrade
RUN npm install
CMD ["npm", "start"]
