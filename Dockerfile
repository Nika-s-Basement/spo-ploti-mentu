FROM node:16

RUN apt-get update && apt-get install -y \
  curl \
  libpq-dev \
  postgresql-client

COPY package.json ./
RUN npm install
COPY . ./

RUN npm run build


RUN apt-get update && apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
