FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3456

RUN npm install nodemon -g

CMD PORT=3456 nodemon app.js