FROM node

WORKDIR /usr/src/app

COPY . . 

RUN npm install
RUN npm install --prefix client
RUN npm run build --prefix client

EXPOSE 5000

CMD ["node", "server.js"]
