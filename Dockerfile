FROM node:18-alpine

LABEL maintainer="Myron Melnyk <melnykmyron1808@gmail.com>"
LABEL description="This is my server for homework. Use for CRUD contacts apps"

WORKDIR /app

COPY ./ /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
