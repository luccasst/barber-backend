FROM node

WORKDIR /var/www/portal-gestor

COPY package*.json /var/www/portal-gestor/

RUN yarn

COPY . /var/www/portal-gestor

EXPOSE 3010
CMD ["yarn", "start:dev"]