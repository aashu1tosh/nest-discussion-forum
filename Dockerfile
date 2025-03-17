FROM node:20-alpine

# Create folder if not exist
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 5050

CMD [ "npm","run","start:prod" ]
