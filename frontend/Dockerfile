FROM node:10.16.1-alpine
WORKDIR /usr/src/app/frontend
COPY . /usr/src/app/frontend
RUN apk update
EXPOSE 3000
CMD ["npm", "dev"]
