FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=2784
ENV SECRET=RLAB
ENV MONGODB_URI=mongodb+srv://it-kmitl-book-service:rlYoI93uugf5H4sJ@book-service-east.zgdyk.mongodb.net/plt-book-service?retryWrites=true&w=majority

EXPOSE 2784

CMD [ "npm", "start" ]
