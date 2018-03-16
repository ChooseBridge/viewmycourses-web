FROM node

WORKDIR /app

COPY ./package.json /app/

RUN npm install

COPY ./.next /app/.next

EXPOSE 3000

CMD npm start