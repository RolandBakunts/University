FROM node:12-alpine
EXPOSE 3456
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install nodemon -g && npm install
CMD PORT=3456 nodemon -L -e js,ts,ejs,json app.js